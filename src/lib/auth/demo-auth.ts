// Demo login. Accounts and the current session live in this browser's
// localStorage, so this is NOT real security: it exists to make the sign-up,
// log-in and log-out flow work before there is a backend. Passwords are never
// stored; only a salted PBKDF2 hash is kept. Replace this file with calls to
// the real API when the backend exists. Nothing else imports localStorage
// for accounts.

export type User = { id: string; name: string; email: string };

type StoredUser = User & { salt: string; hash: string; createdAt: string };

const USERS_KEY = "vtc.users.v1";
const SESSION_KEY = "vtc.session.v1";

export class AuthError extends Error {}

const listeners = new Set<() => void>();
// undefined = not read yet, null = logged out
let current: User | null | undefined;

function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function readCurrent(): User | null {
  if (current !== undefined) return current;
  try {
    const id = window.localStorage.getItem(SESSION_KEY);
    const u = id ? loadUsers().find((x) => x.id === id) : undefined;
    current = u ? { id: u.id, name: u.name, email: u.email } : null;
  } catch {
    current = null;
  }
  return current;
}

function setSession(user: StoredUser | null) {
  if (user) window.localStorage.setItem(SESSION_KEY, user.id);
  else window.localStorage.removeItem(SESSION_KEY);
  current = user ? { id: user.id, name: user.name, email: user.email } : null;
  listeners.forEach((l) => l());
}

const toHex = (buf: ArrayBuffer | Uint8Array) =>
  Array.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const fromHex = (hex: string) =>
  new Uint8Array((hex.match(/../g) ?? []).map((h) => parseInt(h, 16)));

async function hashPassword(password: string, saltHex: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: fromHex(saltHex),
      iterations: 150_000,
    },
    key,
    256,
  );
  return toHex(bits);
}

const normalise = (email: string) => email.trim().toLowerCase();

export async function signUp(input: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const name = input.name.trim();
  const email = normalise(input.email);
  if (!name) throw new AuthError("Please enter your name.");
  if (!/^\S+@\S+\.\S+$/.test(email))
    throw new AuthError("Please enter a valid email address.");
  if (input.password.length < 8)
    throw new AuthError("Use a password of at least 8 characters.");

  const users = loadUsers();
  if (users.some((u) => u.email === email))
    throw new AuthError("An account with this email already exists.");

  const salt = toHex(crypto.getRandomValues(new Uint8Array(16)));
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    salt,
    hash: await hashPassword(input.password, salt),
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  setSession(user);
  return { id: user.id, name, email };
}

export async function logIn(input: {
  email: string;
  password: string;
}): Promise<User> {
  const user = loadUsers().find((u) => u.email === normalise(input.email));
  // Same message for an unknown email and a wrong password.
  const wrong = new AuthError("Email or password is incorrect.");
  if (!user) throw wrong;
  if ((await hashPassword(input.password, user.salt)) !== user.hash)
    throw wrong;
  setSession(user);
  return { id: user.id, name: user.name, email: user.email };
}

export function logOut() {
  setSession(null);
}

// For React's useSyncExternalStore.
export function subscribeAuth(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === SESSION_KEY || e.key === USERS_KEY) {
      current = undefined;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export const getCurrentUser = () => readCurrent();
/** During server rendering the user is unknown. */
export const getServerUser = () => undefined;

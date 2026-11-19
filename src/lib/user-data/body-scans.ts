// Saved Body Scans, kept per logged-in user. For now they live in the
// browser's localStorage; the functions below are the only way the app reads
// or writes them, so a real API can replace the storage later without
// touching the components.
import { getCurrentUser, subscribeAuth } from "@/lib/auth/demo-auth";

export type BodyScan = {
  id: string;
  createdAt: string; // ISO date-time
  areas: string[];
  sensations: string[];
  strength: number; // 0 to 10
  doing: string;
  company: string;
  feeling: string;
  emotion: string;
  note: string;
};

export type NewBodyScan = Omit<BodyScan, "id" | "createdAt">;

const BASE = "vtc.bodyScans.v1";
const EMPTY: BodyScan[] = [];

let cache: { userId: string; scans: BodyScan[] } | null = null;
const listeners = new Set<() => void>();

const keyFor = (userId: string) => `${BASE}.${userId}`;

function read(): BodyScan[] {
  const user = getCurrentUser();
  if (!user) return EMPTY;
  if (cache?.userId === user.id) return cache.scans;
  let scans = EMPTY;
  try {
    const raw = window.localStorage.getItem(keyFor(user.id));
    if (raw) scans = JSON.parse(raw) as BodyScan[];
  } catch {
    // Unreadable storage counts as no scans.
  }
  cache = { userId: user.id, scans };
  return scans;
}

function write(next: BodyScan[]) {
  const user = getCurrentUser();
  if (!user) return;
  cache = { userId: user.id, scans: next };
  try {
    window.localStorage.setItem(keyFor(user.id), JSON.stringify(next));
  } catch {
    // Storage can be full or blocked; the scans then last until reload.
  }
  listeners.forEach((l) => l());
}

export function addBodyScan(scan: NewBodyScan) {
  if (!getCurrentUser()) return;
  write([
    { ...scan, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    ...read(),
  ]);
}

export function deleteBodyScan(id: string) {
  write(read().filter((s) => s.id !== id));
}

/**
 * Scans saved before accounts existed sit under the bare key. Give them to
 * the user who is logged in now, once, so nothing recorded earlier is lost.
 */
export function adoptAnonymousScans() {
  try {
    const raw = window.localStorage.getItem(BASE);
    if (!raw || !getCurrentUser()) return;
    const old = JSON.parse(raw) as BodyScan[];
    window.localStorage.removeItem(BASE);
    if (old.length) write([...read(), ...old]);
  } catch {
    // Nothing to adopt.
  }
}

// For React's useSyncExternalStore.
export function subscribeBodyScans(listener: () => void) {
  listeners.add(listener);
  // A different user means a different list.
  const offAuth = subscribeAuth(() => {
    cache = null;
    listener();
  });
  const onStorage = (e: StorageEvent) => {
    if (e.key?.startsWith(BASE)) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    offAuth();
    window.removeEventListener("storage", onStorage);
  };
}

export const getBodyScansSnapshot = () => read();
export const getBodyScansServerSnapshot = () => EMPTY;

// Saved Body Scans. For now they live in the browser's localStorage; the
// functions below are the only way the app reads or writes them, so a real
// API can replace the storage later without touching the components.

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

const KEY = "vtc.bodyScans.v1";
const EMPTY: BodyScan[] = [];

let cache: BodyScan[] | null = null;
const listeners = new Set<() => void>();

function read(): BodyScan[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as BodyScan[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: BodyScan[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage can be full or blocked; the scans then last until reload.
  }
  listeners.forEach((l) => l());
}

export function addBodyScan(scan: NewBodyScan): BodyScan {
  const saved: BodyScan = {
    ...scan,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  write([saved, ...read()]);
  return saved;
}

export function deleteBodyScan(id: string) {
  write(read().filter((s) => s.id !== id));
}

// For React's useSyncExternalStore.
export function subscribeBodyScans(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export const getBodyScansSnapshot = () => read();
export const getBodyScansServerSnapshot = () => EMPTY;

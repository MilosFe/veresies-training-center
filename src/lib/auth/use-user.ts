"use client";

import { useSyncExternalStore } from "react";
import { getCurrentUser, getServerUser, subscribeAuth } from "./demo-auth";

/** The logged-in user, null when logged out, undefined while still loading. */
export function useUser() {
  return useSyncExternalStore(subscribeAuth, getCurrentUser, getServerUser);
}

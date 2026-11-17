"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getBodyScansServerSnapshot,
  getBodyScansSnapshot,
  subscribeBodyScans,
} from "@/lib/user-data/body-scans";
import { BodyScanTool } from "./BodyScanTool";

// Shown inside an activity: a card with a button that opens the Body Scan in
// a panel on the right, so the activity text stays readable beside it.
export function BodyScanLauncher() {
  const [open, setOpen] = useState(false);
  const scans = useSyncExternalStore(
    subscribeBodyScans,
    getBodyScansSnapshot,
    getBodyScansServerSnapshot,
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // On wide screens, make room so the panel sits beside the text, not on it.
    document.body.classList.add("lg:pr-[36rem]");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("lg:pr-[36rem]");
    };
  }, [open]);

  return (
    <>
      <section className="rounded-2xl border border-teal bg-white p-5">
        <p className="text-xs uppercase tracking-widest text-teal">
          Interactive tool
        </p>
        <h3 className="mt-1 text-2xl">Body Scan</h3>
        <p className="mt-1 text-sm">
          {scans.length === 0
            ? "You have no saved scans yet."
            : `You have ${scans.length} saved ${scans.length === 1 ? "scan" : "scans"}.`}
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="mt-4 rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-cream"
        >
          Open Body Scan
        </button>
      </section>

      {open && (
        <aside
          role="dialog"
          aria-label="Body Scan"
          className="fixed top-0 right-0 z-50 h-dvh w-full overflow-y-auto border-l border-line bg-cream p-4 shadow-2xl sm:w-[36rem]"
        >
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-line bg-white px-3 py-1.5 text-sm"
            >
              Close
            </button>
          </div>
          <BodyScanTool />
        </aside>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  bodyAreas,
  companyOptions,
  doingOptions,
  emotionOptions,
  feelingOptions,
  sensationGroups,
} from "@/content/body-scan-options";
import {
  addBodyScan,
  deleteBodyScan,
  getBodyScansServerSnapshot,
  getBodyScansSnapshot,
  subscribeBodyScans,
} from "@/lib/user-data/body-scans";
import { BodyFigure } from "./BodyFigure";

const chip = (on: boolean) =>
  `rounded-full border px-3 py-1.5 text-sm transition ${
    on
      ? "border-teal bg-teal text-cream"
      : "border-line bg-white text-ink hover:border-teal"
  }`;

function Multi({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { name: string; detail?: string }[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="font-semibold">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map(({ name, detail }) => {
          const on = value.includes(name);
          return (
            <button
              key={name}
              type="button"
              aria-pressed={on}
              title={detail}
              className={chip(on)}
              onClick={() =>
                onChange(
                  on ? value.filter((v) => v !== name) : [...value, name],
                )
              }
            >
              {name}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Single({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-semibold">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={value === name}
            className={chip(value === name)}
            onClick={() => onChange(value === name ? "" : name)}
          >
            {name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

const blank = {
  areas: [] as string[],
  sensations: [] as string[],
  strength: 5,
  doing: "",
  company: "",
  feeling: "",
  emotion: "",
  note: "",
};

const when = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export function BodyScanTool() {
  const scans = useSyncExternalStore(
    subscribeBodyScans,
    getBodyScansSnapshot,
    getBodyScansServerSnapshot,
  );
  const [form, setForm] = useState(blank);
  const [justSaved, setJustSaved] = useState(false);
  const set = <K extends keyof typeof blank>(key: K, v: (typeof blank)[K]) => {
    setJustSaved(false);
    setForm((f) => ({ ...f, [key]: v }));
  };

  const canSave = form.areas.length > 0 && form.sensations.length > 0;
  const strong = form.strength >= 7 && form.feeling === "Unpleasant";

  return (
    <section className="rounded-2xl border border-teal bg-white p-5">
      <p className="text-xs uppercase tracking-widest text-teal">
        Interactive tool
      </p>
      <h3 className="mt-1 text-2xl">Body Scan</h3>

      <form
        className="mt-5 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSave) return;
          addBodyScan(form);
          setForm(blank);
          setJustSaved(true);
        }}
      >
        <div className="grid gap-6 sm:grid-cols-[1fr_12rem]">
          <div className="space-y-6">
            <Multi
              legend="Where in the body did you notice something?"
              options={bodyAreas.map((name) => ({ name }))}
              value={form.areas}
              onChange={(v) => set("areas", v)}
            />
            <Multi
              legend="What did it feel like?"
              options={sensationGroups}
              value={form.sensations}
              onChange={(v) => set("sensations", v)}
            />
          </div>
          <div className="sm:order-last">
            <BodyFigure value={form.areas} onChange={(v) => set("areas", v)} />
            <p className="mt-2 text-center text-xs opacity-70">
              Click a dot on the body or use the buttons.
            </p>
          </div>
        </div>
        <div>
          <label htmlFor="strength" className="font-semibold">
            How strong did it feel? <span>{form.strength}</span> / 10
          </label>
          <input
            id="strength"
            type="range"
            min={0}
            max={10}
            value={form.strength}
            onChange={(e) => set("strength", Number(e.target.value))}
            className="mt-2 block w-full accent-teal"
          />
        </div>
        <Single
          legend="What are you doing right now?"
          options={doingOptions}
          value={form.doing}
          onChange={(v) => set("doing", v)}
        />
        <Single
          legend="Who are you with?"
          options={companyOptions}
          value={form.company}
          onChange={(v) => set("company", v)}
        />
        <Single
          legend="How does what you are doing feel to you?"
          options={feelingOptions}
          value={form.feeling}
          onChange={(v) => set("feeling", v)}
        />
        <Single
          legend="Can you name an emotion you are experiencing right now?"
          options={emotionOptions}
          value={form.emotion}
          onChange={(v) => set("emotion", v)}
        />
        <div>
          <label htmlFor="note" className="font-semibold">
            Note (optional)
          </label>
          <input
            id="note"
            type="text"
            value={form.note}
            onChange={(e) => set("note", e.target.value)}
            className="mt-2 block w-full rounded-xl border border-line px-3 py-2"
          />
        </div>

        {strong && (
          <p className="rounded-xl bg-sand p-3 text-sm">
            If the sensations are too strong and unpleasant, you may want to try
            a{" "}
            <Link href="/practices" className="text-teal underline">
              regulation practice
            </Link>
            .
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={!canSave}
            className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-cream disabled:opacity-40"
          >
            Save scan
          </button>
          {!canSave && (
            <span className="text-sm opacity-70">
              Choose at least one body area and one sensation.
            </span>
          )}
          {justSaved && (
            <span role="status" className="text-sm text-teal">
              Scan saved.
            </span>
          )}
        </div>
      </form>

      <div className="mt-8 border-t border-line pt-5">
        <h4 className="font-semibold">Your scans ({scans.length})</h4>
        {scans.length === 0 ? (
          <p className="mt-2 text-sm opacity-70">
            No scans yet. Aim for 3 to 4 a day over the next three days.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {scans.map((s) => (
              <li
                key={s.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-line p-3 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {when.format(new Date(s.createdAt))} · strength {s.strength}
                  </p>
                  <p>
                    {s.areas.join(", ")}: {s.sensations.join(", ")}
                  </p>
                  <p className="opacity-70">
                    {[s.doing, s.company, s.feeling, s.emotion, s.note]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteBodyScan(s.id)}
                  className="shrink-0 text-teal underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-xs opacity-60">
          Scans are saved in this browser only until accounts are built.
        </p>
      </div>
    </section>
  );
}

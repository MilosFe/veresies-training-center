import type { Metadata } from "next";
import { getFocusedPrograms } from "@/lib/content";

export const metadata: Metadata = { title: "Focused Programs" };

const tints = [
  "bg-level-1",
  "bg-rose",
  "bg-level-2",
  "bg-level-3",
  "bg-level-4",
  "bg-level-5",
];

export default async function FocusedProgramsPage() {
  const programs = await getFocusedPrograms();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl italic">Focused Programs</h1>
      <p className="mt-2">Short trainings for specific challenges.</p>
      <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        {programs.map((p, i) => (
          <li
            key={p.slug}
            className={`flex h-28 flex-col items-center justify-center rounded-2xl px-3 text-center text-white ${tints[i % tints.length]}`}
          >
            <span>{p.title}</span>
            {p.durationLabel && (
              <span className="text-sm">{p.durationLabel}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

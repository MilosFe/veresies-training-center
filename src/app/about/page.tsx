import type { Metadata } from "next";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const team = await getTeam();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl italic">About us</h1>
      <div className="mt-4 max-w-xl space-y-3 leading-relaxed">
        <p>
          Veresies Training Center was created by the Veresies family: mental
          health professionals working together at Veresies Medical Center in
          Cyprus.
        </p>
        <p>
          Our shared experience brings together the knowledge and perspectives
          from psychology, psychotherapy, and clinical practice.
        </p>
        <p>
          We believe that trust and connection create a space where we can
          share, grow, and heal together.
        </p>
      </div>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {team.map((m) => (
          <li key={m.name} className="text-center">
            <div className="aspect-[3/4] rounded-xl bg-sand" />
            <p className="mt-3 font-medium">{m.name}</p>
            <p className="text-sm">{m.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

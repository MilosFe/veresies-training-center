import type { Metadata } from "next";
import Image from "next/image";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const team = await getTeam();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
        <div>
          <h1 className="text-4xl italic">About us</h1>
          <div className="mt-4 space-y-3 leading-relaxed">
            <p>
              Veresies Training Center was created by the Veresies family:
              mental health professionals working together at Veresies Medical
              Center in Cyprus.
            </p>
            <p>
              Our shared experience brings together the knowledge and
              perspectives from psychology, psychotherapy, and clinical
              practice.
            </p>
            <p>
              We believe that trust and connection create a space where we can
              share, grow, and heal together.
            </p>
          </div>
        </div>
        <Image
          src="/images/about.jpg"
          alt="Watercolour of the Veresies centre"
          width={619}
          height={411}
          className="h-auto w-full"
        />
      </div>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {team.map((m) => (
          <li key={m.name} className="text-center">
            <Image
              src={m.photo}
              alt={m.name}
              width={195}
              height={260}
              className="mx-auto h-auto w-full max-w-52"
            />
            <p className="mt-3 font-medium">{m.name}</p>
            <p className="text-sm">{m.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

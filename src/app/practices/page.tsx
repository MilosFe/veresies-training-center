import type { Metadata } from "next";
import Link from "next/link";
import { getPracticeCategories } from "@/lib/content";

export const metadata: Metadata = { title: "Practices" };

export default async function PracticesPage() {
  const categories = await getPracticeCategories();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl italic">Practices</h1>
      <p className="mt-2">Self-care & regulation.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-[1fr_3fr]">
        <div className="rounded-2xl border border-ink bg-line/60 p-5">
          <p className="font-semibold">Interactive Tools</p>
          <Link
            href="/tools/body-scan"
            className="mt-3 block text-teal underline"
          >
            Body Scan
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2">
          {categories.map((c) => (
            <li
              key={c.slug}
              style={{ backgroundColor: c.tint }}
              className="flex h-20 items-center justify-center rounded-2xl border border-ink font-semibold text-teal"
            >
              {c.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

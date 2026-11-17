import Link from "next/link";
import type { Product } from "@/content/types";
import { levelColor } from "@/lib/content";

// The five-level pyramid of trainings: level 5 on top, level 1 at the bottom.
export function Pyramid({ trainings }: { trainings: Product[] }) {
  const levels = [5, 4, 3, 2, 1] as const;
  return (
    <div className="flex flex-col items-center gap-2">
      {levels.map((level) => (
        <ul key={level} className="flex flex-wrap justify-center gap-2">
          {trainings
            .filter((t) => t.level === level)
            .map((t) => (
              <li key={t.slug} className="relative">
                <Link
                  href={`/trainings/${t.slug}`}
                  className={`flex h-20 w-26 items-center justify-center rounded-xl px-2 text-center text-sm text-white transition hover:brightness-110 ${levelColor[level]} ${
                    t.available ? "" : "opacity-80"
                  }`}
                >
                  {t.title}
                </Link>
                {t.mandatory && (
                  <span className="absolute -left-2 -top-2 -rotate-12 rounded bg-alert px-1.5 py-0.5 text-[0.6rem] font-semibold tracking-wide text-white">
                    MANDATORY
                  </span>
                )}
              </li>
            ))}
        </ul>
      ))}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { RequireUser } from "@/components/auth/RequireUser";
import { Pyramid } from "@/components/Pyramid";
import { getTraining, getTrainings } from "@/lib/content";
import { mockUser } from "@/lib/mock-user";

export const metadata: Metadata = { title: "My Journey" };

export default async function MyJourneyPage() {
  const trainings = await getTrainings();
  const inProgress = await Promise.all(
    mockUser.inProgress.map(async (p) => ({
      ...p,
      training: await getTraining(p.slug),
    })),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <RequireUser reason="Log in to see your trainings and your progress.">
        <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
          <aside>
            <h1 className="rounded-xl bg-teal px-4 py-2 text-center font-sans text-sm font-semibold uppercase tracking-wide !text-cream">
              Your trainings
            </h1>
            <p className="mt-6 text-sm font-semibold uppercase">In progress</p>
            {inProgress.map(({ slug, completedSteps, training }) => {
              const total = training?.steps.length ?? 1;
              const percent = Math.round((completedSteps / total) * 100);
              return (
                <Link
                  key={slug}
                  href={`/trainings/${slug}`}
                  className="mt-2 block"
                >
                  <span>{training?.title}</span>
                  <span className="block text-sm">{percent}% complete</span>
                  <span className="mt-1 block h-3 overflow-hidden rounded-full border border-teal">
                    <span
                      className="block h-full bg-teal"
                      style={{ width: `${percent}%` }}
                    />
                  </span>
                </Link>
              );
            })}
            <p className="mt-6 text-sm font-semibold uppercase">Completed</p>
            <p className="text-sm">
              {mockUser.completed.length
                ? mockUser.completed.join(", ")
                : "None yet"}
            </p>
            <p className="mt-8 rounded-xl bg-line px-4 py-2 text-center text-sm font-semibold uppercase">
              Your practices
            </p>
            <p className="mt-3 rounded-xl bg-line px-4 py-2 text-center text-sm font-semibold uppercase">
              Your focused programs
            </p>
          </aside>
          <Pyramid trainings={trainings} />
        </div>
      </RequireUser>
    </div>
  );
}

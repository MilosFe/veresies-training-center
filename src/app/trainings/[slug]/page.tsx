import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getTraining, getTrainings } from "@/lib/content";

export async function generateStaticParams() {
  return (await getTrainings()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  props: PageProps<"/trainings/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: (await getTraining(slug))?.title };
}

// The address is read inside Suspense so the page shell can render at once.
export default function TrainingPage(props: PageProps<"/trainings/[slug]">) {
  return (
    <Suspense>
      <Training params={props.params} />
    </Suspense>
  );
}

async function Training({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = await getTraining(slug);
  if (!training) notFound();

  const free = training.freeSteps ?? 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/trainings" className="text-sm text-teal underline">
        All trainings
      </Link>
      <h1 className="mt-3 text-5xl">{training.title}</h1>

      {!training.available ? (
        <p className="mt-6 rounded-2xl bg-sand p-5">
          This training is coming soon.
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm uppercase tracking-widest text-teal">
            {training.durationLabel} · {training.steps.length} activities · a
            new activity every {training.unlockEveryDays} days ·{" "}
            {training.accessMonths} months access
          </p>
          <p className="mt-6 leading-relaxed">{training.intro}</p>

          <ol className="mt-10 space-y-3">
            {training.steps.map((step) => {
              const open = step.number <= free;
              const body = (
                <>
                  <p className="text-xs uppercase tracking-widest text-teal">
                    Activity {step.number}
                    {open ? " · Free" : " · Locked"}
                  </p>
                  <h2 className="mt-1 text-2xl">{step.title}</h2>
                  <p className="mt-1 text-sm">
                    {step.tagline} {step.summary}
                  </p>
                </>
              );
              return (
                <li key={step.number}>
                  {open ? (
                    <Link
                      href={`/trainings/${training.slug}/${step.number}`}
                      className="block rounded-2xl border border-teal bg-white p-5 hover:bg-sand"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="rounded-2xl border border-line p-5 opacity-70">
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
}

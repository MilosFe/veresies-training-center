import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlockView } from "@/components/BlockView";
import { getStep, getTrainings } from "@/lib/content";

// Only steps whose content has been converted get a page.
export async function generateStaticParams() {
  return (await getTrainings()).flatMap((t) =>
    t.steps
      .filter((s) => s.blocks.length > 0)
      .map((s) => ({ slug: t.slug, step: String(s.number) })),
  );
}

export async function generateMetadata(
  props: PageProps<"/trainings/[slug]/[step]">,
): Promise<Metadata> {
  const { slug, step } = await props.params;
  const found = await getStep(slug, Number(step));
  return { title: found && `${found.step.title} · ${found.product.title}` };
}

// The address is read inside Suspense so the page shell can render at once.
export default function StepPage(props: PageProps<"/trainings/[slug]/[step]">) {
  return (
    <Suspense>
      <StepContent params={props.params} />
    </Suspense>
  );
}

async function StepContent({
  params,
}: {
  params: Promise<{ slug: string; step: string }>;
}) {
  const { slug, step: stepParam } = await params;
  const found = await getStep(slug, Number(stepParam));
  if (!found || found.step.blocks.length === 0) notFound();
  const { product, step } = found;

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href={`/trainings/${product.slug}`}
        className="text-sm text-teal underline"
      >
        {product.title}
      </Link>
      <p className="mt-4 text-xs uppercase tracking-widest text-teal">
        Activity {step.number}
      </p>
      <h1 className="text-5xl">{step.title}</h1>
      <p className="mt-2 text-lg">{step.tagline}</p>

      <div className="mt-10 space-y-8">
        {step.blocks.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
      </div>
    </article>
  );
}

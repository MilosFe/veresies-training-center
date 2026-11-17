import Link from "next/link";

const explore = [
  {
    href: "/trainings",
    title: "Trainings",
    text: "Your guided path, level by level",
  },
  {
    href: "/focused-programs",
    title: "Focused Programs",
    text: "Short trainings for specific challenges",
  },
  { href: "/practices", title: "Practices", text: "Self-care & regulation" },
];

export default function Home() {
  return (
    <>
      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[3fr_2fr] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-teal">
              Welcome!
            </p>
            <h1 className="mt-6 text-5xl leading-tight md:text-6xl">
              Your space for guided Self-Discovery and Personal Growth.
            </h1>
            <p className="mt-6 max-w-sm text-lg">
              Explore your inner world, reconnect with your body and create
              meaningful change.
            </p>
            <Link
              href="/trainings"
              className="mt-8 inline-block rounded-xl border border-teal-deep px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-teal-deep hover:bg-teal-deep hover:text-cream"
            >
              Start your journey
            </Link>
          </div>
          <div className="mx-auto w-full max-w-xs">
            <p className="text-center text-sm uppercase tracking-widest text-teal">
              Watch welcome video
            </p>
            <div className="mt-2 flex aspect-[9/16] items-center justify-center rounded-2xl bg-teal/15 text-sm text-teal">
              Welcome video
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center font-sans text-sm uppercase tracking-[0.3em]">
          Explore
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {explore.map(({ href, title, text }) => (
            <li key={href}>
              <Link href={href} className="group block text-center">
                <div className="aspect-[3/4] rounded-3xl border-4 border-teal bg-sand transition group-hover:brightness-95" />
                <h3 className="mt-4 text-3xl">{title}</h3>
                <p className="text-sm">{text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

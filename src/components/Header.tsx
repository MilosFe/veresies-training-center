import Link from "next/link";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-6">
      <Link href="/" className="leading-none">
        <span className="block font-sans text-3xl font-semibold tracking-tight text-teal-deep">
          Veresies
        </span>
        <span className="block text-[0.65rem] tracking-[0.35em] text-teal">
          TRAINING CENTER
        </span>
      </Link>
      <NavLinks />
    </header>
  );
}

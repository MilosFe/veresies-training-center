import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-6">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Veresies Training Center"
          width={272}
          height={146}
          priority
          className="h-24 w-auto"
        />
      </Link>
      <NavLinks />
    </header>
  );
}

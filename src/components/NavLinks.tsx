"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/my-journey", label: "My Journey" },
  { href: "/trainings", label: "Trainings" },
  { href: "/focused-programs", label: "Focused Programs" },
  { href: "/practices", label: "Practices" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Log in" },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-wide">
      {links.map(({ href, label }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`text-ink hover:text-teal-deep ${
              active ? "underline underline-offset-4" : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

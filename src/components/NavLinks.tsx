"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "@/lib/auth/demo-auth";
import { useUser } from "@/lib/auth/use-user";

const links = [
  { href: "/", label: "Home" },
  { href: "/my-journey", label: "My Journey" },
  { href: "/trainings", label: "Trainings" },
  { href: "/focused-programs", label: "Focused Programs" },
  { href: "/practices", label: "Practices" },
  { href: "/about", label: "About" },
];

export function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUser();
  const item = "text-ink hover:text-teal-deep";

  return (
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm uppercase tracking-wide">
      {links.map(({ href, label }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`${item} ${active ? "underline underline-offset-4" : ""}`}
          >
            {label}
          </Link>
        );
      })}
      {user ? (
        <>
          <span className="normal-case tracking-normal text-teal">
            Hi, {user.name.split(" ")[0]}
          </span>
          <button
            type="button"
            onClick={() => {
              logOut();
              router.push("/");
            }}
            className={`${item} uppercase tracking-wide`}
          >
            Log out
          </button>
        </>
      ) : (
        <Link
          href="/login"
          aria-current={pathname === "/login" ? "page" : undefined}
          // Hidden until we know whether someone is logged in, to avoid a flash.
          className={`${item} ${user === undefined ? "invisible" : ""}`}
        >
          Log in
        </Link>
      )}
    </nav>
  );
}

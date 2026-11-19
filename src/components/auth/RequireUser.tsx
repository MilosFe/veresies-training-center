"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/auth/use-user";

// Shows its children only to a logged-in user; otherwise asks them to log in.
export function RequireUser({
  children,
  reason,
}: {
  children: React.ReactNode;
  reason: string;
}) {
  const user = useUser();
  const pathname = usePathname();
  if (user === undefined) return null; // still loading
  if (user) return <>{children}</>;
  return (
    <div className="rounded-2xl bg-sand p-5">
      <p>{reason}</p>
      <Link
        href={`/login?next=${encodeURIComponent(pathname)}`}
        className="mt-3 inline-block rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-cream"
      >
        Log in or create account
      </Link>
    </div>
  );
}

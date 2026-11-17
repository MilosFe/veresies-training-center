import type { Metadata } from "next";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <h1 className="text-4xl italic">Log in</h1>
      <p className="mt-4">
        Accounts are not built yet. The site currently shows a demo user.
      </p>
    </div>
  );
}

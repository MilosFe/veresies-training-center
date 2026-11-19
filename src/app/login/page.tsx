import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <h1 className="text-center text-4xl italic">Welcome</h1>
      <p className="mt-2 text-center">
        Log in to save your work and follow your journey.
      </p>
      <div className="mt-8">
        <AuthForm />
      </div>
    </div>
  );
}

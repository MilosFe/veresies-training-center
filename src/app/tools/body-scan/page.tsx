import type { Metadata } from "next";
import Link from "next/link";
import { BodyScanTool } from "@/components/tools/BodyScanTool";

export const metadata: Metadata = { title: "Body Scan" };

export default function BodyScanPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/practices" className="text-sm text-teal underline">
        Practices
      </Link>
      <h1 className="mt-3 text-5xl">Body Scan</h1>
      <p className="mt-2">
        Pause and notice what your body is experiencing here and now.
      </p>
      <div className="mt-8">
        <BodyScanTool />
      </div>
    </div>
  );
}

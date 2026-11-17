import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/content/types";
import { BodyScanLauncher } from "./tools/BodyScanLauncher";

const toolNames: Record<string, string> = {
  "body-scan": "Body Scan",
  "body-map": "Body Map",
  "context-map": "Context Map",
  "root-map": "Root Map",
  "list-of-changes": "My List of Changes",
  "response-map": "Response Map",
};

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p key={i} className="mt-3 leading-relaxed">
          {p}
        </p>
      ))}
    </>
  );
}

function Media({
  kind,
  title,
  note,
  transcript,
}: {
  kind: string;
  title: string;
  note: string;
  transcript?: string;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <p className="text-xs uppercase tracking-widest text-teal">{kind}</p>
      <h3 className="mt-1 text-2xl">{title}</h3>
      <p className="mt-2 text-sm opacity-70">{note}</p>
      {transcript && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-teal">Read the text</summary>
          <Paragraphs text={transcript} />
        </details>
      )}
    </section>
  );
}

// Renders one content block. Add a case here when a new block type appears.
export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "video":
      return (
        <Media
          kind="Video"
          title={block.title}
          note={block.ready ? "Video" : "Video not recorded yet."}
          transcript={block.transcript}
        />
      );
    case "audio":
      return (
        <Media
          kind="Audio"
          title={block.title}
          note="Audio not recorded yet."
          transcript={block.transcript}
        />
      );
    case "text":
      return (
        <section>
          {block.heading && <h3 className="text-2xl">{block.heading}</h3>}
          <Paragraphs text={block.body} />
        </section>
      );
    case "list":
      return (
        <section>
          {block.heading && <h3 className="text-2xl">{block.heading}</h3>}
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      );
    case "needs":
      return (
        <section className="rounded-2xl bg-sand p-5">
          <p className="font-semibold">For this activity, you will need:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      );
    case "practice":
      return (
        <section className="rounded-2xl border border-line bg-white p-5">
          <p className="text-xs uppercase tracking-widest text-teal">
            Grounding practice
          </p>
          <p className="mt-1 font-semibold">{block.title}</p>
        </section>
      );
    case "tool":
      if (block.tool === "body-scan") return <BodyScanLauncher />;
      return (
        <section className="rounded-2xl border-2 border-dashed border-teal p-5">
          <p className="text-xs uppercase tracking-widest text-teal">
            Interactive tool
          </p>
          <h3 className="mt-1 text-2xl">{toolNames[block.tool]}</h3>
          <p className="mt-2 text-sm opacity-70">
            This tool is built in the next step of the project.
          </p>
        </section>
      );
    case "reflection":
      return (
        <section>
          <ul className="space-y-2">
            {block.questions.map((q) => (
              <li key={q} className="rounded-xl border border-line p-3">
                {q}
              </li>
            ))}
          </ul>
        </section>
      );
    case "image":
      return (
        <Image
          src={block.src}
          alt={block.alt}
          width={block.width}
          height={block.height}
          className="mx-auto h-auto max-h-96 w-auto"
        />
      );
    case "download":
      return (
        <section className="rounded-2xl border border-line bg-white p-5">
          <p className="text-xs uppercase tracking-widest text-teal">
            Download
          </p>
          <p className="mt-1">{block.title}</p>
          {block.files && (
            <ul className="mt-4 flex flex-wrap gap-4">
              {block.files.map((f) => (
                <li key={f.src}>
                  <a
                    href={f.src}
                    download
                    className="block text-center text-sm"
                  >
                    <Image
                      src={f.src}
                      alt={`${f.label} wallpaper`}
                      width={f.width}
                      height={f.height}
                      className="h-64 w-auto rounded-xl"
                    />
                    <span className="mt-1 block text-teal underline">
                      Download {f.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      );
    case "homework":
      return (
        <section className="rounded-2xl bg-teal p-5 text-cream">
          <p className="text-xs uppercase tracking-widest">Homework</p>
          <Paragraphs text={block.body} />
        </section>
      );
    case "link":
      return (
        <Link href={block.href} className="block text-teal underline">
          {block.label}
        </Link>
      );
  }
}

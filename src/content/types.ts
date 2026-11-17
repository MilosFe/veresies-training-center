// The generic content model. Every product (training, focused program,
// practice) is a list of ordered steps, and every step is a list of ordered
// blocks. A new training needs new content in this shape, not new code.

export type ToolId =
  | "body-scan"
  | "body-map"
  | "context-map"
  | "root-map"
  | "list-of-changes"
  | "response-map";

export type Block =
  | { type: "video"; title: string; ready: boolean; transcript?: string }
  | { type: "audio"; title: string; transcript?: string }
  | { type: "text"; heading?: string; body: string }
  | { type: "list"; heading?: string; items: string[] }
  | { type: "needs"; items: string[] }
  | { type: "practice"; title: string }
  | { type: "tool"; tool: ToolId }
  | { type: "reflection"; questions: string[] }
  | { type: "download"; title: string }
  | { type: "homework"; body: string }
  | { type: "link"; label: string; href: string };

export type Step = {
  number: number;
  title: string;
  tagline: string;
  summary: string;
  /** Empty until the step's content has been converted from the document. */
  blocks: Block[];
};

export type ProductKind = "training" | "program" | "practice";

export type Product = {
  slug: string;
  kind: ProductKind;
  title: string;
  /** Pyramid level, 1 (bottom) to 5 (top). Trainings only. */
  level?: 1 | 2 | 3 | 4 | 5;
  mandatory?: boolean;
  available: boolean;
  durationLabel?: string;
  intro?: string;
  /** How many steps are open before purchase. */
  freeSteps?: number;
  unlockEveryDays?: number;
  accessMonths?: number;
  steps: Step[];
};

export type PracticeCategory = { slug: string; title: string; tint: string };

export type TeamMember = { name: string; role: string };

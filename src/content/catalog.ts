import type { PracticeCategory, Product, TeamMember } from "./types";
import { stressReset } from "./stress-reset";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const training = (
  title: string,
  level: Product["level"],
  mandatory = false,
): Product => ({
  slug: slugify(title),
  kind: "training",
  title,
  level,
  mandatory,
  available: false,
  steps: [],
});

// The pyramid from the "My Journey" mockup, bottom level first.
export const trainings: Product[] = [
  stressReset,
  training("Crisis & Loss", 1),
  training("Burnout & Depression", 1),
  training("Anxiety", 1),
  training("Addictions", 1),
  training("Psychosomatics", 1),
  training("Trauma Work I", 1),

  training("Self-Esteem", 2, true),
  training("Brain & Habits", 2),
  training("Fear & Courage", 2),
  training("Anger", 2),
  training("Digital Wellness", 2),
  training("Trauma Work II", 2),

  training("Self-Confidence", 3, true),
  training("Shame & Guilt", 3),
  training("Boundaries", 3),
  training("Relationships", 3),

  training("Emotional Intelligence", 4, true),
  training("Motivation", 4),
  training("Parenting", 4),

  training("Creativity", 5),
];

const program = (title: string, durationLabel?: string): Product => ({
  slug: slugify(title),
  kind: "program",
  title,
  durationLabel,
  available: false,
  steps: [],
});

export const focusedPrograms: Product[] = [
  program("I Cannot Say No", "1 week / 3 sessions"),
  program("Good Girl / Boy"),
  program("Developing Autonomy from Parents"),
  program("Empty Nest", "1 week / 3 sessions"),
  program("Perfectionism"),
  program("Burnout"),
  program("Role Reversals"),
  program("Fear of Success"),
  program("Self-Sabotage"),
  program("Putting Myself First"),
  program("Repeating Patterns"),
  program("Rescuer Syndrome"),
];

export const practiceCategories: PracticeCategory[] = [
  { slug: "grounding", title: "Grounding", tint: "#dbe2d6" },
  {
    slug: "sleep-and-relaxation",
    title: "Sleep & Relaxation",
    tint: "#ddd3e3",
  },
  { slug: "emotional-release", title: "Emotional Release", tint: "#e8d2d0" },
  {
    slug: "nervous-system-regulation",
    title: "Nervous System Regulation",
    tint: "#d3e0e4",
  },
  { slug: "breathing", title: "Breathing", tint: "#e9ddc8" },
  { slug: "visualization", title: "Visualization", tint: "#d5dfd6" },
];

export const team: TeamMember[] = [
  {
    name: "Gina Veresie",
    role: "Psychologist & Analytical Body Psychotherapist",
    photo: "/images/team/gina-veresie.jpg",
  },
  {
    name: "Kyriakos Veresies",
    role: "Addiction Psychiatrist & Neurologist",
    photo: "/images/team/kyriakos-veresies.jpg",
  },
  {
    name: "Louiza Veresie",
    role: "Psychiatrist & Psychotherapist",
    photo: "/images/team/louiza-veresie.jpg",
  },
  {
    name: "Ivan Veresie",
    role: "Neurologist & Neuroscience Specialist",
    photo: "/images/team/ivan-veresie.jpg",
  },
];

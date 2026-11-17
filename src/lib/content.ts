// Data access for content. Pages call these functions and nothing else, so
// the source can change from local files to a real API without touching pages.
import {
  focusedPrograms,
  practiceCategories,
  team,
  trainings,
} from "@/content/catalog";
import type { Product, Step } from "@/content/types";

export async function getTrainings(): Promise<Product[]> {
  return trainings;
}

export async function getTraining(slug: string): Promise<Product | undefined> {
  return trainings.find((t) => t.slug === slug);
}

export async function getStep(
  slug: string,
  stepNumber: number,
): Promise<{ product: Product; step: Step } | undefined> {
  const product = await getTraining(slug);
  const step = product?.steps.find((s) => s.number === stepNumber);
  return product && step ? { product, step } : undefined;
}

export async function getFocusedPrograms(): Promise<Product[]> {
  return focusedPrograms;
}

export async function getPracticeCategories() {
  return practiceCategories;
}

export async function getTeam() {
  return team;
}

export const levelColor: Record<number, string> = {
  1: "bg-level-1",
  2: "bg-level-2",
  3: "bg-level-3",
  4: "bg-level-4",
  5: "bg-level-5",
};

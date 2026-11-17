import type { Metadata } from "next";
import { Pyramid } from "@/components/Pyramid";
import { getTrainings } from "@/lib/content";

export const metadata: Metadata = { title: "Trainings" };

export default async function TrainingsPage() {
  const trainings = await getTrainings();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl italic">Trainings</h1>
      <p className="mt-2 max-w-xl">
        Trainings build on each other from the bottom of the pyramid to the top.
        Start with Stress Reset.
      </p>
      <div className="mt-10">
        <Pyramid trainings={trainings} />
      </div>
    </div>
  );
}

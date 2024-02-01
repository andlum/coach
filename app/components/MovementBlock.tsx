import type { Exercise, Movement, ExerciseSet } from "@prisma/client";
import { useState } from "react";

import { ExerciseSelect } from "~/routes/api.exercises";

import MovementForm from "./MovementForm";

export default function MovementBlock({
  name,
  exercise,
  initialSets,
}: {
  name: string;
  exercise: Partial<Exercise>;
  initialSets?: Partial<ExerciseSet>[];
}) {
  return (
    <div className="mt-6 space-y-2">
      <h2 className="font-bold">{exercise?.name}</h2>
      <input type="hidden" name={`${name}[slug]`} value={exercise?.slug} />
      <MovementForm
        name={name}
        schemes={exercise?.schemes}
        initialSets={initialSets}
      />
    </div>
  );
}

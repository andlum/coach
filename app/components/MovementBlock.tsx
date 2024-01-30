import type { Exercise, Movement, Set } from "@prisma/client";
import { useState } from "react";

import { ExerciseSelect } from "~/routes/api.exercises";

import MovementForm from "./MovementForm";

export default function MovementBlock({
  name,
  initialValue,
}: {
  name: string;
  initialValue?: Partial<Movement> & { exercise: Exercise; sets: Set[] };
}) {
  console.log(initialValue);
  const [exercise, setExercise] = useState<Partial<Exercise>>(
    initialValue?.exercise,
  );

  const handleSelect = (exercise: Exercise) => {
    setExercise(exercise);
  };

  return exercise ? (
    <div className="mt-6 space-y-2">
      <h2 className="font-bold">{exercise?.name}</h2>
      <input type="hidden" name={`${name}[slug]`} value={exercise?.slug} />
      <MovementForm
        name={name}
        scheme={exercise?.scheme}
        initialSets={initialValue?.sets}
      />
    </div>
  ) : (
    <ExerciseSelect onSelect={handleSelect} />
  );
}

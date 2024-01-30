import type { Movement } from "@prisma/client";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import SetRow from "~/components/SetRow";
import { ExerciseSelect } from "~/routes/api.exercises";
import MovementForm from "./MovementForm";

export default function MovementBlock({
  name,
  initivalValue,
}: {
  name: string;
  initialValue?: Partial<Movement>;
}) {
  const [exercise, setExercise] = useState<any>(initivalValue?.exercise);
  const [sets, setSets] = useState<any[]>([{}]);

  const handleSelect = (exercise: any) => {
    setExercise(exercise);
  };

  return exercise ? (
    <div className="mt-6">
      <h2 className="font-bold">{exercise?.name}</h2>
      <input type="hidden" name={`${name}[slug]`} value={exercise?.slug} />
      <MovementForm scheme={exercise?.scheme} name={name} />
    </div>
  ) : (
    <ExerciseSelect onSelect={handleSelect} />
  );
}

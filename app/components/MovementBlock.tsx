import type { Movement } from "@prisma/client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import SetRow from "~/components/SetRow";
import { ExerciseSelect } from "~/routes/api.exercises";

export default function MovementBlock({
  order,
  initivalValue,
}: {
  order: number;
  initialValue?: Partial<Movement>;
}) {
  const [exercise, setExercise] = useState<any>(initivalValue?.exercise);
  const [sets, setSets] = useState<any[]>([{}]);

  const handleSelect = (exercise: any) => {
    setExercise(exercise);
  };

  return exercise ? (
    <div>
      <h2>{exercise?.name}</h2>
      <div>
        {sets.map((row, i) => (
          <SetRow key={i} scheme={exercise?.scheme} />
        ))}
      </div>
      <Button onClick={() => setSets((prev) => [...prev, {}])}>Add Set</Button>
    </div>
  ) : (
    <ExerciseSelect onSelect={handleSelect} />
  );
}

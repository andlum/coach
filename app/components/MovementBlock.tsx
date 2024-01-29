import type { Movement } from "@prisma/client";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import SetRow from "~/components/SetRow";
import { ExerciseSelect } from "~/routes/api.exercises";

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
    <div>
      <h2>{exercise?.name}</h2>
      <input type="hidden" name={`${name}[slug]`} value={exercise?.slug} />
      <div>
        {sets.map((row, i) => (
          <SetRow
            key={i}
            name={`${name}[sets][${i}]`}
            scheme={exercise?.scheme}
            order={i + 1}
          />
        ))}
      </div>
      <Button onClick={() => setSets((prev) => [...prev, {}])}>Add Set</Button>
    </div>
  ) : (
    <ExerciseSelect onSelect={handleSelect} />
  );
}

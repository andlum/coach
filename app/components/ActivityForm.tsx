import type { Exercise, ExerciseSet } from "@prisma/client";
import { useState } from "react";

import type { ExerciseSelectData } from "~/routes/api.exercises";

import ActivitySelect from "./ActivitySelect";
import ExerciseModal from "./ExerciseModal";
import MovementBlock from "./MovementBlock";

export interface Movement {
  exercise: Exercise;
  sets: Pick<ExerciseSet, "type" | "order" | "value">[];
}

// Abstract for Routine or Workout
export interface Activity {
  name: string;
  description: string | null;
  activity: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movements: Movement[];
}

export default function WorkoutForm({
  initialValues,
}: {
  initialValues?: Activity;
}) {
  const [activity, setActivity] = useState<string>(
    initialValues?.activity ?? "lifting",
  );
  const [movements, setMovements] = useState<Movement[]>(
    initialValues?.movements || [],
  );

  const addMovements = (exercises: ExerciseSelectData[]) => {
    const newMoves = exercises.map((exercise) => ({
      exercise,
      sets: [],
    }));

    setMovements((prev) => [
      ...prev,
      ...newMoves.map((move) => ({
        exercise: move.exercise as Exercise,
        sets: move.sets,
      })),
    ]);
  };

  return (
    <fieldset className="flex flex-col space-y-6">
      <input
        className="text-2xl font-bold"
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={initialValues?.name}
      />
      <input
        type="text"
        name="description"
        placeholder="Add a note"
        defaultValue={initialValues?.description ?? ""}
      />
      <ActivitySelect onChange={setActivity} />
      {activity === "lifting" ? (
        <div className="w-[600px]">
          {movements.map((movement: Partial<Movement>, index) => (
            <MovementBlock
              name={`movements[${index}]`}
              key={index}
              exercise={movement?.exercise || {}}
              initialSets={movement?.sets}
            />
          ))}
          {/* <Button type="button" onClick={addExercise}>
            Add Exercises
          </Button> */}
          <ExerciseModal onAdd={addMovements} />
        </div>
      ) : null}
    </fieldset>
  );
}

import type { Movement } from "@prisma/client";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import ActivitySelect from "./ActivitySelect";
import MovementBlock from "./MovementBlock";

// Abstract for Routine or Workout
export interface Activity {
  name: string;
  description: string | null;
  activity: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movements: any[];
}

export default function WorkoutForm({
  initialValues,
}: {
  initialValues?: Activity;
}) {
  const [activity, setActivity] = useState<string>(
    initialValues?.activity || "Lifting",
  ); // ["Lifting", "Running", "Climbing", "Yoga"
  const [movements, setMovements] = useState<Partial<Movement>[]>(
    initialValues?.movements || [],
  );

  const addSet = () => {
    setMovements((prev) => [...prev, {}]);
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
              initialValue={movement}
            />
          ))}
          <Button type="button" onClick={addSet}>
            Add Exercise
          </Button>
        </div>
      ) : null}
    </fieldset>
  );
}

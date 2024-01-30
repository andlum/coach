import type { Movement } from "@prisma/client";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import qs from "qs";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import MovementBlock from "~/components/MovementBlock";
import { createRoutine } from "~/models/routine.server";
import { requireUserId } from "~/session.server";
import ActivitySelect from "~/components/ActivitySelect";

const setSchema = z.object({
  // type: z.string(),
  time: z.string().optional(),
  reps: z.string().optional(),
  weight: z.string().optional(),
});

const movementSchema = z.object({
  slug: z.string(),
  sets: z.array(setSchema),
});

const routineSchema = z.object({
  name: z.string().min(1),
  activity: z.string().min(1),
  description: z.string(),
  movements: z.array(movementSchema).optional(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = qs.parse(await request.text());

  const parsed = await routineSchema.safeParse(formData);

  if (!parsed.success) {
    console.log(await parsed.error);
    return json({ error: await parsed.error.format() });
  }

  const newRoutine = parsed.data;

  const routine = await createRoutine({
    ...newRoutine,
    userId,
    movements: newRoutine.movements || [],
  });

  return redirect(`/routines/${routine.id}`);
};

export default function NewRoutinePage() {
  // const actionData = useActionData<typeof action>();

  const [activity, setActivity] = useState<string>("lifting"); // ["Lifting", "Running", "Climbing", "Yoga"
  const [movements, setMovements] = useState<Partial<Movement>[]>([]);

  const addSet = () => {
    setMovements((prev) => [...prev, {}]);
  };

  return (
    <div className="p-8">
      <Form method="post">
        <fieldset className="flex flex-col">
          <input
            className="text-2xl font-bold"
            type="text"
            name="name"
            placeholder="New Routine"
          />
          <label>
            <span>Description: </span>
            <textarea name="description" />
          </label>
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

        <button
          type="submit"
          className="inline-block px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Create
        </button>
      </Form>
    </div>
  );
}

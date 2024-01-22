import { Button } from "@/components/ui/button";
import type { Movement } from "@prisma/client";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { z } from "zod";
import MovementBlock from "~/components/MovementBlock";

// import { useState } from "react";

import { createRoutine } from "~/models/routine.server";
import { requireUserId } from "~/session.server";

const setSchema = z.object({
  exerciseId: z.string(),
  type: z.string(),
  order: z.number(),
  time: z.number(),
  reps: z.number(),
  weight: z.number(),
});

const routineSchema = z.object({
  name: z.string().min(1),
  activity: z.string().min(1),
  description: z.string(),
  sets: z.array(setSchema),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const parsed = routineSchema.safeParse(formData);

  if (!parsed.success) {
    return json({ error: parsed.error.format() });
  }

  const newRoutine = parsed.data;

  const routine = await createRoutine({ ...newRoutine, userId });

  return redirect(`/routines/${routine.id}`);
};

export default function NewRoutinePage() {
  // const actionData = useActionData<typeof action>();

  const [movements, setMovements] = useState<Partial<Movement>[]>([]);

  const addSet = () => {
    console.log("add set");
    setMovements((prev) => [...prev, {}]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">New Routine</h2>
      <Form method="post">
        <div>
          <label>
            <span>Name: </span>
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            <span>Description: </span>
            <textarea name="description" />
          </label>
        </div>
        <div>
          <label>
            <span>Activity: </span>
            <select name="activity">
              <option>Climbing</option>
              <option>Weightlifting</option>
              <option>Running</option>
              <option>Yoga</option>
            </select>
          </label>
        </div>
        <div className="w-[600px]">
          {movements.map((movement: any, index) => (
            <MovementBlock key={index} order={index} initivalValue={movement} />
          ))}
          <Button type="button" onClick={addSet}>
            Add Exercise
          </Button>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </Form>
    </div>
  );
}

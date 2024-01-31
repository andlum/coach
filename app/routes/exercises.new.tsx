import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useRef } from "react";

import { createExercise } from "~/models/exercise.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const schemes = formData.get("schemes");
  const force = formData.get("force");
  const equipment = formData.get("equipment");
  const mechanic = formData.get("mechanic");

  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Name is required" } }, { status: 400 });
  }

  // if (typeof schemes !== "array" || scheme.length === 0) {
  //   return json({ errors: { scheme: "Scheme is required" } }, { status: 400 });
  // }

  if (typeof force !== "string" || force.length === 0) {
    return json({ errors: { force: "Force is required" } }, { status: 400 });
  }

  if (typeof equipment !== "string" || equipment.length === 0) {
    return json(
      { errors: { equipment: "Equipment is required" } },
      { status: 400 },
    );
  }

  if (typeof mechanic !== "string" || mechanic.length === 0) {
    return json(
      { errors: { mechanic: "Mechanic is required" } },
      { status: 400 },
    );
  }

  const exercise = await createExercise({
    name,
    schemes,
    force,
    equipment,
    mechanic,
    target: null,
  });

  return redirect(`/exercises/${exercise.slug}`);
};

export default function NewExercisePage() {
  const actionData = useActionData<typeof action>();
  const nameRef = useRef<HTMLInputElement>(null);
  const schemeRef = useRef<HTMLSelectElement>(null);
  const forceRef = useRef<HTMLSelectElement>(null);
  const equipmentRef = useRef<HTMLSelectElement>(null);
  const mechanicRef = useRef<HTMLSelectElement>(null);

  return (
    <div>
      <h3 className="text-2xl font-bold">New Exercise</h3>
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Name: </span>
            <input
              ref={nameRef}
              name="name"
              className="border border-gray-300 rounded px-4 py-2"
            />
          </label>
          <label className="flex w-full flex-col gap-1">
            <span>Scheme: </span>
            <select
              ref={schemeRef}
              name="schemes"
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="weight">Reps x Weight</option>
              <option value="reps">Reps</option>
              <option value="time">Time</option>
            </select>
          </label>
          <label className="flex w-full flex-col gap-1">
            <span>Force: </span>
            <select
              ref={forceRef}
              name="force"
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="push">Push</option>
              <option value="pull">Pull</option>
              <option value="legs">Legs</option>
              <option value="hinge">Hinge</option>
            </select>
          </label>
          <label className="flex w-full flex-col gap-1">
            <span>Equipment: </span>
            <select
              ref={equipmentRef}
              name="equipment"
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="body">Body</option>
              <option value="barbell">Barbell</option>
              <option value="dumbbell">Dumbbell</option>
            </select>
          </label>
          <label className="flex w-full flex-col gap-1">
            <span>Mechanic: </span>
            <select
              ref={mechanicRef}
              name="mechanic"
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="compound">Compound</option>
              <option value="isolation">Isolation</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Create
        </button>
      </Form>
    </div>
  );
}

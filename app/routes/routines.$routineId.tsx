import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getRoutine } from "~/models/routine.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.routineId, "routine not found");

  const userId = await requireUserId(request);

  const routine = await getRoutine({ id: params.routineId, userId });
  if (!routine) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ routine });
};

export default function RoutinesPage() {
  const { routine } = useLoaderData<typeof loader>();

  console.log(routine);

  return (
    <div>
      <h1>{routine.name}</h1>
      <span>(id: {routine.id})</span>
      <p>{routine.activity}</p>
      {routine.movements.map((movement, i) => {
        return (
          <div key={i}>
            <h3>{movement.exercise.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

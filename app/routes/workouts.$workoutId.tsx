import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getWorkout } from "~/models/workout.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.workoutId, "workout not found");

  const userId = await requireUserId(request);

  const workout = await getWorkout({ id: params.workoutId, userId });
  if (!workout) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ workout });
};

export default function WorkoutDetailsPage() {
  const { workout } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{workout.name}</h1>
      <span>(id: {workout.id})</span>
      <p>{workout.activity}</p>
      {workout.movements.map((movement, i) => {
        return (
          <div key={i} className="w-80">
            <h3 className="font-bold">{movement.exercise.name}</h3>
            {movement.sets.map((set, i) => {
              return (
                <div key={i} className="grid grid-cols-3 col-gap-2">
                  <div>{i + 1}</div>
                  <div>{set.value?.reps} x </div>
                  <div>{set.value?.weight} lbs</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

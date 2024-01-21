import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getExercise } from "~/models/exercise.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.slug, "slug not found");

  const exercise = await getExercise({ slug: params.slug });
  if (!exercise) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ exercise });
};

export default function ExerciseDetailsPage() {
  const { exercise } = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{exercise.name}</h3>
      <hr className="my-4" />
      <h3>Details</h3>
      <dl>
        <dt>Target</dt>
        <dd>{JSON.stringify(exercise.target)}</dd>
        <dt>Scheme</dt>
        <dd>{exercise.scheme}</dd>
        <dt>Mechanic</dt>
        <dd>{exercise.mechanic}</dd>
        <dt>Force</dt>
        <dd>{exercise.force}</dd>
        <dt>Equipment</dt>
        <dd>{exercise.equipment}</dd>
      </dl>
      <h3>Instructions</h3>
    </div>
  );
}

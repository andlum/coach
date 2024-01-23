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

  return (
    <div>
      View Page for {routine.name}(id: {routine.id})
    </div>
  );
}

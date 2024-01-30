import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import ActivityForm, { Activity } from "~/components/ActivityForm";
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
    <div className="p-8">
      <Form method="post">
        <ActivityForm initialValues={routine as Activity} />
        <button
          type="submit"
          className="inline-block px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </Form>
    </div>
  );
}

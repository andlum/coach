import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import Header from "~/layout/Header";
import { getWorkouts } from "~/models/workout.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);

  const workouts = await getWorkouts({ userId });

  return json({ workouts });
};

export default function WorkoutsPage() {
  const { workouts } = useLoaderData<typeof loader>();

  return (
    <div>
      <Header />
      <aside>
        <ul>
          {workouts.map((workout) => {
            return (
              <li key={workout.id}>
                <Link to={workout.id}>{workout.name}</Link>
              </li>
            );
          })}
          <li>
            <Link to="new">+ New Workout</Link>
          </li>
        </ul>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

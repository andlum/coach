import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { getRoutines } from "~/models/routine.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);

  const routines = await getRoutines({ userId });

  return json({ routines });
};

export default function RoutinesPage() {
  const { routines } = useLoaderData<typeof loader>();

  return (
    <div>
      <header>
        <h1>Routines</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <aside>
        <ul>
          {routines.map((routine) => {
            return (
              <li key={routine.id}>
                <Link to={routine.id}>{routine.name}</Link>
              </li>
            );
          })}
          <li>
            <Link to="new">+ New Routine</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

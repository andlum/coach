import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { Button } from "@/components/ui/button";
import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Coach" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative flex flex-col items-center justify-center">
      <h1 className="text-xl">Coach</h1>
      <nav>
        <ul className="flex flex-row space-x-2">
          {user ? (
            <li>
              <Link to="/routines">Routines</Link>
            </li>
          ) : null}
          {user ? (
            <li>
              <Link to="/workouts">Workouts</Link>
            </li>
          ) : null}
          <li>
            <Link to="/exercises">Exercises</Link>
          </li>
        </ul>
      </nav>
      <Button>Record a Workout</Button>
    </main>
  );
}

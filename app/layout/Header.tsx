import { Link } from "@remix-run/react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "~/components/ModeToggle";
import { useOptionalUser } from "~/utils";

export default function Header({ className }: { className?: string }) {
  const user = useOptionalUser();

  return (
    <header
      className={cn(
        "w-full flex items-end justify-between content-end p-4 ",
        className,
      )}
    >
      <h1 className="text-3xl font-bold text-primary">Coach</h1>
      <nav>
        <ul className="flex flex-row items-center space-x-4 font-medium">
          <li>
            <Link to="/routines">Routines</Link>
          </li>
          <li>
            <Link to="/workouts">Workouts</Link>
          </li>
          <li>
            <Link to="/exercises">Exercises</Link>
          </li>
          <li>
            {user ? (
              <Link to="/logout">Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

import { cn } from "@/lib/utils";
import { useOptionalUser } from "~/utils";

export default function Header({ className }: { className?: string }) {
  const user = useOptionalUser();

  return (
    <header
      className={cn(
        "w-full flex items-center justify-evenly content-end p-4 bg-gray-800 text-white",
        className,
      )}
    >
      <h1 className="text-3xl font-bold">Coach</h1>
      <nav>
        <ul className="flex flex-row space-x-4">
          <li>
            <a href="/routines">Routines</a>
          </li>
          <li>
            <a href="/workouts">Workouts</a>
          </li>
          <li>
            <a href="/exercises">Exercises</a>
          </li>
          <li>
            {user ? <a href="/logout">Logout</a> : <a href="/login">Login</a>}
          </li>
        </ul>
      </nav>
    </header>
  );
}

import type { Exercise } from "@prisma/client";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

import {
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchExercises } from "~/models/exercise.server";

export type ExerciseSelectData = Pick<Exercise, "name" | "slug" | "schemes">;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ exercises: await searchExercises() });
};

export function ExerciseList({
  onSelect,
  children,
}: {
  onSelect?: (exercise: ExerciseSelectData) => void;
  children: React.ReactNode;
}) {
  const exercisesFetcher = useFetcher<typeof loader>();
  // Load exercises on initial load
  useEffect(() => exercisesFetcher.load("/api/exercises"), []);
  const exercises = exercisesFetcher.data?.exercises ?? [];

  const handleSelect = (slug: string) => {
    const exercise = exercises?.find((e) => e.slug.toLowerCase() === slug);
    if (exercise) {
      onSelect?.(exercise);
    }
  };

  const grouped = exercises?.reduce(
    (map: Record<string, ExerciseSelectData[]>, exercise) => {
      let key = exercise.name[0];

      if (isNumber(key)) {
        key = "#";
      }

      if (map[key] === undefined) map[key] = [];

      map[key].push(exercise);
      return map;
    },
    {},
  );

  return (
    <CommandList className="flex-1">
      {children}
      {Object.keys(grouped).map((heading) => {
        return (
          <CommandGroup key={heading} heading={heading}>
            {grouped[heading].map((exercise) => (
              <CommandItem
                key={exercise.slug}
                value={exercise.slug}
                onSelect={handleSelect}
              >
                {exercise.name}
              </CommandItem>
            ))}
          </CommandGroup>
        );
      })}
    </CommandList>
  );
}

export const isNumber = (value: string) => {
  return !isNaN(parseInt(value));
};

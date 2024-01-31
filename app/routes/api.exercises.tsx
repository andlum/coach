// import { Button } from "@/components/ui/button";
import type { Exercise } from "@prisma/client";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useMemo } from "react";

import { Combobox } from "@/components/ui/combobox";
import { searchExercises } from "~/models/exercise.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ exercises: await searchExercises() });
};

type ExerciseSelectData = Pick<Exercise, "name" | "slug" | "schemes">;

export const ExerciseSelect = ({
  onSelect,
}: {
  onSelect: (value: any) => void;
}) => {
  const exercisesFetcher = useFetcher<typeof loader>();

  // Load exercises on initial load
  useEffect(() => {
    exercisesFetcher.load("/api/exercises");
  }, []);

  const exercises = exercisesFetcher.data?.exercises;

  // Only rebuild options whenever exercises change
  const options = useMemo(
    () =>
      exercises?.map((exercise: ExerciseSelectData) => ({
        label: exercise.name,
        value: exercise.slug,
      })),
    [exercises],
  );

  const handleSelect = (slug: string) => {
    const value = exercises?.find((e) => e.slug.toLowerCase() === slug);
    onSelect?.(value);
  };

  return (
    <Combobox itemType="exercise" options={options} onSelect={handleSelect} />
  );
};

import type { Exercise } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Exercise } from "@prisma/client";

export function getExercise({ slug }: Pick<Exercise, "slug">) {
  return prisma.exercise.findFirst({
    select: {
      id: true,
      name: true,
      slug: true,
      force: true,
      mechanic: true,
      equipment: true,
      target: true,
      scheme: true,
    },
    where: { slug },
  });
}

// Helper function to get exercises
export async function searchExercises(query?: string) {
  const exercises = await prisma.exercise.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      target: true,
    },
    where: {
      name: { contains: query },
    },
  });

  return exercises;
}

export function getExercises() {
  return prisma.exercise.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      force: true,
      mechanic: true,
      equipment: true,
      target: true,
      scheme: true,
    },
    orderBy: { name: "asc" },
  });
}

export function createExercise({
  name,
  scheme,
  force,
  mechanic,
  equipment,
  target,
}: Pick<
  Exercise,
  "name" | "scheme" | "force" | "mechanic" | "equipment" | "target"
>) {
  return prisma.exercise.create({
    data: {
      name,
      slug: name.toLowerCase().replace(/\s/g, "-"),
      scheme,
      force,
      mechanic,
      equipment,
      // target,
    },
  });
}

// TODO: Implement soft delete for this
export function deleteExercise({ id }: Pick<Exercise, "id">) {
  return prisma.exercise.deleteMany({
    where: { id },
  });
}

import type { Movement, Routine, User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Routine } from "@prisma/client";

export function getRoutine({
  id,
  userId,
}: Pick<Routine, "id"> & { userId: User["id"] }) {
  return prisma.routine.findFirst({
    select: {
      id: true,
      name: true,
      activity: true,
      description: true,
      movements: true,
    },
    where: { id, userId },
  });
}

export function getRoutines({ userId }: { userId: User["id"] }) {
  return prisma.routine.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      activity: true,
      description: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function createRoutine({
  name,
  activity,
  description,
  movements,
  userId,
}: Pick<Routine, "name" | "activity" | "description"> & {
  userId: User["id"];
  movements: Partial<Movement>[];
}) {
  // Create routine
  // Create movements for routine
  // Create sets for each movement in the routine

  console.log(movements);
  // TODO: trouble creating sets
  const routine = await prisma.routine.create({
    data: {
      name,
      activity,
      description,
      movements: {
        createMany: {
          data: movements.map((movement) => ({
            slug: movement.slug || "", // Ensure slug is of type string
          })),
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      movements: true,
    },
  });

  return routine;
}

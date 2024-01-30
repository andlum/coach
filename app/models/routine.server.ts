import type { Movement, Routine, User, Set } from "@prisma/client";

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
      movements: {
        select: {
          exercise: true,
          sets: {
            select: {
              type: true,
              order: true,
              value: true,
            },
          },
        },
      },
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

// TODO: Move this into a Service method
export async function createRoutine({
  name,
  activity,
  description,
  movements,
  userId,
}: Pick<Routine, "name" | "activity" | "description"> & {
  userId: User["id"];
  movements: {
    slug: Movement["slug"];
    sets: Set[];
  }[];
}) {
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

  // Create all sets for each movement
  let working_sets: Partial<Set>[] = [];

  movements.forEach((movement, movementIdx) => {
    if (movement?.sets.length > 0) {
      const sets = movement.sets.map(({ type, ...values }, i) => ({
        movementId: routine.movements[movementIdx].id, // should map to order on Routine
        type: type,
        order: i,
        value: {
          ...values,
        },
      }));

      working_sets = working_sets.concat(sets);
    }
  });

  // Note: createMany returns a count
  await prisma.set.createMany({ data: working_sets });

  return routine;
}

export async function deleteRoutine({
  id,
  userId,
}: Pick<Routine, "id"> & { userId: User["id"] }) {
  return prisma.routine.delete({
    where: { id, userId },
  });
}

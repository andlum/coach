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

export function createRoutine({
  name,
  activity,
  description,
  movements,
  userId,
}: Pick<Routine, "name" | "activity" | "description"> & {
  userId: User["id"];
  movements: Movement[];
}) {
  return prisma.routine.create({
    data: {
      name,
      activity,
      description,
      movements: {
        createMany: {
          data: movements,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

import type { Routine, User } from "@prisma/client";

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
}: Pick<Routine, "name" | "activity" | "description" | "sets"> & {
  userId: User["id"];
}) {
  return prisma.routine.create({
    data: {
      name,
      activity,
      description,
      movements,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

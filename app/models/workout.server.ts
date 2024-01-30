import type { Workout, User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Workout } from "@prisma/client";

export function getWorkout({
  id,
  userId,
}: Pick<Workout, "id"> & { userId: User["id"] }) {
  return prisma.workout.findFirst({
    select: {
      id: true,
      name: true,
      activity: true,
      duration: true,
      sets: true,
    },
    where: { id, userId },
  });
}

export function getWorkouts({ userId }: { userId: User["id"] }) {
  return prisma.workout.findMany({
    select: {
      id: true,
      name: true,
      activity: true,
      duration: true,
    },
    where: { userId },
    orderBy: { name: "asc" },
  });
}

export function createWorkout({
  name,
  activity,
  duration,
  sets,
  userId,
}: Pick<Workout, "name" | "activity" | "duration" | "sets" | "userId">) {
  return prisma.workout.create({
    data: {
      name,
      activity,
      duration,
      sets,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

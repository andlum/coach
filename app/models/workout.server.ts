import type { Workout, User, Movement } from "@prisma/client";

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
      movements: { select: { exercise: true, sets: true } },
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
  movements,
  userId,
  routineId,
}: Pick<Workout, "name" | "activity" | "duration" | "routineId"> & {
  userId: User["id"];
  movements: Partial<Movement>[];
}) {
  if (!userId) throw new Error("User ID is required to create a workout");

  return prisma.workout.create({
    data: {
      // TODO: Fix issue with required userId
      name,
      activity,
      duration,
      routineId,
      createdAt: new Date(),
      updatedAt: new Date(),
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
  });
}

import fs from "fs";

import { PrismaClient, MECHANIC, EQUIPMENT, FORCE } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// convert force string to FORCE enum
function getForce(force: string) {
  switch (force) {
    case "push":
      return FORCE.PUSH;
    case "pull":
      return FORCE.PULL;
    case "legs":
      return FORCE.LEGS;
    default:
      return null;
  }
}

// convert equipment string to EQUIPMENT enum
function getEquipment(equipment: string) {
  switch (equipment) {
    case "barbell":
      return EQUIPMENT.BARBELL;
    case "dumbbell":
      return EQUIPMENT.DUMBBELL;
    case "body only":
      return EQUIPMENT.BODYWEIGHT;
    case "cable":
      return EQUIPMENT.CABLE;
    case "kettlebells":
      return EQUIPMENT.DUMBBELL;
    case "machine":
      return EQUIPMENT.MACHINE;
    case "bands":
      return EQUIPMENT.BANDS;
    default:
      return null;
  }
}

async function seedExercises() {
  // Remove existing exercises
  await prisma.exercise.deleteMany();
  console.log("Deleted records in exercise table");

  const exercises = JSON.parse(
    fs.readFileSync("prisma/seeds/exercises.json", "utf8"),
  );

  try {
    console.log("Start seeding exercise data...");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exercises.forEach(async (exercise: any) => {
      await prisma.exercise.create({
        data: {
          name: exercise.name,
          slug: exercise.id.toLowerCase(),
          force: getForce(exercise.force),
          mechanic:
            exercise.mechanic === "compound"
              ? MECHANIC.COMPOUND
              : MECHANIC.ISOLATION,
          equipment: getEquipment(exercise.equipment),
          target: {
            primary: exercise.primaryMuscles,
            secondary: exercise.secondaryMuscles,
          },
        },
      });

      console.log("Seeded exercise: " + exercise.name);
    });
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await seedExercises();

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";

const prisma = new PrismaClient();

async function seedExercises() {
  // Remove existing exercises
  await prisma.exercise.deleteMany();
  console.log("Deleted records in exercise table");

  const exercises = JSON.parse(
    fs.readFileSync("prisma/seeds/exercises.json", "utf8")
  );

  try {
    console.log("Start seeding exercise data...");

    exercises.forEach(async (exercise: any) => {
      await prisma.exercise.create({
        data: {
          name: exercise.name,
          slug: exercise.id,
          force: exercise.force,
          mechanic: exercise.mechanic,
          equipment: exercise.equipment,
          target: { primary: exercise.primaryMuscles, secondary: exercise.secondaryMuscles },
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

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
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

/*
  Warnings:

  - The `scheme` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `equipment` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mechanic` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `force` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `exerciseId` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `routineId` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Set` table. All the data in the column will be lost.
  - Added the required column `movementId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SCHEME" AS ENUM ('REPS', 'WEIGHT', 'TIME');

-- CreateEnum
CREATE TYPE "EQUIPMENT" AS ENUM ('BODYWEIGHT', 'BARBELL', 'DUMBBELL', 'CABLE', 'MACHINE', 'BANDS');

-- CreateEnum
CREATE TYPE "MECHANIC" AS ENUM ('COMPOUND', 'ISOLATION');

-- CreateEnum
CREATE TYPE "FORCE" AS ENUM ('PUSH', 'PULL', 'LEGS', 'HINGE', 'ROTATION', 'CORE');

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_routineId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "scheme",
ADD COLUMN     "scheme" "SCHEME",
DROP COLUMN "equipment",
ADD COLUMN     "equipment" "EQUIPMENT",
DROP COLUMN "mechanic",
ADD COLUMN     "mechanic" "MECHANIC",
DROP COLUMN "force",
ADD COLUMN     "force" "FORCE";

-- AlterTable
ALTER TABLE "Routine" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "exerciseId",
DROP COLUMN "routineId",
DROP COLUMN "workoutId",
ADD COLUMN     "movementId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "equipment";

-- DropEnum
DROP TYPE "force";

-- DropEnum
DROP TYPE "mechanic";

-- DropEnum
DROP TYPE "scheme";

-- CreateTable
CREATE TABLE "Movement" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    "workoutId" TEXT,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The `scheme` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `equipment` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mechanic` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `force` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Routine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "scheme" AS ENUM ('REPS', 'WEIGHT', 'TIME');

-- CreateEnum
CREATE TYPE "equipment" AS ENUM ('BODY', 'BARBELL', 'DUMBBELL', 'CABLE', 'MACHINE');

-- CreateEnum
CREATE TYPE "mechanic" AS ENUM ('COMPOUND', 'ISOLATION');

-- CreateEnum
CREATE TYPE "force" AS ENUM ('PUSH', 'PULL', 'LEGS', 'HINGE', 'ROTATION', 'CORE');

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "scheme",
ADD COLUMN     "scheme" "scheme",
DROP COLUMN "equipment",
ADD COLUMN     "equipment" "equipment",
DROP COLUMN "mechanic",
ADD COLUMN     "mechanic" "mechanic",
DROP COLUMN "force",
ADD COLUMN     "force" "force";

-- AlterTable
ALTER TABLE "Routine" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

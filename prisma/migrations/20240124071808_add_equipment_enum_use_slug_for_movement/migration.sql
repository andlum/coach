/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Set` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EQUIPMENT" ADD VALUE 'BODYWEIGHT_PLUS';
ALTER TYPE "EQUIPMENT" ADD VALUE 'ASSISTED';
ALTER TYPE "EQUIPMENT" ADD VALUE 'SMITH';

-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "exerciseId",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "reps",
DROP COLUMN "time",
DROP COLUMN "weight",
ADD COLUMN     "value" JSONB;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_slug_fkey" FOREIGN KEY ("slug") REFERENCES "Exercise"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `scheme` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `Set` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_movementId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "scheme",
ADD COLUMN     "schemes" "SCHEME"[];

-- DropTable
DROP TABLE "Set";

-- CreateTable
CREATE TABLE "ExerciseSet" (
    "id" TEXT NOT NULL,
    "movementId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'working',
    "order" INTEGER NOT NULL,
    "value" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseSet" ADD CONSTRAINT "ExerciseSet_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

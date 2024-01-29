-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_routineId_fkey";

-- AlterTable
ALTER TABLE "Movement" ALTER COLUMN "routineId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

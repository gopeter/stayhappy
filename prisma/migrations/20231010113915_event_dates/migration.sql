-- AlterTable
ALTER TABLE "Event" RENAME COLUMN "start" TO "startAt";
-- AlterTable
ALTER TABLE "Event" RENAME COLUMN "end" TO "endAt";
-- AlterTable
ALTER TABLE "Event" ADD COLUMN "interval" interval;

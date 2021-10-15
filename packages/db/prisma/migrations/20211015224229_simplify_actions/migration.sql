/*
  Warnings:

  - You are about to drop the column `activityId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the `ActionActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_activityId_fkey";

-- DropForeignKey
ALTER TABLE "ActionActivity" DROP CONSTRAINT "ActionActivity_contentId_fkey";

-- DropForeignKey
ALTER TABLE "ActionActivity" DROP CONSTRAINT "ActionActivity_topicId_fkey";

-- DropIndex
DROP INDEX "Action_activityId_key";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "activityId",
ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "contentId" INTEGER,
ADD COLUMN     "detail" TEXT,
ADD COLUMN     "extra" JSONB,
ADD COLUMN     "hintID" TEXT,
ADD COLUMN     "stepID" TEXT,
ADD COLUMN     "topicId" INTEGER;

-- DropTable
DROP TABLE "ActionActivity";

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

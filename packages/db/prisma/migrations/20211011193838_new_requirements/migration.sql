/*
  Warnings:

  - You are about to drop the column `topicId` on the `Content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_topicId_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "topicId",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "sortIndex" INTEGER,
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "sortIndex" INTEGER;

-- CreateTable
CREATE TABLE "_ContentToTopic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContentToKC" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContentToTopic_AB_unique" ON "_ContentToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentToTopic_B_index" ON "_ContentToTopic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentToKC_AB_unique" ON "_ContentToKC"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentToKC_B_index" ON "_ContentToKC"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Content_code_key" ON "Content"("code");

-- AddForeignKey
ALTER TABLE "_ContentToTopic" ADD FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToTopic" ADD FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToKC" ADD FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToKC" ADD FOREIGN KEY ("B") REFERENCES "KC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Action_activityId_unique" RENAME TO "Action_activityId_key";

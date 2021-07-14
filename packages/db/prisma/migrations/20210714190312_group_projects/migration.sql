/*
  Warnings:

  - You are about to drop the column `projectId` on the `Group` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_projectId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "projectId";

-- CreateTable
CREATE TABLE "_GroupToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToProject_AB_unique" ON "_GroupToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToProject_B_index" ON "_GroupToProject"("B");

-- AddForeignKey
ALTER TABLE "_GroupToProject" ADD FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToProject" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `projectId` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `domainId` on the `Topic` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Domain" DROP CONSTRAINT "Domain_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_domainId_fkey";

-- DropIndex
DROP INDEX "Domain_id_projectId_idx";

-- AlterTable
ALTER TABLE "Domain" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "domainId";

-- CreateTable
CREATE TABLE "_DomainToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DomainToProject_AB_unique" ON "_DomainToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_DomainToProject_B_index" ON "_DomainToProject"("B");

-- AddForeignKey
ALTER TABLE "_DomainToProject" ADD FOREIGN KEY ("A") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DomainToProject" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

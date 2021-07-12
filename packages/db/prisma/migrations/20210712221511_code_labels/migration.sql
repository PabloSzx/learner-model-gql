/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Domain` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Domain" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Domain.code_unique" ON "Domain"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Topic.code_unique" ON "Topic"("code");

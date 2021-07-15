/*
  Warnings:

  - Added the required column `description` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "binary" BYTEA,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "json" JSONB,
ADD COLUMN     "url" TEXT;

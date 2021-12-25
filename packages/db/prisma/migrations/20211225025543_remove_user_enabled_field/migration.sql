/*
  Warnings:

  - You are about to drop the column `enabled` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_id_enabled_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "enabled";

-- AlterTable
ALTER TABLE "KcRelation" ADD COLUMN     "comment" TEXT,
ALTER COLUMN "label" DROP NOT NULL;

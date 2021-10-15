-- CreateTable
CREATE TABLE "GroupFlags" (
    "id" SERIAL NOT NULL,
    "readProjectActions" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupFlags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupFlags_groupId_key" ON "GroupFlags"("groupId");

-- AddForeignKey
ALTER TABLE "GroupFlags" ADD CONSTRAINT "GroupFlags_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

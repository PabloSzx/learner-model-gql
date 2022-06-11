-- CreateTable
CREATE TABLE "KcRelation" (
    "id" SERIAL NOT NULL,
    "relation" TEXT NOT NULL,
    "domainId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "kcAId" INTEGER NOT NULL,
    "kcBId" INTEGER NOT NULL,

    CONSTRAINT "KcRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KcRelation_domainId_idx" ON "KcRelation"("domainId");

-- CreateIndex
CREATE INDEX "KcRelation_relation_domainId_idx" ON "KcRelation"("relation", "domainId");

-- CreateIndex
CREATE INDEX "KcRelation_kcAId_idx" ON "KcRelation"("kcAId");

-- CreateIndex
CREATE INDEX "KcRelation_kcBId_idx" ON "KcRelation"("kcBId");

-- CreateIndex
CREATE UNIQUE INDEX "KcRelation_kcAId_kcBId_relation_key" ON "KcRelation"("kcAId", "kcBId", "relation");

-- AddForeignKey
ALTER TABLE "KcRelation" ADD CONSTRAINT "KcRelation_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KcRelation" ADD CONSTRAINT "KcRelation_kcAId_fkey" FOREIGN KEY ("kcAId") REFERENCES "KC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KcRelation" ADD CONSTRAINT "KcRelation_kcBId_fkey" FOREIGN KEY ("kcBId") REFERENCES "KC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

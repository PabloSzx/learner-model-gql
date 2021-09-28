-- CreateTable
CREATE TABLE "KC" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "domainId" INTEGER NOT NULL,

    CONSTRAINT "KC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KCToTopic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "KC_code_key" ON "KC"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_KCToTopic_AB_unique" ON "_KCToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_KCToTopic_B_index" ON "_KCToTopic"("B");

-- AddForeignKey
ALTER TABLE "KC" ADD CONSTRAINT "KC_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KCToTopic" ADD FOREIGN KEY ("A") REFERENCES "KC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KCToTopic" ADD FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "ActionVerb.name_unique" RENAME TO "ActionVerb_name_key";

-- RenameIndex
ALTER INDEX "Domain.code_unique" RENAME TO "Domain_code_key";

-- RenameIndex
ALTER INDEX "Domain.id_projectId_index" RENAME TO "Domain_id_projectId_idx";

-- RenameIndex
ALTER INDEX "Group.code_unique" RENAME TO "Group_code_key";

-- RenameIndex
ALTER INDEX "Project.code_unique" RENAME TO "Project_code_key";

-- RenameIndex
ALTER INDEX "Topic.code_unique" RENAME TO "Topic_code_key";

-- RenameIndex
ALTER INDEX "Topic.id_projectId_index" RENAME TO "Topic_id_projectId_idx";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "User.id_enabled_unique" RENAME TO "User_id_enabled_key";

-- CreateTable
CREATE TABLE "_ActionToKC" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActionToKC_AB_unique" ON "_ActionToKC"("A", "B");

-- CreateIndex
CREATE INDEX "_ActionToKC_B_index" ON "_ActionToKC"("B");

-- AddForeignKey
ALTER TABLE "_ActionToKC" ADD FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToKC" ADD FOREIGN KEY ("B") REFERENCES "KC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

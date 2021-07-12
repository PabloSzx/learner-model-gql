-- CreateIndex
CREATE INDEX "Domain.id_projectId_index" ON "Domain"("id", "projectId");

-- CreateIndex
CREATE INDEX "Topic.id_projectId_index" ON "Topic"("id", "projectId");

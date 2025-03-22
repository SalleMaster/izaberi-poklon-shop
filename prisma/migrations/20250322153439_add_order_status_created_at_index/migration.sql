-- CreateIndex
CREATE INDEX "orders_status_created_at" ON "orders"("status", "createdAt");

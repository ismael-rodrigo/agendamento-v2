/*
  Warnings:

  - A unique constraint covering the columns `[service_id,date,hour_id]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,service_id,date]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "schedules_user_id_service_id_date_hour_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "schedules_service_id_date_hour_id_key" ON "schedules"("service_id", "date", "hour_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_user_id_service_id_date_key" ON "schedules"("user_id", "service_id", "date");

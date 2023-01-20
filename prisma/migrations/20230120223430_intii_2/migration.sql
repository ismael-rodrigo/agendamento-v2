-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dates_disabled" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "service_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "dates_disabled_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dates_disabled" ("created_at", "date", "id", "service_id", "updated_at") SELECT "created_at", "date", "id", "service_id", "updated_at" FROM "dates_disabled";
DROP TABLE "dates_disabled";
ALTER TABLE "new_dates_disabled" RENAME TO "dates_disabled";
CREATE UNIQUE INDEX "dates_disabled_id_date_key" ON "dates_disabled"("id", "date");
CREATE TABLE "new_service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "service_name" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "service_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_service" ("created_at", "id", "location_id", "service_name", "updated_at") SELECT "created_at", "id", "location_id", "service_name", "updated_at" FROM "service";
DROP TABLE "service";
ALTER TABLE "new_service" RENAME TO "service";
CREATE TABLE "new_hours_available" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hour" INTEGER NOT NULL,
    "minutes" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "service_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "hours_available_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_hours_available" ("created_at", "hour", "id", "is_active", "minutes", "service_id", "updated_at") SELECT "created_at", "hour", "id", "is_active", "minutes", "service_id", "updated_at" FROM "hours_available";
DROP TABLE "hours_available";
ALTER TABLE "new_hours_available" RENAME TO "hours_available";
CREATE TABLE "new_schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "hour_id" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "commom-users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "schedules_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "schedules_hour_id_fkey" FOREIGN KEY ("hour_id") REFERENCES "hours_available" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_schedules" ("created_at", "date", "hour_id", "id", "service_id", "updated_at", "user_id") SELECT "created_at", "date", "hour_id", "id", "service_id", "updated_at", "user_id" FROM "schedules";
DROP TABLE "schedules";
ALTER TABLE "new_schedules" RENAME TO "schedules";
CREATE UNIQUE INDEX "schedules_service_id_date_hour_id_key" ON "schedules"("service_id", "date", "hour_id");
CREATE TABLE "new_interval_available" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "intial_date" DATETIME NOT NULL,
    "final_date" DATETIME NOT NULL,
    "service_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "interval_available_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_interval_available" ("created_at", "final_date", "id", "intial_date", "service_id", "updated_at") SELECT "created_at", "final_date", "id", "intial_date", "service_id", "updated_at" FROM "interval_available";
DROP TABLE "interval_available";
ALTER TABLE "new_interval_available" RENAME TO "interval_available";
CREATE UNIQUE INDEX "interval_available_service_id_key" ON "interval_available"("service_id");
CREATE TABLE "new_days_disabled" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" INTEGER NOT NULL,
    "service_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "days_disabled_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_days_disabled" ("created_at", "day", "id", "service_id", "updated_at") SELECT "created_at", "day", "id", "service_id", "updated_at" FROM "days_disabled";
DROP TABLE "days_disabled";
ALTER TABLE "new_days_disabled" RENAME TO "days_disabled";
CREATE UNIQUE INDEX "days_disabled_id_day_key" ON "days_disabled"("id", "day");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_hours_available" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hour" INTEGER NOT NULL,
    "minutes" INTEGER NOT NULL,
    "service_id" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "hours_available_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_hours_available" ("created_at", "enable", "hour", "id", "minutes", "service_id", "updated_at") SELECT "created_at", "enable", "hour", "id", "minutes", "service_id", "updated_at" FROM "hours_available";
DROP TABLE "hours_available";
ALTER TABLE "new_hours_available" RENAME TO "hours_available";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

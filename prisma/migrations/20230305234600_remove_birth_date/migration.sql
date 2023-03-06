/*
  Warnings:

  - You are about to drop the column `date_birth` on the `commom-users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_commom-users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_commom-users" ("cpf", "created_at", "email", "id", "name", "password", "phone_number", "updated_at") SELECT "cpf", "created_at", "email", "id", "name", "password", "phone_number", "updated_at" FROM "commom-users";
DROP TABLE "commom-users";
ALTER TABLE "new_commom-users" RENAME TO "commom-users";
CREATE UNIQUE INDEX "commom-users_cpf_key" ON "commom-users"("cpf");
CREATE UNIQUE INDEX "commom-users_email_key" ON "commom-users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

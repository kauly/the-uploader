/*
  Warnings:

  - You are about to drop the column `deleted` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Asset` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "ext" TEXT NOT NULL
);
INSERT INTO "new_Asset" ("ext", "id", "location", "name") SELECT "ext", "id", "location", "name" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

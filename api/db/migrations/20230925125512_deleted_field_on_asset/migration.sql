-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Asset" ("id", "location", "name", "version") SELECT "id", "location", "name", "version" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

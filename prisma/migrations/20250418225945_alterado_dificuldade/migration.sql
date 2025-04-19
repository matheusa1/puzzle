/*
  Warnings:

  - You are about to drop the `difficulty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "difficulty";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "difficultyId" TEXT NOT NULL
);
INSERT INTO "new_puzzle" ("completed", "createdAt", "description", "difficultyId", "id", "name", "updatedAt") SELECT "completed", "createdAt", "description", "difficultyId", "id", "name", "updatedAt" FROM "puzzle";
DROP TABLE "puzzle";
ALTER TABLE "new_puzzle" RENAME TO "puzzle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

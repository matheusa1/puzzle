/*
  Warnings:

  - You are about to drop the `puzzle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "puzzle";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "logic_puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_hint" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "puzzleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hint_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "logic_puzzle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_hint" ("createdAt", "id", "puzzleId", "text", "updatedAt") SELECT "createdAt", "id", "puzzleId", "text", "updatedAt" FROM "hint";
DROP TABLE "hint";
ALTER TABLE "new_hint" RENAME TO "hint";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

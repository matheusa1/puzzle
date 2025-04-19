/*
  Warnings:

  - You are about to drop the column `difficulty` on the `logic_puzzle` table. All the data in the column will be lost.
  - Added the required column `difficultyId` to the `logic_puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "difficulty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_logic_puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "difficultyId" TEXT NOT NULL,
    CONSTRAINT "logic_puzzle_difficultyId_fkey" FOREIGN KEY ("difficultyId") REFERENCES "difficulty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_logic_puzzle" ("completed", "createdAt", "description", "id", "image", "name", "updatedAt") SELECT "completed", "createdAt", "description", "id", "image", "name", "updatedAt" FROM "logic_puzzle";
DROP TABLE "logic_puzzle";
ALTER TABLE "new_logic_puzzle" RENAME TO "logic_puzzle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

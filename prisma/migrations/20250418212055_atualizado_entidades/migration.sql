/*
  Warnings:

  - The primary key for the `logic_puzzle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `completed` on the `logic_puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `logic_puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `difficultyId` on the `logic_puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `logic_puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `logic_puzzle` table. All the data in the column will be lost.
  - Added the required column `puzzleId` to the `logic_puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "difficultyId" TEXT NOT NULL,
    CONSTRAINT "puzzle_difficultyId_fkey" FOREIGN KEY ("difficultyId") REFERENCES "difficulty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_hint" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "logicPuzzleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hint_logicPuzzleId_fkey" FOREIGN KEY ("logicPuzzleId") REFERENCES "logic_puzzle" ("puzzleId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_hint" ("createdAt", "id", "logicPuzzleId", "text", "updatedAt") SELECT "createdAt", "id", "logicPuzzleId", "text", "updatedAt" FROM "hint";
DROP TABLE "hint";
ALTER TABLE "new_hint" RENAME TO "hint";
CREATE TABLE "new_logic_puzzle" (
    "puzzleId" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "logic_puzzle_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "puzzle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_logic_puzzle" ("createdAt", "image", "updatedAt") SELECT "createdAt", "image", "updatedAt" FROM "logic_puzzle";
DROP TABLE "logic_puzzle";
ALTER TABLE "new_logic_puzzle" RENAME TO "logic_puzzle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

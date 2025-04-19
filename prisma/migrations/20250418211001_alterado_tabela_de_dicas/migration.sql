/*
  Warnings:

  - You are about to drop the column `puzzleId` on the `hint` table. All the data in the column will be lost.
  - Added the required column `logicPuzzleId` to the `hint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_hint" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "logicPuzzleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hint_logicPuzzleId_fkey" FOREIGN KEY ("logicPuzzleId") REFERENCES "logic_puzzle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_hint" ("createdAt", "id", "text", "updatedAt") SELECT "createdAt", "id", "text", "updatedAt" FROM "hint";
DROP TABLE "hint";
ALTER TABLE "new_hint" RENAME TO "hint";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

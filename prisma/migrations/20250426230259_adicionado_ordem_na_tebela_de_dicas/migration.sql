/*
  Warnings:

  - The primary key for the `hint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `order` to the `hint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_hint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "logicPuzzleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hint_logicPuzzleId_fkey" FOREIGN KEY ("logicPuzzleId") REFERENCES "logic_puzzle" ("puzzleId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_hint" ("createdAt", "id", "logicPuzzleId", "text", "updatedAt") SELECT "createdAt", "id", "logicPuzzleId", "text", "updatedAt" FROM "hint";
DROP TABLE "hint";
ALTER TABLE "new_hint" RENAME TO "hint";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

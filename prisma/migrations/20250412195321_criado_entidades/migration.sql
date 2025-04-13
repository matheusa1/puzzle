-- CreateTable
CREATE TABLE "puzzle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "hint" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "puzzleId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hint_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "puzzle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

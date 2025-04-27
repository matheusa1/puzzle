-- CreateTable
CREATE TABLE "attribute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "logicPuzzleId" TEXT NOT NULL,
    CONSTRAINT "attribute_logicPuzzleId_fkey" FOREIGN KEY ("logicPuzzleId") REFERENCES "logic_puzzle" ("puzzleId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "attributeId" TEXT NOT NULL,
    CONSTRAINT "options_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "attribute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "solution_group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "logicPuzzleId" TEXT NOT NULL,
    CONSTRAINT "solution_group_logicPuzzleId_fkey" FOREIGN KEY ("logicPuzzleId") REFERENCES "logic_puzzle" ("puzzleId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "solution_value" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "solutionGroupId" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "optionsId" TEXT NOT NULL,
    CONSTRAINT "solution_value_solutionGroupId_fkey" FOREIGN KEY ("solutionGroupId") REFERENCES "solution_group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "solution_value_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "attribute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "solution_value_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "options" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

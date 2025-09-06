-- CreateTable
CREATE TABLE "TabConfiguration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tabs" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CourtRoomSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerName" TEXT,
    "timeLimit" INTEGER NOT NULL,
    "finalScore" INTEGER,
    "issuesFixed" INTEGER NOT NULL DEFAULT 0,
    "totalIssues" INTEGER NOT NULL DEFAULT 3,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

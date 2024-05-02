/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CrewToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "_CrewToUser_B_index";

-- DropIndex
DROP INDEX "_CrewToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CrewToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserAuth" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "pwdhash" TEXT NOT NULL,
    "dataId" TEXT NOT NULL,
    CONSTRAINT "UserAuth_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "UserData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "selectedCrewId" TEXT
);

-- CreateTable
CREATE TABLE "_CrewToUserData" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CrewToUserData_A_fkey" FOREIGN KEY ("A") REFERENCES "Crew" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CrewToUserData_B_fkey" FOREIGN KEY ("B") REFERENCES "UserData" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "heldById" TEXT,
    CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_heldById_fkey" FOREIGN KEY ("heldById") REFERENCES "UserData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("count", "heldById", "id", "inventoryId", "name", "quality", "type") SELECT "count", "heldById", "id", "inventoryId", "name", "quality", "type" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiration" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("expiration", "id", "userId") SELECT "expiration", "id", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_email_key" ON "UserAuth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_username_key" ON "UserAuth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_dataId_key" ON "UserAuth"("dataId");

-- CreateIndex
CREATE UNIQUE INDEX "_CrewToUserData_AB_unique" ON "_CrewToUserData"("A", "B");

-- CreateIndex
CREATE INDEX "_CrewToUserData_B_index" ON "_CrewToUserData"("B");

/*
  Warnings:

  - You are about to drop the `_InventoryToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `crewId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_InventoryToUser_B_index";

-- DropIndex
DROP INDEX "_InventoryToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_InventoryToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Crew" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CrewToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CrewToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Crew" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CrewToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "crewId" INTEGER NOT NULL,
    CONSTRAINT "Inventory_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("id", "name") SELECT "id", "name" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_CrewToUser_AB_unique" ON "_CrewToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CrewToUser_B_index" ON "_CrewToUser"("B");

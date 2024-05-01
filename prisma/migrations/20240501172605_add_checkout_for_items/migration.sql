/*
  Warnings:

  - Added the required column `heldById` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "heldById" TEXT NOT NULL,
    CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_heldById_fkey" FOREIGN KEY ("heldById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("count", "id", "inventoryId", "name", "quality", "type") SELECT "count", "id", "inventoryId", "name", "quality", "type" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - Made the column `recipientId` on table `UserNotif` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senderId` on table `UserNotif` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserNotif" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "action" TEXT NOT NULL,
    "unread" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserNotif_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "UserData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserNotif_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "UserData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserNotif" ("action", "content", "id", "recipientId", "senderId", "title", "unread") SELECT "action", "content", "id", "recipientId", "senderId", "title", "unread" FROM "UserNotif";
DROP TABLE "UserNotif";
ALTER TABLE "new_UserNotif" RENAME TO "UserNotif";
PRAGMA foreign_key_check("UserNotif");
PRAGMA foreign_keys=ON;

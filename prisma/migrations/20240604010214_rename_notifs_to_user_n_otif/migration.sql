/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Notification";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserNotif" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT,
    "senderId" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "action" TEXT NOT NULL,
    "unread" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserNotif_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "UserData" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserNotif_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "UserData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

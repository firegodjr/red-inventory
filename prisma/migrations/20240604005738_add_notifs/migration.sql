-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT,
    "senderId" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "action" TEXT NOT NULL,
    "unread" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "UserData" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "UserData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

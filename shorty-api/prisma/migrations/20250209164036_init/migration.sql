/*
  Warnings:

  - You are about to drop the `ShortUrl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ShortUrl";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Shorty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalUrl" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Shorty_originalUrl_key" ON "Shorty"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Shorty_shortCode_key" ON "Shorty"("shortCode");

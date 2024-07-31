/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "image" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Picture" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "link" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "restaurantId" TEXT NOT NULL,
    CONSTRAINT "Picture_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Picture" ("createdAt", "id", "link", "updatedAt") SELECT "createdAt", "id", "link", "updatedAt" FROM "Picture";
DROP TABLE "Picture";
ALTER TABLE "new_Picture" RENAME TO "Picture";
CREATE UNIQUE INDEX "Picture_restaurantId_key" ON "Picture"("restaurantId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

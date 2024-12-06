/*
  Warnings:

  - The primary key for the `Skin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL
);
INSERT INTO "new_Skin" ("description", "id", "image_url", "name", "price") SELECT "description", "id", "image_url", "name", "price" FROM "Skin";
DROP TABLE "Skin";
ALTER TABLE "new_Skin" RENAME TO "Skin";
CREATE UNIQUE INDEX "Skin_name_key" ON "Skin"("name");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "money" INTEGER NOT NULL DEFAULT 0,
    "selectedSkin" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("email", "id", "money", "password", "username") SELECT "email", "id", "money", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new__SkinToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SkinToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Skin" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SkinToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__SkinToUser" ("A", "B") SELECT "A", "B" FROM "_SkinToUser";
DROP TABLE "_SkinToUser";
ALTER TABLE "new__SkinToUser" RENAME TO "_SkinToUser";
CREATE UNIQUE INDEX "_SkinToUser_AB_unique" ON "_SkinToUser"("A", "B");
CREATE INDEX "_SkinToUser_B_index" ON "_SkinToUser"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

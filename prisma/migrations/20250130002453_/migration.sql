/*
  Warnings:

  - You are about to drop the column `groupId` on the `PlayerInGame` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,gameId]` on the table `PlayerInGame` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameId` to the `PlayerInGame` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlayerInGame" DROP CONSTRAINT "PlayerInGame_groupId_fkey";

-- DropIndex
DROP INDEX "PlayerInGame_targetId_key";

-- DropIndex
DROP INDEX "PlayerInGame_userId_groupId_key";

-- AlterTable
ALTER TABLE "PlayerInGame" DROP COLUMN "groupId",
ADD COLUMN     "gameId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Group";

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "joinCode" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_joinCode_key" ON "Game"("joinCode");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerInGame_userId_gameId_key" ON "PlayerInGame"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "PlayerInGame" ADD CONSTRAINT "PlayerInGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

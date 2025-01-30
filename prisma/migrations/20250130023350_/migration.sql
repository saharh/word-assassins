/*
  Warnings:

  - A unique constraint covering the columns `[winnerId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "winnerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Game_winnerId_key" ON "Game"("winnerId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "PlayerInGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

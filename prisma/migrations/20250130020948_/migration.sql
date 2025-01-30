/*
  Warnings:

  - You are about to drop the column `isActive` on the `Game` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('WAITING', 'ACTIVE', 'FINISHED');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "isActive",
ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'WAITING';

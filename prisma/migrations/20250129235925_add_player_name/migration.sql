/*
  Warnings:

  - Added the required column `name` to the `PlayerInGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerInGame" ADD COLUMN "name" TEXT;

-- Update existing records
UPDATE "PlayerInGame" SET "name" = "userId" WHERE "name" IS NULL;

-- Make the column required
ALTER TABLE "PlayerInGame" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "customWordsList" TEXT[],
ADD COLUMN     "useCustomWords" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "isActive" SET DEFAULT false;

-- AlterTable
ALTER TABLE "PlayerInGame" ALTER COLUMN "word" DROP NOT NULL;

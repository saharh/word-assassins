-- CreateEnum
CREATE TYPE "PlayerStatus" AS ENUM ('ALIVE', 'DEAD');

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "joinCode" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerInGame" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "status" "PlayerStatus" NOT NULL DEFAULT 'ALIVE',
    "word" TEXT NOT NULL,
    "targetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerInGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_joinCode_key" ON "Group"("joinCode");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerInGame_targetId_key" ON "PlayerInGame"("targetId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerInGame_userId_groupId_key" ON "PlayerInGame"("userId", "groupId");

-- AddForeignKey
ALTER TABLE "PlayerInGame" ADD CONSTRAINT "PlayerInGame_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerInGame" ADD CONSTRAINT "PlayerInGame_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "PlayerInGame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

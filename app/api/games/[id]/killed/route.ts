import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { GameStatus, PlayerStatus } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  try {
    const dyingPlayer = await prisma.playerInGame.findUnique({
      where: {
        userId_gameId: {
          userId: user.id,
          gameId: params.id,
        },
      },
      include: {
        game: true,
        targetedBy: {
          where: {
            status: PlayerStatus.ALIVE,
          },
        },
        target: true,
      },
    });

    if (!dyingPlayer) {
      return NextResponse.json(
        { error: "Player not found" },
        {
          status: 404,
        }
      );
    }
    if (dyingPlayer.status !== PlayerStatus.ALIVE) {
      return NextResponse.json(
        { error: "Player is already dead" },
        {
          status: 400,
        }
      );
    }
    if (dyingPlayer.game.status !== GameStatus.ACTIVE) {
      return NextResponse.json(
        { error: "Game is not active" },
        {
          status: 400,
        }
      );
    }

    // Get the killer (should be the only living player targeting the dying player)
    const killer = dyingPlayer.targetedBy[0];
    if (!killer) {
      return NextResponse.json(
        { error: "No valid killer found" },
        {
          status: 400,
        }
      );
    }

    await prisma.$transaction(async (tx) => {
      // Mark the dying player as dead
      await tx.playerInGame.update({
        where: { id: dyingPlayer.id },
        data: { status: PlayerStatus.DEAD },
      });

      // If the dying player's target would be the killer, they're the last one standing
      if (dyingPlayer.target?.id === killer.id) {
        await tx.game.update({
          where: { id: dyingPlayer.gameId },
          data: {
            status: GameStatus.FINISHED,
            winnerId: killer.id,
          },
        });
      } else {
        // Update the killer's target to be the dying player's target
        await tx.playerInGame.update({
          where: { id: killer.id },
          data: { targetId: dyingPlayer.target?.id },
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking player as killed:", error);
    return NextResponse.json(
      { error: "Failed to mark player as killed" },
      {
        status: 500,
      }
    );
  }
}

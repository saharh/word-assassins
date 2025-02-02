import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { GameStatus } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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

  const { id } = await params;
  const { playerId } = await request.json();

  if (!playerId || typeof playerId !== "string") {
    return NextResponse.json(
      { error: "Player user ID is required" },
      {
        status: 400,
      }
    );
  }

  try {
    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        players: true,
      },
    });
    if (!game) {
      return NextResponse.json(
        { error: "Game not found" },
        {
          status: 404,
        }
      );
    }

    if (game.creatorId !== user.id) {
      return NextResponse.json(
        { error: "Only the game creator can remove players" },
        {
          status: 403,
        }
      );
    }
    if (game.status !== GameStatus.WAITING) {
      return NextResponse.json(
        {
          error: "Players can only be removed if the game has not started",
        },
        {
          status: 400,
        }
      );
    }

    const playerToRemove = game.players.find(
      (player) => player.userId === playerId
    );
    if (!playerToRemove) {
      return NextResponse.json(
        { error: "Player not found in game" },
        {
          status: 404,
        }
      );
    }
    if (playerId === user.id) {
      return NextResponse.json(
        { error: "You cannot remove yourself from the game" },
        {
          status: 400,
        }
      );
    }

    await prisma.playerInGame.delete({
      where: {
        id: playerToRemove.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing player from game:", error);
    return NextResponse.json(
      { error: "Failed to remove player from game" },
      {
        status: 500,
      }
    );
  }
}

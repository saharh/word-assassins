import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { GameStatus } from "@prisma/client";

export async function POST(request: Request) {
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
    const { joinCode, playerName } = await request.json();

    if (!joinCode) {
      return NextResponse.json(
        { error: "Join code is required" },
        {
          status: 400,
        }
      );
    }
    if (!playerName) {
      return NextResponse.json(
        { error: "Player name is required" },
        {
          status: 400,
        }
      );
    }

    const game = await prisma.game.findUnique({
      where: {
        joinCode,
      },
      include: {
        players: true,
      },
    });

    if (!game) {
      return NextResponse.json(
        { error: "Invalid game code" },
        {
          status: 404,
        }
      );
    }
    if (game.status !== GameStatus.WAITING) {
      return NextResponse.json(
        { error: "Game is already active" },
        {
          status: 400,
        }
      );
    }
    if (game.players.some((player) => player.userId === user.id)) {
      return NextResponse.json(
        { error: "You are already in this game" },
        {
          status: 400,
        }
      );
    }

    // Add user to the game
    await prisma.playerInGame.create({
      data: {
        userId: user.id,
        name: playerName,
        gameId: game.id,
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.error("Error joining game:", error);
    return NextResponse.json(
      { error: "Failed to join game" },
      {
        status: 500,
      }
    );
  }
}

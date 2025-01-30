import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

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
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "Join code is required" },
        {
          status: 400,
        }
      );
    }

    const game = await prisma.game.findUnique({
      where: {
        joinCode: code,
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

    // Check if user is already in the game
    const existingPlayer = await prisma.playerInGame.findUnique({
      where: {
        userId_gameId: {
          userId: user.id,
          gameId: game.id,
        },
      },
    });

    if (existingPlayer) {
      return NextResponse.json(
        { error: "You are already in this game" },
        {
          status: 400,
        }
      );
    }

    // Add user to the game
    const player = await prisma.playerInGame.create({
      data: {
        userId: user.id,
        name: playerName,
        gameId: game.id,
      },
    });

    return NextResponse.json({ game, player });
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

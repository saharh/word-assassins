import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getRandomWords } from "@/lib/words";
import { GameStatus, PlayerStatus } from "@prisma/client";

const MAX_REDRAWS = 2;

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

  try {
    const game = await prisma.game.findUnique({
      where: {
        id,
      },
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
    if (game.status !== GameStatus.ACTIVE) {
      return NextResponse.json(
        { error: "Game is not active" },
        {
          status: 400,
        }
      );
    }

    const currentPlayer = game.players.find((p) => p.userId === user.id);
    if (!currentPlayer) {
      return NextResponse.json(
        { error: "Player not found" },
        {
          status: 404,
        }
      );
    }
    if (currentPlayer.status !== PlayerStatus.ALIVE) {
      return NextResponse.json(
        { error: "Dead players cannot redraw" },
        {
          status: 400,
        }
      );
    }
    if (!currentPlayer.targetId) {
      return NextResponse.json(
        { error: "No target found" },
        {
          status: 400,
        }
      );
    }
    if (currentPlayer.redraws >= MAX_REDRAWS) {
      return NextResponse.json(
        { error: "No more redraws available" },
        {
          status: 400,
        }
      );
    }

    const anyPlayersDead = game.players.some(
      (p) => p.status === PlayerStatus.DEAD
    );
    if (anyPlayersDead && !game.redrawsAlwaysAllowed) {
      return NextResponse.json(
        { error: "Cannot redraw after kills have occurred" },
        {
          status: 400,
        }
      );
    }

    const newWord = getRandomWords(1)[0];

    await prisma.$transaction([
      prisma.playerInGame.update({
        where: { id: currentPlayer.id },
        data: {
          redraws: {
            increment: 1,
          },
        },
      }),
      prisma.playerInGame.update({
        where: { id: currentPlayer.targetId },
        data: {
          word: newWord,
        },
      }),
    ]);

    return NextResponse.json({ success: true, newWord });
  } catch (error) {
    console.error("Error redrawing word:", error);
    return NextResponse.json(
      { error: "Failed to redraw word" },
      {
        status: 500,
      }
    );
  }
}

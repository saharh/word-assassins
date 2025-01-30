import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getRandomWords } from "@/lib/words";

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
    const game = await prisma.game.findUnique({
      where: {
        id: params.id,
        creatorId: user.id,
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

    if (game.isActive) {
      return NextResponse.json(
        { error: "Game already started" },
        {
          status: 400,
        }
      );
    }

    if (game.players.length < 2) {
      return NextResponse.json(
        { error: "Need at least 2 players to start" },
        {
          status: 400,
        }
      );
    }

    // Assign random words and targets to each player
    const players = game.players;
    const words = getRandomWords(players.length);
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

    // Create a circular chain of targets
    const updates = shuffledPlayers.map((player, index) => {
      const nextIndex = (index + 1) % shuffledPlayers.length;
      return prisma.playerInGame.update({
        where: { id: player.id },
        data: {
          word: words[index],
          targetId: shuffledPlayers[nextIndex].id,
        },
      });
    });

    // Execute all updates in a transaction
    await prisma.$transaction([
      ...updates,
      prisma.game.update({
        where: { id: game.id },
        data: { isActive: true },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error starting game:", error);
    return NextResponse.json(
      { error: "Failed to start game" },
      {
        status: 500,
      }
    );
  }
}

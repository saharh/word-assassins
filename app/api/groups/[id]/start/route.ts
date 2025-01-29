import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getRandomWords, assignTargets } from "@/lib/words";

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
      { error: "You must be logged in" },
      { status: 401 }
    );
  }

  try {
    // Get the group and check if the user is the creator
    const group = await prisma.group.findUnique({
      where: { id: params.id },
      include: {
        players: true,
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    if (group.creatorId !== user.id) {
      return NextResponse.json(
        { error: "Only the creator can start the game" },
        { status: 403 }
      );
    }

    if (group.isActive) {
      return NextResponse.json(
        { error: "Game is already active" },
        { status: 400 }
      );
    }

    if (group.players.length < 2) {
      return NextResponse.json(
        { error: "Need at least 2 players to start" },
        { status: 400 }
      );
    }

    // Get random words for each player
    const words = getRandomWords(group.players.length);

    // Create target assignments
    const targetMap = assignTargets(group.players);
    const entries = Array.from(targetMap);

    // Execute all updates in a transaction
    await prisma.$transaction(async (tx) => {
      // Update all players with their words and targets
      for (let i = 0; i < entries.length; i++) {
        const [player, target] = entries[i];
        const wordIndex = group.players.indexOf(player);
        await tx.playerInGame.update({
          where: { id: player.id },
          data: {
            word: words[wordIndex],
            targetId: target.id,
          },
        });
      }

      // Activate the group
      await tx.group.update({
        where: { id: params.id },
        data: { isActive: true },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error starting game:", error);
    return NextResponse.json(
      { error: "Failed to start game" },
      { status: 500 }
    );
  }
}

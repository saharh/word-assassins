import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
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
    const { joinCode } = await request.json();

    if (!joinCode) {
      return NextResponse.json(
        { error: "Join code is required" },
        { status: 400 }
      );
    }

    const group = await prisma.group.findUnique({
      where: { joinCode },
    });

    if (!group) {
      return NextResponse.json(
        { error: "Invalid group code" },
        { status: 404 }
      );
    }

    // Check if user is already in the group
    const existingPlayer = await prisma.playerInGame.findUnique({
      where: {
        userId_groupId: {
          userId: user.id,
          groupId: group.id,
        },
      },
    });

    if (existingPlayer) {
      return NextResponse.json(
        { error: "You are already in this group" },
        { status: 400 }
      );
    }

    // Add user to the group
    const player = await prisma.playerInGame.create({
      data: {
        userId: user.id,
        groupId: group.id,
        word: "temporary", // You'll need to implement word assignment logic
      },
    });

    return NextResponse.json({ group, player });
  } catch (error) {
    console.error("Error joining group:", error);
    return NextResponse.json(
      { error: "Failed to join group" },
      { status: 500 }
    );
  }
}

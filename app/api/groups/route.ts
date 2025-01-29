import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
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
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Group name is required" },
        { status: 400 }
      );
    }

    const group = await prisma.group.create({
      data: {
        name,
        joinCode: nanoid(6),
        creatorId: user.id,
        players: {
          create: {
            userId: user.id,
          },
        },
      },
      include: {
        players: true,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    );
  }
}

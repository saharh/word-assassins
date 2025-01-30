import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import StartGameButton from "./start-game-button";
import { PlayerStatus } from "@prisma/client";

export default async function GamePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const game = await prisma.game.findUnique({
    where: {
      id: params.id,
      players: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      players: true,
    },
  });

  if (!game) {
    notFound();
  }

  const isCreator = game.creatorId === user.id;
  const currentPlayer = game.players.find(
    (player) => player.userId === user.id
  );

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{game.name}</h1>
            <Badge variant={game.isActive ? "default" : "secondary"}>
              {game.isActive ? "Active" : "Waiting to Start"}
            </Badge>
          </div>
          <p className="text-muted-foreground">Join Code: {game.joinCode}</p>
        </div>
        <div className="flex gap-3">
          {isCreator && !game.isActive && <StartGameButton gameId={game.id} />}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Game Members</span>
            <Badge variant="outline">
              {game.players.length}{" "}
              {game.players.length === 1 ? "Player" : "Players"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {game.players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{player.name}</p>
                    {player.userId === game.creatorId && (
                      <Badge variant="secondary" className="text-xs">
                        Creator
                      </Badge>
                    )}
                    {game.isActive && (
                      <Badge
                        variant={
                          player.status === PlayerStatus.ALIVE
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {player.status}
                      </Badge>
                    )}
                  </div>
                  {game.isActive && player.userId === user.id && (
                    <p className="text-sm text-muted-foreground">
                      Your word: {player.word}
                    </p>
                  )}
                </div>
                {game.isActive &&
                  currentPlayer?.status === "ALIVE" &&
                  player.userId === user.id &&
                  player.targetId && (
                    <div className="text-sm text-muted-foreground">
                      Target:{" "}
                      {
                        game.players.find((p) => p.id === player.targetId)
                          ?.userId
                      }
                    </div>
                  )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

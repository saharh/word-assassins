import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StartGameButton from "./start-game-button";
import { GameStatus, PlayerStatus } from "@prisma/client";
import { GameStatusBadge } from "@/components/game-status-badge";
import MarkAsKilledButton from "./mark-as-killed-button";
import { AnimatedCrown } from "./animated-crown";

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }
  const { id } = await params;

  const game = await prisma.game.findUnique({
    where: {
      id,
      players: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      players: {
        include: {
          target: true,
          gameWinner: true,
        },
      },
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
            <GameStatusBadge status={game.status} />
          </div>
          <p className="text-muted-foreground">Join Code: {game.joinCode}</p>
        </div>
        <div className="flex gap-3">
          {isCreator && game.status === GameStatus.WAITING && (
            <StartGameButton gameId={game.id} />
          )}
        </div>
      </div>

      {game.status === GameStatus.ACTIVE &&
        currentPlayer?.target &&
        currentPlayer.target.status === PlayerStatus.ALIVE && (
          <Card>
            <CardHeader>
              <CardTitle>Your Target</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{currentPlayer.target.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Their word:{" "}
                      <span className="font-bold">
                        {currentPlayer.target.word}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant={
                        currentPlayer.target.status === PlayerStatus.ALIVE
                          ? "default"
                          : "destructive"
                      }
                    >
                      {currentPlayer.target.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {game.status === GameStatus.ACTIVE &&
        currentPlayer?.status === PlayerStatus.ALIVE && (
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkAsKilledButton gameId={game.id} />
            </CardContent>
          </Card>
        )}

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
                    {player.gameWinner && <AnimatedCrown />}
                    {player.userId === game.creatorId && (
                      <Badge variant="secondary" className="text-xs">
                        Creator
                      </Badge>
                    )}
                    {game.status === GameStatus.ACTIVE && (
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

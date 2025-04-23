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
import RedrawWordButton from "./redraw-word-button";
import { Sword } from "lucide-react";
import ReplayGameDialog from "./replay-game-dialog";
import { RemovePlayerButton } from "./remove-player-button";
import { GAME_INSTRUCTIONS } from "@/lib/game-instructions";
import CopyJoinLinkButton from "./copy-join-link-button";

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
    <div className="flex-1 w-full max-w-3xl mx-auto p-4 space-y-8 mb-3">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <GameStatusBadge status={game.status} />
          <h1 className="text-3xl font-bold">{game.name}</h1>
          <p className="text-muted-foreground">Join Code: {game.joinCode}</p>
          {game.status === GameStatus.WAITING && (
            <CopyJoinLinkButton joinCode={game.joinCode} />
          )}
        </div>
        <div className="flex gap-3">
          {isCreator && game.status === GameStatus.WAITING && (
            <StartGameButton gameId={game.id} />
          )}
          {isCreator && game.status === GameStatus.FINISHED && (
            <ReplayGameDialog gameId={game.id} gameName={game.name} />
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
            <CardContent className="sm:items-center gap-4 flex sm:flex-row flex-col">
              <MarkAsKilledButton gameId={game.id} />
              <RedrawWordButton game={game} currentPlayer={currentPlayer} />
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
            {game.players
              .sort((a, b) => (a.status === PlayerStatus.ALIVE ? -1 : 1))
              .map((player) => (
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
                          Host
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
                      {game.status !== GameStatus.WAITING && (
                        <Badge
                          variant="secondary"
                          className="text-xs flex items-center gap-1"
                        >
                          <Sword className="w-3 h-3" />
                          {player.kills} {player.kills === 1 ? "Kill" : "Kills"}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {game.status === GameStatus.WAITING && isCreator && (
                    <RemovePlayerButton
                      gameId={game.id}
                      playerId={player.userId}
                      currentPlayerId={currentPlayer?.userId}
                    />
                  )}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Play Section */}
      <Card>
        <CardHeader>
          <CardTitle>How to Play</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {GAME_INSTRUCTIONS.map((instruction, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center opacity-80"
                    style={{ backgroundColor: instruction.bgClassName }}
                  >
                    <instruction.icon
                      className="h-4 w-4"
                      style={{ color: instruction.iconClassName }}
                    />
                  </div>
                  <h3 className="font-semibold">{instruction.title}</h3>
                </div>
                {instruction.isList ? (
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {Array.isArray(instruction.description) ? (
                      instruction.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))
                    ) : (
                      <li>{instruction.description}</li>
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {instruction.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

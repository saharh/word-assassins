import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import StartGameButton from "./start-game-button";
import { PlayerStatus } from "@prisma/client";

export default async function GroupPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const group = await prisma.group.findUnique({
    where: { id: params.id },
    include: {
      players: true,
    },
  });

  if (!group) {
    return redirect("/groups");
  }

  // Check if user is part of the group
  const isUserInGroup = group.players.some(
    (player) => player.userId === user.id
  );
  if (!isUserInGroup) {
    return redirect("/groups");
  }

  const isCreator = group.creatorId === user.id;
  const currentPlayer = group.players.find(
    (player) => player.userId === user.id
  );

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{group.name}</h1>
            <Badge variant={group.isActive ? "default" : "secondary"}>
              {group.isActive ? "Active" : "Waiting to Start"}
            </Badge>
          </div>
          <p className="text-muted-foreground">Join Code: {group.joinCode}</p>
        </div>
        <div className="flex gap-3">
          {isCreator && !group.isActive && (
            <StartGameButton groupId={group.id} />
          )}
          <Button asChild variant="outline">
            <Link href="/groups">Back to Groups</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Group Members</span>
            <Badge variant="outline">
              {group.players.length}{" "}
              {group.players.length === 1 ? "Player" : "Players"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {group.players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{player.userId}</p>
                    {player.userId === group.creatorId && (
                      <Badge variant="secondary" className="text-xs">
                        Creator
                      </Badge>
                    )}
                    {group.isActive && (
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
                  {group.isActive && player.userId === user.id && (
                    <p className="text-sm text-muted-foreground">
                      Your word: {player.word}
                    </p>
                  )}
                </div>
                {group.isActive &&
                  currentPlayer?.status === "ALIVE" &&
                  player.userId === user.id &&
                  player.targetId && (
                    <div className="text-sm text-muted-foreground">
                      Target:{" "}
                      {
                        group.players.find((p) => p.id === player.targetId)
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

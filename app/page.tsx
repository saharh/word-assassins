import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { DateTime } from "luxon";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Bell, Plus, LogIn } from "lucide-react";

async function getGames(userId: string) {
  return await prisma.game.findMany({
    where: {
      players: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      players: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const games = await getGames(user.id);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <h1 className="text-4xl font-bold">Your Games</h1>
      </div>

      {games.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <h2 className="text-2xl font-bold text-center mb-4">No Games Yet!</h2>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            Start your first game of Word Assassin! Create a new game and invite
            your friends to join the fun.
          </p>
          <div className="space-y-4">
            <Button size="lg" asChild className="w-full">
              <Link href="/games/new" className="gap-2">
                <Plus className="w-5 h-5" />
                Create Your First Game
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full">
              <Link href="/games/join" className="gap-2">
                <LogIn className="w-5 h-5" />
                Join an Existing Game
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <Link href={`/games/${game.id}`} key={game.id}>
              <Card className="hover:bg-accent transition-colors">
                <CardHeader>
                  <CardTitle>{game.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium">
                        {game.isActive ? "In Progress" : "Waiting"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Players:</span>
                      <span className="font-medium">{game.players.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-medium">
                        {DateTime.fromJSDate(
                          new Date(game.createdAt)
                        ).toRelative()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}

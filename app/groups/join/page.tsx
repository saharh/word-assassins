import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { joinGame } from "../actions";

export default async function JoinGamePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join a Game</CardTitle>
          <CardDescription>
            Enter a game code to join an existing game
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={joinGame} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="joinCode">Join Code</Label>
              <Input
                id="joinCode"
                name="joinCode"
                placeholder="Enter 4-digit code"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playerNameJoin">Your Name</Label>
              <Input
                id="playerNameJoin"
                name="playerName"
                placeholder="Enter your name"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Join Game
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

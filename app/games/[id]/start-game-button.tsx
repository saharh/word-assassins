"use client";

import { Button } from "@/components/ui/button";
import { startGame } from "../actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StartGameButton({ gameId }: { gameId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleStartGame() {
    setIsLoading(true);
    try {
      await startGame(gameId);
      toast({
        title: "Game started!",
        description: "The game has been started successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to start game",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button onClick={handleStartGame} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Starting...
        </>
      ) : (
        "Start Game"
      )}
    </Button>
  );
}

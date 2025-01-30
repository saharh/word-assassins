"use client";

import { redirect } from "next/navigation";

export async function createGame(formData: FormData) {
  const name = formData.get("gameName")?.toString();
  const playerName = formData.get("playerName")?.toString();

  const response = await fetch("/api/games", {
    method: "POST",
    body: JSON.stringify({ name, playerName }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create game");
  }

  redirect(`/games/${data.id}`);
}

export async function joinGame(formData: FormData) {
  const joinCode = formData.get("joinCode")?.toString();
  const playerName = formData.get("playerName")?.toString();

  const response = await fetch("/api/games/join", {
    method: "POST",
    body: JSON.stringify({ joinCode, playerName }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to join game");
  }

  redirect(`/games/${data.game.id}`);
}

export async function startGame(gameId: string) {
  const response = await fetch(`/api/games/${gameId}/start`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to start game");
  }

  // Refresh the page to show the updated game state
  window.location.reload();
}

"use client";

import { redirect } from "next/navigation";

export async function createGroup(formData: FormData) {
  const name = formData.get("groupName")?.toString();

  const response = await fetch("/api/groups", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create group");
  }

  redirect(`/groups/${data.id}`);
}

export async function joinGroup(formData: FormData) {
  const joinCode = formData.get("joinCode")?.toString();

  const response = await fetch("/api/groups/join", {
    method: "POST",
    body: JSON.stringify({ joinCode }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to join group");
  }

  redirect(`/groups/${data.group.id}`);
}

export async function startGame(groupId: string) {
  const response = await fetch(`/api/groups/${groupId}/start`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to start game");
  }

  // Refresh the page to show the updated game state
  window.location.reload();
}

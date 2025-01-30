"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";

export default function MarkAsKilledButton({ gameId }: { gameId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const { mutate: markAsKilled } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/api/games/${gameId}/killed`);
      return response.data;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      toast.toast({
        title: "You have been marked as killed",
        description: "You will be removed from the game",
        variant: "default",
      });
      router.refresh();
    },
    onError: (error: any) => {
      toast.toast({
        title: "Failed to mark as killed",
        description: error.response?.data?.error || "Failed to mark as killed",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return (
    <Button
      variant="destructive"
      onClick={() => markAsKilled()}
      disabled={isLoading}
    >
      {isLoading ? "Marking as killed..." : "Mark Yourself as Killed"}
    </Button>
  );
}

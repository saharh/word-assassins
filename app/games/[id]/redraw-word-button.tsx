"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export default function RedrawWordButton({
  gameId,
  redraws,
  redrawsAllowed,
}: {
  gameId: string;
  redraws: number;
  redrawsAllowed: boolean;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const { mutate: redrawWord } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/api/games/${gameId}/redraw`);
      return response.data;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      toast.toast({
        title: "Word redrawn successfully",
        description: `Your new word is: ${data.newWord}`,
        variant: "default",
      });
      router.refresh();
    },
    onError: (error: any) => {
      toast.toast({
        title: "Failed to redraw word",
        description: error.response?.data?.error || "Failed to redraw word",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const remainingRedraws = 2 - redraws;

  const getButtonText = () => {
    if (isLoading) return "Redrawing...";
    if (!redrawsAllowed) return "Redraws locked";
    if (remainingRedraws <= 0) return "No redraws left";
    return (
      <>
        Redraw Word{" "}
        <Badge variant="secondary" className="ml-2">
          {remainingRedraws} left
        </Badge>
      </>
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          disabled={isLoading || remainingRedraws <= 0 || !redrawsAllowed}
        >
          {getButtonText()}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will select a new random word for your target. You can only do
            this {remainingRedraws} more{" "}
            {remainingRedraws === 1 ? "time" : "times"}, and only before any
            kills have occurred in the game.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => redrawWord()}>
            Yes, redraw word
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

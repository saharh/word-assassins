"use client";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  gameName: z.string().min(2, "Game name must be at least 2 characters"),
  playerName: z.string().min(2, "Name must be at least 2 characters"),
});

export default function CreateGamePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: "",
      playerName: "",
    },
  });
  const router = useRouter();
  const { mutate: createGame, isLoading } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      console.log(data);
      return axios.post("/api/games", data);
    },
    onError: (error: any) => {
      console.log("here 2");
      console.log(error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to create game",
        variant: "destructive",
      });
    },
    onSuccess: (response: any) => {
      router.push(`/games/${response.data.id}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createGame(values);
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create a Game</CardTitle>
          <CardDescription>Start a new game and invite others</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="gameName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter group name"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="playerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Game"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

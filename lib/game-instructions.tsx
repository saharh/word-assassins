import { Play, Target, Shield, Book, MessageSquare, Crown } from "lucide-react";
import { LucideIcon } from "lucide-react";

type GameInstruction = {
  icon: LucideIcon;
  title: string;
  description: string | string[];
  iconClassName: string;
  bgClassName: string;
  isList?: boolean;
};

export const GAME_INSTRUCTIONS: GameInstruction[] = [
  {
    icon: Play,
    title: "Getting Started",
    description:
      'One player creates a game and shares the invite code. Once everyone\'s in, the creator hits "Start" and each player gets a secret word and target player.',
    iconClassName: "text-primary",
    bgClassName: "bg-primary/10",
  },
  {
    icon: Target,
    title: "Making a Kill",
    description:
      "Get your target to say their secret word in conversation. They'll mark themselves as dead, and you'll get their target as your next mission.",
    iconClassName: "text-destructive",
    bgClassName: "bg-destructive/10",
  },
  {
    icon: Shield,
    title: "Staying Alive",
    description:
      "Be careful with your words - someone is trying to make you say your secret word! When eliminated, you must mark yourself as killed.",
    iconClassName: "text-blue-500",
    bgClassName: "bg-blue-500/10",
  },
  {
    icon: Book,
    title: "Word Rules",
    description: [
      '• Homophones count (e.g., "two" = "to")',
      '• Plurals count (e.g., "shoe" = "shoes")',
      "• Accidents still count!",
    ],
    iconClassName: "text-purple-500",
    bgClassName: "bg-purple-500/10",
    isList: true,
  },
  {
    icon: MessageSquare,
    title: "Fair Play",
    description:
      "You can lie about your word and target, but never lie about eliminations. You can say your target's word, and get help from other players too.",
    iconClassName: "text-green-500",
    bgClassName: "bg-green-500/10",
  },
  {
    icon: Crown,
    title: "Winning",
    description:
      "Keep assassinating targets until you're the last one standing. The final survivor wins the game!",
    iconClassName: "text-yellow-500",
    bgClassName: "bg-yellow-500/10",
  },
] as const;

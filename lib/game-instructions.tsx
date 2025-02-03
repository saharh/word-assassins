import { Play, Target, Shield, Book, MessageSquare, Crown } from "lucide-react";
import { LucideIcon } from "lucide-react";
import colors from "tailwindcss/colors";

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
    iconClassName: colors.zinc[200],
    bgClassName: colors.zinc[800],
  },
  {
    icon: Target,
    title: "Making a Kill",
    description:
      "Get your target to say their secret word in conversation. They'll mark themselves as dead, and you'll get their target as your next mission.",
    iconClassName: colors.red[200],
    bgClassName: colors.red[800],
  },
  {
    icon: Shield,
    title: "Staying Alive",
    description:
      "Be careful with your words - someone is trying to make you say your secret word! When eliminated, you must mark yourself as killed.",
    iconClassName: colors.blue[200],
    bgClassName: colors.blue[800],
  },
  {
    icon: Book,
    title: "Word Rules",
    description: [
      '• Homophones count (e.g., "two" = "to")',
      '• Plurals count (e.g., "shoe" = "shoes")',
      "• Accidents still count!",
    ],
    iconClassName: colors.purple[200],
    bgClassName: colors.purple[800],
    isList: true,
  },
  {
    icon: MessageSquare,
    title: "Fair Play",
    description:
      "You can lie about your word and target, but never lie about eliminations. You can say your target's word, and get help from other players too.",
    iconClassName: colors.green[200],
    bgClassName: colors.green[800],
  },
  {
    icon: Crown,
    title: "Winning",
    description:
      "Keep assassinating targets until you're the last one standing. The final survivor wins the game!",
    iconClassName: colors.yellow[200],
    bgClassName: colors.yellow[800],
  },
] as const;

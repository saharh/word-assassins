import { Badge } from "@/components/ui/badge";
import { GameStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

interface GameStatusBadgeProps {
  status: GameStatus;
  className?: string;
}

export function GameStatusBadge({ status, className }: GameStatusBadgeProps) {
  const variants = {
    [GameStatus.WAITING]:
      "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    [GameStatus.ACTIVE]: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    [GameStatus.FINISHED]: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
  };

  return (
    <Badge
      variant="outline"
      className={cn(variants[status], "font-medium", className)}
    >
      {status}
    </Badge>
  );
}

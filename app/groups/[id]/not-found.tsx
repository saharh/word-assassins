import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GroupNotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4">
      <h1 className="text-4xl font-bold">Group Not Found</h1>
      <p className="text-muted-foreground">
        The group you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <h1 className="text-4xl font-bold">Page Not Found</h1>
            <p className="text-muted-foreground">
                The page you're looking for doesn't exist.
            </p>
            <Button asChild>
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}
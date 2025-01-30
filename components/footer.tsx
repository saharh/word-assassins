"use server";

import { Heart } from "lucide-react";
import Link from "next/link";

export async function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center gap-2 py-4 text-sm text-muted-foreground">
        <p className="flex items-center gap-1">
          Made with <Heart className="h-4 w-4 fill-current text-red-500" /> by{" "}
          <Link
            href="https://github.com/ayush-goyal"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-2"
          >
            Ayush Goyal
          </Link>{" "}
          in NYC
        </p>
        <div className="flex items-center">
          <p>© {currentYear} Glacier Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

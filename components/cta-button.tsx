"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function CTAButton() {
  const { user } = useAuth();

  const href = user ? "/dashboard" : "/sign-up";

  return (
    <Button size="lg" asChild>
      <Link href={href} className="gap-2">
        Start Playing
        <ArrowRight className="w-5 h-5" />
      </Link>
    </Button>
  );
}

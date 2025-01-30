import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Target,
  Users,
  Play,
  Skull,
  Crown,
  Book,
  Coffee,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] mx-6 max-w-screen-xl">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center space-y-10 py-20 text-center">
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter animate-in">
            Word Assassins
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-[42rem] mx-auto">
            The ultimate social deduction game that combines stealth, strategy,
            and vocabulary. Eliminate your targets, stay alive, and become the
            last assassin standing.
          </p>
          <div className="flex flex-col gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <Link href="/sign-up" className="gap-2">
                Start Playing <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Overview</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Join a Game</h3>
            <p className="text-muted-foreground">
              Create or join a game with your friends. Each player gets a secret
              word and target.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Hunt Your Target</h3>
            <p className="text-muted-foreground">
              Trick your target into saying their secret word. Be sneaky - it
              could take days!
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Stay Alive</h3>
            <p className="text-muted-foreground">
              Watch what you say - someone's trying to make you say your secret
              word!
            </p>
          </div>
        </div>
      </section>

      {/* Detailed How to Play */}
      <section className="py-16 mb-20">
        <h2 className="text-3xl font-bold text-center mb-4">How to Play</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A simple game of deception, strategy, and careful conversation
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Getting Started */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Play className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Getting Started</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              One player creates a game and shares the invite link. Once
              everyone's in, the creator hits "start" and each player gets a
              secret word and target.
            </p>
          </Card>

          {/* Making a Kill */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Skull className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold">Making a Kill</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              When your target says their word, show them your screen as proof.
              They'll mark themselves as dead, and you'll get their target as
              your next mission.
            </p>
          </Card>

          {/* Winning */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Crown className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold">Winning</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Keep assassinating targets until you're the last one standing. The
              final survivor wins the game!
            </p>
          </Card>

          {/* Word Rules */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Book className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold">Word Rules</h3>
            </div>
            <ul className="text-muted-foreground text-sm space-y-2">
              <li>• Homophones count (e.g., "two" = "to")</li>
              <li>• Plurals count (e.g., "shoe" = "shoes")</li>
              <li>• Accidents still count!</li>
            </ul>
          </Card>

          {/* Strategy Tips */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Coffee className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold">Strategy Tips</h3>
            </div>
            <ul className="text-muted-foreground text-sm space-y-2">
              <li>• You can say your target's word</li>
              <li>• Get help from other players</li>
              <li>• Be patient - kills take time!</li>
            </ul>
          </Card>

          {/* Fair Play */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold">Fair Play</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              You can lie about your target and word, but never lie about
              killing someone. When you're dead, mark yourself dead right away.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}

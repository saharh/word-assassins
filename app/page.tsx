"use client";

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
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
    },
  },
};

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] mx-6 max-w-screen-xl">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col items-center justify-center space-y-10 text-center min-h-[calc(60vh)]"
      >
        <div className="space-y-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-bold tracking-tighter"
          >
            Word Assassins
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-[42rem] mx-auto"
          >
            The ultimate social deduction game that combines stealth, strategy,
            and vocabulary. Eliminate your targets, stay alive, and become the
            last assassin standing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <Button size="lg" asChild>
              <Link href={user ? "/dashboard" : "/sign-up"} className="gap-2">
                {user ? "Go to Dashboard" : "Start Playing"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Overview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="py-8 sm:py-16"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Quick Overview
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Overview items with stagger effect */}
          {[
            {
              icon: <Users className="h-6 w-6 text-primary" />,
              title: "Join a Game",
              description:
                "Create or join a game with your friends. Each player gets a secret word and target.",
            },
            {
              icon: <Target className="h-6 w-6 text-primary" />,
              title: "Hunt Your Target",
              description:
                "Trick your target into saying their secret word. Be sneaky - it could take days!",
            },
            {
              icon: <Shield className="h-6 w-6 text-primary" />,
              title: "Stay Alive",
              description:
                "Watch what you say - someone's trying to make you say your secret word!",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Detailed How to Play */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.8 }}
        className="py-16 mb-6 sm:mb-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-4"
        >
          How to Play
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          A simple game of deception, strategy, and careful conversation
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Getting Started */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group"
          >
            <Card className="p-6 space-y-4 transition-shadow duration-200 hover:shadow-lg">
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
          </motion.div>

          {/* Making a Kill */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group"
          >
            <Card className="p-6 space-y-4 transition-shadow duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Skull className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold">Making a Kill</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                When your target says their word, show them your screen as
                proof. They'll mark themselves as dead, and you'll get their
                target as your next mission.
              </p>
            </Card>
          </motion.div>

          {/* Winning */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group"
          >
            <Card className="p-6 space-y-4 transition-shadow duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Crown className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold">Winning</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Keep assassinating targets until you're the last one standing.
                The final survivor wins the game!
              </p>
            </Card>
          </motion.div>

          {/* Word Rules */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group"
          >
            <Card className="p-6 space-y-4 transition-shadow duration-200 hover:shadow-lg">
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
          </motion.div>

          {/* Strategy Tips */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group"
          >
            <Card className="p-6 space-y-4 transition-shadow duration-200 hover:shadow-lg">
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
          </motion.div>

          {/* Fair Play */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group"
          >
            <Card className="p-6 space-y-4 transition-shadow duration-200 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold">Fair Play</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                You can lie about your target and word, but never lie about
                killing someone. When you're dead, mark yourself dead right
                away.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

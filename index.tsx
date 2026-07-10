import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Win98Intro } from "@/components/Win98Intro";
import { ModernLanding } from "@/components/ModernLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReasonateAI — Your Autonomous Virtual CTO" },
      { name: "description", content: "ReasonateAI is an Autonomous Virtual CTO powered by Dual Twin Architecture — cloud deployment, sandbox testing and self-healing infrastructure through natural language." },
      { property: "og:title", content: "ReasonateAI — Your Autonomous Virtual CTO" },
      { property: "og:description", content: "Cloud deployment, sandbox testing and self-healing infrastructure — orchestrated in plain English." },
    ],
  }),
  component: Index,
});

function Index() {
  type Phase = "intro" | "modern";
  const [phase, setPhase] = useState<Phase>("modern");

  useEffect(() => {
    const toIntro = window.setTimeout(() => {
      setPhase("intro");
    }, 4000);

    const toModern = window.setTimeout(() => {
      setPhase("modern");
    }, 8000);

    return () => {
      window.clearTimeout(toIntro);
      window.clearTimeout(toModern);
    };
  }, []);

  const enter = () => {
    setPhase("modern");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Win98Intro key="intro" onEnter={enter} glitching={false} />
          </motion.div>
        ) : (
          <motion.div
            key="modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <ModernLanding key="modern" />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

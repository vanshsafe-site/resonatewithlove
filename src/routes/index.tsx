import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ModernLanding } from "@/components/ModernLanding";
import { AssemblyIntro } from "@/components/AssemblyIntro";
import { Sun, Moon } from "lucide-react";

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

type Theme = "light" | "dark";
type Phase = "intro" | "modern";

function Index() {
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === "undefined") return "modern";
    const seen = window.localStorage.getItem("reasonate-intro-seen");
    return seen ? "modern" : "intro";
  });

  const finishIntro = () => {
    window.localStorage.setItem("reasonate-intro-seen", "1");
    setPhase("modern");
  };

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("reasonate-theme") as Theme | null;
    return stored ?? "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    window.localStorage.setItem("reasonate-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="relative">
      {phase === "modern" && (
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="fixed top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-colors hover:bg-muted"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      )}

      {phase === "intro" && <AssemblyIntro onDone={finishIntro} />}
      {phase === "modern" && <ModernLanding onReplayIntro={() => setPhase("intro")} />}
    </div>
  );
}
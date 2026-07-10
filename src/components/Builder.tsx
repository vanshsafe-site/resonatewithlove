import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Send, Sun, Moon, Loader2, CheckCircle2, Globe } from "lucide-react";

type Theme = "light" | "dark";

type Msg = {
  id: number;
  role: "user" | "ai";
  text: string;
};

const AI_LINES = [
  "Reading your brief and sketching a layout…",
  "Drafting hero section and picking a palette…",
  "Wiring up components in the Live Twin…",
  "Running a self-check against your last request…",
  "Deploying the preview — this won't take long…",
];

const BUILD_STEPS = ["Parsing intent", "Generating layout", "Styling components", "Live Twin sync", "Preview ready"];

const TEMPLATES = [
  {
    id: "studio",
    label: "Studio Portfolio",
    accent: "var(--holo-violet)",
    heading: "Atelier Noir",
    sub: "Selected works, 2019 — present",
  },
  {
    id: "saas",
    label: "SaaS Landing",
    accent: "var(--holo-cyan)",
    heading: "Streamline",
    sub: "Ship infrastructure changes in minutes, not sprints",
  },
  {
    id: "shop",
    label: "Storefront",
    accent: "var(--holo-magenta)",
    heading: "Aurora Goods",
    sub: "Small-batch objects for everyday rituals",
  },
];

let idCounter = 1;

export function Builder() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (window.localStorage.getItem("reasonate-theme") as Theme | null) ?? "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    window.localStorage.setItem("reasonate-theme", theme);
  }, [theme]);

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: idCounter++,
      role: "ai",
      text: "Tell me what you're building — a portfolio, a product page, a storefront — and I'll start drafting it live.",
    },
  ]);
  const [input, setInput] = useState("");
  const [building, setBuilding] = useState(false);
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [revision, setRevision] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, building]);

  const send = () => {
    if (!input.trim() || building) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { id: idCounter++, role: "user", text }]);
    setBuilding(true);
    setStep(0);

    const next = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];

    let s = 0;
    const stepTimer = setInterval(() => {
      s += 1;
      setStep(s);
      if (s >= BUILD_STEPS.length - 1) clearInterval(stepTimer);
    }, 550);

    setTimeout(() => {
      setTemplate(next);
      setRevision((r) => r + 1);
      setMessages((m) => [
        ...m,
        {
          id: idCounter++,
          role: "ai",
          text: `Done — updated the preview to match "${text}". Keep iterating, or ask me to change the palette, copy, or layout.`,
        },
      ]);
      setBuilding(false);
    }, 2900);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-30 px-4 md:px-6 pt-4">
        <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/" })}
              className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </button>
            <div className="w-px h-5 bg-border mx-1" />
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-md"
                style={{ background: "var(--gradient-holo)", boxShadow: "var(--shadow-glow)" }}
              />
              <span className="font-display font-semibold text-sm text-foreground">Reasonate Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono uppercase tracking-widest">
              <Sparkles className="w-3 h-3" style={{ color: "var(--holo-cyan)" }} />
              Live Twin · preview
            </span>
            <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-muted transition"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main split view */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid lg:grid-cols-[380px_1fr] gap-5 h-[calc(100vh-92px)]">
        {/* Chat panel */}
        <div className="glass-panel rounded-2xl flex flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto text-black"
                      : "mr-auto text-foreground/90 border border-border"
                  }`}
                  style={
                    m.role === "user"
                      ? { background: "var(--gradient-holo)" }
                      : { background: "var(--color-muted)" }
                  }
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {building && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mr-auto max-w-[88%] rounded-2xl px-3.5 py-3 border border-border"
                style={{ background: "var(--color-muted)" }}
              >
                <div className="flex items-center gap-2 text-[12px] text-foreground/70 mb-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "var(--holo-cyan)" }} />
                  {AI_LINES[step] ?? AI_LINES[AI_LINES.length - 1]}
                </div>
                <div className="space-y-1.5">
                  {BUILD_STEPS.map((s, i) => (
                    <div key={s} className="flex items-center gap-2 text-[11px]">
                      {i < step ? (
                        <CheckCircle2 className="w-3 h-3" style={{ color: "var(--holo-cyan)" }} />
                      ) : i === step ? (
                        <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-border block" />
                      )}
                      <span className={i <= step ? "text-foreground/70" : "text-muted-foreground"}>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-3 border-t border-border">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Describe the site you want…"
                rows={2}
                className="flex-1 resize-none rounded-xl bg-background border border-border px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={send}
                disabled={building || !input.trim()}
                className="h-9 w-9 shrink-0 rounded-xl flex items-center justify-center text-black disabled:opacity-40 transition"
                style={{ background: "var(--gradient-holo)" }}
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Live preview panel */}
        <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.7_0.18_25)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.8_0.15_90)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.75_0.16_150)]" />
            </div>
            <div className="mx-auto flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
              <Globe className="w-3 h-3" />
              preview.reasonate.site/{template.id}
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={revision}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 overflow-y-auto"
              >
                <PreviewSite template={template} />
              </motion.div>
            </AnimatePresence>

            {building && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 backdrop-blur-sm flex items-center justify-center"
                style={{ background: "oklch(0.11 0.02 270 / 0.35)" }}
              >
                <div className="glass-panel rounded-full px-4 py-2 flex items-center gap-2 text-[12px] text-foreground">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "var(--holo-cyan)" }} />
                  Rebuilding preview…
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function PreviewSite({ template }: { template: (typeof TEMPLATES)[number] }) {
  return (
    <div className="min-h-full bg-background">
      <div
        className="px-8 py-14 text-center"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${template.accent} / 0.16, transparent 60%)`,
        }}
      >
        <div
          className="inline-block text-[10px] uppercase tracking-[0.3em] mb-4 px-3 py-1 rounded-full border"
          style={{ borderColor: template.accent, color: template.accent }}
        >
          {template.label}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
          {template.heading}
        </h1>
        <p className="mt-3 text-foreground/60 text-sm max-w-md mx-auto">{template.sub}</p>
        <div className="mt-6 flex justify-center gap-2">
          <span
            className="px-4 py-2 rounded-full text-[12px] text-black font-medium"
            style={{ background: template.accent }}
          >
            Primary action
          </span>
          <span className="px-4 py-2 rounded-full text-[12px] border border-border text-foreground/70">
            Secondary
          </span>
        </div>
      </div>

      <div className="px-8 py-10 grid sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-border p-4">
            <div
              className="w-8 h-8 rounded-lg mb-3"
              style={{ background: template.accent, opacity: 0.85 }}
            />
            <div className="h-2.5 w-3/4 rounded bg-foreground/15 mb-2" />
            <div className="h-2 w-full rounded bg-foreground/10 mb-1.5" />
            <div className="h-2 w-5/6 rounded bg-foreground/10" />
          </div>
        ))}
      </div>

      <div className="px-8 pb-14">
        <div className="rounded-xl border border-border h-28 flex items-center justify-center text-[11px] text-muted-foreground font-mono">
          section — auto-generated from your prompt
        </div>
      </div>
    </div>
  );
}

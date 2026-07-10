import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

// Each fragment "drops" from above into its final resting position, staggered,
// so the page visually assembles itself — a nod to ResonantAI building
// infrastructure autonomously. Runs for ~3.4s total, then calls onDone.
export function AssemblyIntro({ onDone }: Props) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 3000);
    const doneTimer = setTimeout(onDone, 3450);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  const drop = (delay: number, x = 0, rotate = 0) => ({
    initial: { y: -520, opacity: 0, rotate, x },
    animate: { y: 0, opacity: 1, rotate: 0, x: 0 },
    transition: { delay, type: "spring" as const, stiffness: 260, damping: 20, mass: 0.9 },
  });

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {/* Ambient backdrop so the assembly doesn't feel like it's in a void */}
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

          <div className="relative h-full w-full flex flex-col items-center justify-center px-6 gap-6 max-w-5xl mx-auto">
            {/* Nav strip */}
            <motion.div
              {...drop(0)}
              className="w-full glass-panel rounded-2xl px-5 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md" style={{ background: "var(--gradient-holo)" }} />
                <div className="h-2.5 w-24 rounded-full bg-foreground/20" />
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <div className="h-2 w-12 rounded-full bg-foreground/15" />
                <div className="h-2 w-12 rounded-full bg-foreground/15" />
                <div className="h-2 w-12 rounded-full bg-foreground/15" />
              </div>
            </motion.div>

            {/* Headline block */}
            <motion.div {...drop(0.35, -20, -2)} className="w-full flex flex-col items-center gap-3 py-4">
              <div className="h-3.5 w-72 max-w-[80%] rounded-full" style={{ background: "var(--gradient-holo)" }} />
              <div className="h-3.5 w-56 max-w-[60%] rounded-full bg-foreground/20" />
              <div className="mt-2 h-2 w-80 max-w-[85%] rounded-full bg-foreground/10" />
            </motion.div>

            {/* Button pills */}
            <motion.div {...drop(0.6)} className="flex items-center gap-3">
              <div
                className="h-9 w-36 rounded-full"
                style={{ background: "var(--gradient-holo)", boxShadow: "var(--shadow-glow)" }}
              />
              <div className="h-9 w-28 rounded-full glass-panel" />
            </motion.div>

            {/* Card row */}
            <div className="w-full grid grid-cols-3 gap-4 mt-2">
              {[0.85, 1.0, 1.15].map((d, i) => (
                <motion.div
                  key={i}
                  {...drop(d, i === 1 ? 0 : i === 0 ? -30 : 30, i === 1 ? 0 : i === 0 ? -3 : 3)}
                  className="glass-panel rounded-2xl p-4 h-24 flex flex-col gap-2"
                >
                  <div
                    className="w-6 h-6 rounded-lg"
                    style={{
                      background: i === 0 ? "var(--holo-cyan)" : i === 1 ? "var(--holo-violet)" : "var(--holo-magenta)",
                    }}
                  />
                  <div className="h-2 w-3/4 rounded-full bg-foreground/15" />
                </motion.div>
              ))}
            </div>

            {/* Status caption, arrives last like a final keystone piece */}
            <motion.p
              {...drop(1.4)}
              className="mt-4 text-[12px] tracking-[0.15em] uppercase text-muted-foreground"
            >
              Assembling your infrastructure…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

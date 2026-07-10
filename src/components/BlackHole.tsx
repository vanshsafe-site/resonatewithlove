import { motion } from "framer-motion";
import { useMemo } from "react";

export function BlackHole({ onDone }: { onDone: () => void }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        angle: Math.random() * Math.PI * 2,
        dist: 300 + Math.random() * 900,
        size: 1 + Math.random() * 3,
        hue: Math.random() > 0.5 ? "var(--holo-cyan)" : "var(--holo-magenta)",
        delay: Math.random() * 0.8,
      })),
    []
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={() => setTimeout(onDone, 2400)}
    >
      {/* Accretion disk */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          background:
            "conic-gradient(from 0deg, oklch(0.85 0.16 200), oklch(0.68 0.22 290), oklch(0.7 0.26 340), oklch(0.83 0.16 75), oklch(0.85 0.16 200))",
          filter: "blur(30px)",
        }}
        initial={{ scale: 0.2, rotate: 0, opacity: 0 }}
        animate={{ scale: [0.2, 1.4, 0.4], rotate: 720, opacity: [0, 1, 0.8] }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      {/* Event horizon */}
      <motion.div
        className="absolute rounded-full bg-black"
        style={{ width: 240, height: 240, boxShadow: "0 0 120px 40px rgba(0,0,0,0.9)" }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 8] }}
        transition={{ duration: 3, ease: [0.7, 0, 0.85, 0] }}
      />
      {/* Particles */}
      {particles.map((p) => {
        const x = Math.cos(p.angle) * p.dist;
        const y = Math.sin(p.angle) * p.dist;
        return (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.hue,
              boxShadow: `0 0 ${p.size * 4}px ${p.hue}`,
            }}
            initial={{ x, y, opacity: 0, scale: 1 }}
            animate={{ x: 0, y: 0, opacity: [0, 1, 1, 0], scale: [1, 1, 0.2] }}
            transition={{ duration: 2.2, delay: p.delay, ease: "easeIn" }}
          />
        );
      })}
      {/* Warp streaks */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 20%, rgba(255,255,255,0.05) 40%, transparent 70%)",
        }}
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 8, opacity: [0, 0.6, 0] }}
        transition={{ duration: 2.5, delay: 0.3 }}
      />
    </motion.div>
  );
}
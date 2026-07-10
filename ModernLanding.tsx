import { motion, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Cpu,
  GitBranch,
  Wand2,
  Terminal,
  Rocket,
  Activity,
  DollarSign,
  Lock,
  Boxes,
  Github,
  Brush,
  Play,
  Star,
  Zap,
  Layers,
  Wifi,
  X,
  ChevronRight,
} from "lucide-react";

// ---------- Magnetic Button ----------
function MagneticButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      className={
        "relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-shadow " +
        (variant === "primary"
          ? "text-black shadow-[0_10px_40px_-10px_oklch(0.75_0.19_220/0.8)] hover:shadow-[0_20px_60px_-10px_oklch(0.68_0.22_290/0.9)] "
          : "glass-panel text-white hover:bg-white/10 ") +
        className
      }
    >
      {variant === "primary" && (
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--gradient-holo)" }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

// ---------- Nav ----------
function Nav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-full px-3 py-2 flex items-center gap-1 md:gap-2"
    >
      <div className="flex items-center gap-2 pl-3 pr-4 border-r border-white/10">
        <div
          className="w-6 h-6 rounded-md"
          style={{ background: "var(--gradient-holo)", boxShadow: "var(--shadow-glow)" }}
        />
        <span className="font-display font-semibold tracking-tight text-white text-sm">
          ReasonateAI
        </span>
      </div>
      <div className="hidden md:flex items-center text-[13px] text-white/70">
        {["Product", "Capabilities", "Deploy"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="px-3 py-1.5 hover:text-white transition">
            {l}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

// ---------- Hero ----------
function Hero({ onLaunch }: { onLaunch: () => void }) {
  const { scrollY } = useScroll();
  const parY = useTransform(scrollY, [0, 800], [0, 200]);
  const parO = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Backdrop layers */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)", y: parY, opacity: parO }}
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <FloatingOrbs />

      <div className="max-w-6xl px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 text-[12px] text-white/80 mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--holo-cyan)" }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "var(--holo-cyan)" }} />
          </span>
          Now in private alpha · v0.9.2
          <ChevronRight className="w-3 h-3" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="font-display font-semibold tracking-[-0.04em] text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] text-white"
          
          Your Autonomous
          <br />
          <span className="holo-text">Virtual CTO.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9 }}
          className="mt-6 max-w-2xl mx-auto text-white/60 text-lg leading-relaxed"
        >
          ReasonateAI orchestrates cloud deployment, sandbox testing, infrastructure monitoring, and
          autonomous self-healing — entirely through natural language. Powered by Dual&nbsp;Twin
          Architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            Get Early Access <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton variant="ghost">
            <Play className="w-4 h-4" /> Learn More
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-6 text-[12px] text-white/50"
        >
          <span className="flex items-center gap-1.5"><Star className="w-3 h-3" style={{ color: "var(--holo-amber)" }} /> 4.9/5 Rating</span>
          <span className="opacity-40">·</span>
          <span>12,000+ Users</span>
          <span className="opacity-40">·</span>
          <span>No Credit Card Required</span>
        </motion.div>

        {/* The central portal */}
        <BuildPortal onLaunch={onLaunch} />
      </div>
    </section>
  );
}

function FloatingOrbs() {
  return (
    <>
      {[
        { top: "12%", left: "8%", size: 240, hue: "var(--holo-violet)", d: 0 },
        { top: "58%", left: "80%", size: 220, hue: "var(--holo-cyan)", d: 1 },
      ].map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full -z-10"
          style={{
            top: o.top,
            left: o.left,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.hue} 0%, transparent 65%)`,
            filter: "blur(48px)",
            opacity: 0.4,
          }}
          animate={{ y: [0, -20, 0], x: [0, 12, 0] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut", delay: o.d }}
        />
      ))}
    </>
  );
}

function BuildPortal({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="mt-24 relative flex flex-col items-center justify-center">
      {/* Ambient glow behind the easel */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[480px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.7 0.24 340 / 0.35), oklch(0.68 0.22 290 / 0.25) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <motion.button
        onClick={onLaunch}
        initial={{ opacity: 0, y: 30, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, rotateZ: -0.4 }}
        whileTap={{ scale: 0.98 }}
        className="group relative cursor-pointer"
        style={{ perspective: 1200 }}
        aria-label="Start Building"
      >
        <PaintingCanvas />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        className="mt-8 text-white/50 text-xs font-mono tracking-widest uppercase"
      >
        Click the canvas · Paint your product into existence
      </motion.p>
    </div>
  );
}

function PaintingCanvas() {
  return (
    <div className="relative w-[min(620px,92vw)] aspect-[4/3]">
      <div
        className="absolute inset-0 rounded-[14px] p-[16px]"
        style={{
          background: "linear-gradient(135deg, oklch(0.15 0.03 280 / 0.95) 0%, oklch(0.22 0.04 270 / 0.95) 100%)",
          boxShadow: "0 24px 70px -24px oklch(0.68 0.22 290 / 0.55)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-[8px] border border-white/10"
          style={{
            background: "radial-gradient(ellipse at top left, oklch(0.22 0.04 280 / 0.95), oklch(0.11 0.02 270 / 0.98) 70%)",
            boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.16), inset 0 0 40px oklch(0.75 0.19 220 / 0.08)",
          }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/canvas.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-end justify-center p-6">
            <div className="w-full max-w-[340px] rounded-[32px] border border-white/10 bg-black/40 p-5 backdrop-blur-xl text-center">
              <div className="font-display text-[clamp(1.4rem,3.2vw,2.2rem)] font-semibold text-white">
                Your Canvas
              </div>
              <div className="mt-3 text-sm leading-6 text-white/80">
                Click the canvas to make your idea come to life.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Warp overlay played before route change */
function WarpOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[95] bg-black/95 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 65%)" }}
        initial={{ scale: 3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      <motion.div
        className="relative w-[320px] h-[220px] rounded-[8px] border border-white/10"
        style={{ background: "linear-gradient(135deg,#f4ead5 0%,#cdb48d 100%)" }}
        initial={{ scale: 1, opacity: 1, rotate: 0 }}
        animate={{ scale: 0.95, opacity: 0, rotate: -6 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// ---------- Capabilities ----------
const capabilities = [
  {
    icon: Layers,
    title: "Dual Twin Architecture",
    sub: "Secure & automated infrastructure deployment",
    body: "Synchronized production and simulation environments, so every deployment is validated before it reaches live infrastructure.",
    tint: "var(--holo-violet)",
  },
  {
    icon: Boxes,
    title: "Ephemeral Live Twin Sandboxing",
    sub: "Mirror production, then break it safely",
    body: "Run full integration testing in a disposable clone of production and validate every deployment before release.",
    tint: "var(--holo-cyan)",
  },
  {
    icon: Activity,
    title: "Autonomous Self-Healing",
    sub: "Detects and repairs — without you",
    body: "Failed deployments, misconfigurations, and infrastructure drift are found and fixed automatically.",
    tint: "var(--holo-magenta)",
  },
  {
    icon: Terminal,
    title: "Natural Language DevOps",
    sub: "No YAML. No CLI. No expertise.",
    body: "Deploy infrastructure by describing it in plain English. Reasonate translates intent into safe, versioned changes.",
    tint: "var(--holo-amber)",
  },
];

function Capabilities() {
  return (
    <section id="capabilities" className="relative py-32 px-6">
      <SectionHeader
        kicker="Core Capabilities"
        title={
          <>
            Four systems, one <span className="holo-text">autonomous mind.</span>
          </>
        }
        sub="Every layer of your infrastructure is observed, simulated and improved by a resident AI CTO."
      />
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-5">
        {capabilities.map((c, i) => (
          <TiltCard key={c.title} tint={c.tint} delay={i * 0.08}>
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${c.tint}, transparent)`,
                  boxShadow: `0 10px 30px -10px ${c.tint}`,
                }}
              >
                <c.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50">{c.sub}</div>
                <h3 className="font-display text-2xl font-semibold text-white mt-1">{c.title}</h3>
                <p className="text-white/60 text-[15px] mt-3 leading-relaxed">{c.body}</p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function TiltCard({
  children,
  tint,
  delay = 0,
}: {
  children: React.ReactNode;
  tint: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay }}
      className="relative glass-panel rounded-2xl p-7 overflow-hidden"
      style={{ boxShadow: `0 14px 40px -20px ${tint}` }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at top left, ${tint}, transparent 60%)` }} />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

// ---------- CTO Suite ----------
const suite = [
  { icon: Lock, title: "Autonomous SecOps", body: "Continuous threat modeling, patching and audit trails." },
  { icon: DollarSign, title: "FinOps Cost Control", body: "Rightsize workloads, reserve capacity and forecast burn." },
  { icon: Cpu, title: "Infra-as-Code Automation", body: "Generate, review and roll back Terraform in one loop." },
];

function CTOSuite() {
  return (
    <section className="relative py-24 px-6">
      <SectionHeader kicker="Virtual CTO Suite" title="An entire org chart, condensed." />
      <div className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-5">
        {suite.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass-panel rounded-2xl p-6"
          >
            <s.icon className="w-6 h-6 mb-4" style={{ color: "var(--holo-cyan)" }} />
            <h4 className="font-display text-xl text-white">{s.title}</h4>
            <p className="text-white/60 text-sm mt-2">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------- Deployment Process ----------
const steps = [
  {
    step: "01",
    title: "AI System Design",
    items: ["Analyze GitHub repository", "Design databases", "Plan infrastructure"],
    icon: Wand2,
  },
  {
    step: "02",
    title: "Sandbox Testing",
    items: ["Create Live Twin", "Integration Testing", "Auto Fix Bugs"],
    icon: Boxes,
  },
  {
    step: "03",
    title: "Production Rollout",
    items: ["Zero Downtime", "Auto Scaling", "24/7 Monitoring"],
    icon: Rocket,
  },
];

function Deployment() {
  return (
    <section id="deploy" className="relative py-32 px-6">
      <SectionHeader kicker="Deployment Process" title="Three steps. Zero DevOps." />
      <div className="max-w-6xl mx-auto mt-16 relative">
        <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass-panel rounded-3xl p-8 relative"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center relative mb-6"
                style={{ background: "var(--gradient-holo)" }}
              >
                <s.icon className="w-6 h-6 text-black" />
                <span className="absolute inset-0 rounded-full animate-[pulse-ring_2.5s_ease-out_infinite]" style={{ boxShadow: "0 0 0 2px var(--holo-cyan)" }} />
              </div>
              <div className="font-mono text-xs text-white/40">STEP {s.step}</div>
              <h3 className="font-display text-2xl text-white mt-1">{s.title}</h3>
              <ul className="mt-6 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-white/70">
                    <div className="w-1 h-1 rounded-full" style={{ background: "var(--holo-cyan)" }} />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Use Cases ----------
const useCases = [
  { title: "Startup Founders", body: "Ship your MVP without your first hire." },
  { title: "Developers", body: "Skip the DevOps rabbit hole. Focus on product." },
  { title: "Freelancers", body: "Deliver production-grade infra to every client." },
  { title: "College Students", body: "Deploy your hackathon build in one prompt." },
];

function UseCases() {
  return (
    <section className="relative py-24 px-6">
      <SectionHeader kicker="For everyone shipping software" title="Built for the next generation of builders." />
      <div className="max-w-6xl mx-auto mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {useCases.map((u, i) => (
          <motion.div
            key={u.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="w-8 h-8 rounded-lg" style={{ background: "var(--gradient-holo)", opacity: 0.9 }} />
            <h4 className="font-display text-lg text-white mt-4">{u.title}</h4>
            <p className="text-white/55 text-sm mt-1">{u.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------- Testimonials ----------
const testimonials = [
  {
    name: "Marcus Osei",
    role: "CTO, Northwind Labs",
    text: "We collapsed a six-person platform team into a Reasonate workspace. Rollouts are calmer, cheaper and — genuinely — boring.",
    hue: "var(--holo-cyan)",
  },
  {
    name: "Arjun Mehta",
    role: "Founder, Kepler.dev",
    text: "The Live Twin caught a subtle Postgres index regression before it hit prod. That single save paid for the year.",
    hue: "var(--holo-violet)",
  },
  {
    name: "Neha Sharma",
    role: "Staff Engineer, Loopfield",
    text: "It writes better Terraform than my seniors and it never complains about on-call. My weekends are back.",
    hue: "var(--holo-magenta)",
  },
];

function Testimonials() {
  return (
    <section className="relative py-32 px-6">
      <SectionHeader kicker="Loved by builders" title="What early users are saying." />
      <div className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="glass-panel rounded-3xl p-7 relative overflow-hidden"
          >
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-40"
              style={{ background: `radial-gradient(circle, ${t.hue}, transparent 60%)`, filter: "blur(20px)" }}
            />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="w-4 h-4 fill-current" style={{ color: "var(--holo-amber)" }} />
              ))}
            </div>
            <blockquote className="text-white/85 text-[15px] leading-relaxed">“{t.text}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-black font-semibold"
                style={{ background: `linear-gradient(135deg, ${t.hue}, oklch(0.9 0.05 250))` }}
              >
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="text-white font-medium text-sm">{t.name}</div>
                <div className="text-white/50 text-xs">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

// ---------- Logo Wall ----------
const logos = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "Loom"];
function LogoWall() {
  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center text-xs uppercase tracking-[0.3em] text-white/40">
          Teams already exploring Reasonate
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="font-display text-2xl text-white/50 hover:text-white transition"
            >
              {l}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Stats ----------
const stats = [
  { label: "Users", value: 12000, suffix: "+" },
  { label: "Queries", value: 0.4, suffix: "M" },
  { label: "Uptime", value: 99.97, suffix: "%" },
  { label: "Rating", value: 4.7, suffix: "" },
];

function useCount(target: number, start: boolean, duration = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return v;
}

function StatItem({ s, start }: { s: (typeof stats)[number]; start: boolean }) {
  const v = useCount(s.value, start);
  const fmt =
    s.value >= 1000
      ? Math.round(v).toLocaleString()
      : s.value < 10
      ? v.toFixed(v < 1 ? 1 : 2)
      : v.toFixed(2);
  return (
    <div className="text-center">
      <div
        className="font-display font-semibold text-[clamp(2.5rem,6vw,4.5rem)] leading-none holo-text"
      >
        {fmt}
        {s.suffix}
      </div>
      <div className="mt-2 text-white/50 text-sm uppercase tracking-widest">{s.label}</div>
    </div>
  );
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver((e) => e.forEach((x) => x.isIntersecting && setStart(true)), {
      threshold: 0.3,
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto glass-panel rounded-3xl py-14 px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <StatItem key={s.label} s={s} start={start} />
        ))}
      </div>
    </section>
  );
}

// ---------- Section header ----------
function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-block text-[11px] uppercase tracking-[0.3em] text-white/50 mb-4">
        {kicker}
      </div>
      <h2 className="font-display font-semibold tracking-tight text-white text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-white/60 max-w-xl mx-auto">{sub}</p>}
    </div>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md" style={{ background: "var(--gradient-holo)" }} />
          <span className="font-display text-white">ReasonateAI</span>
          <span className="text-white/40 text-xs ml-2">© 2060</span>
        </div>
        <div className="text-white/40 text-sm">Built in a Live Twin. Deployed by itself.</div>
      </div>
    </footer>
  );
}

// ---------- Root export ----------
export function ModernLanding() {
  const [warping, setWarping] = useState(false);
  const navigate = useNavigate();

  const launch = () => {
    if (warping) return;
    setWarping(true);
    setTimeout(() => navigate({ to: "/builder" }), 1300);
  };

  return (
    <div>
      <Nav />
      <Hero onLaunch={launch} />
      <Capabilities />
      <CTOSuite />
      <Deployment />
      <UseCases />
      <Testimonials />
      <LogoWall />
      <Stats />
      <Footer />
      <AnimatePresence>{warping && <WarpOverlay key="warp" />}</AnimatePresence>
    </div>
  );
}
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Sparkles, Layers, Bot, Network, Database } from "lucide-react";

type Tech = { label: string; Icon: React.ComponentType<{ className?: string }> };

const PRIMARY: Tech[] = [
  { label: "LLM", Icon: Sparkles },
  { label: "RAG", Icon: Layers },
  { label: "Agents", Icon: Bot },
];
const SECONDARY: Tech[] = [
  { label: "MCP", Icon: Network },
  { label: "Memory", Icon: Database },
];

/* ---------- Neural Brain SVG (procedural pathways) ---------- */
function NeuralBrain() {
  // Sample neuron points inside a brain-ish ellipse
  const nodes = (() => {
    const pts: { x: number; y: number; side: -1 | 1 }[] = [];
    const rand = (n: number) => {
      const s = Math.sin(n * 9301 + 49297) * 233280;
      return Math.abs(s - Math.floor(s));
    };
    for (let i = 0; i < 95; i++) {
      let x = 0,
        y = 0;
      for (let j = 0; j < 10; j++) {
        x = (rand(i * 7 + j) - 0.5) * 360;
        y = (rand(i * 13 + j + 3) - 0.5) * 280;
        if ((x * x) / (175 * 175) + (y * y) / (135 * 135) < 0.95) break;
      }
      pts.push({ x: x + 220, y: y + 180, side: x < 0 ? -1 : 1 });
    }
    return pts;
  })();

  // edges: connect to 2 nearest same-side neighbors (mimic hemisphere wiring)
  const edges: [number, number][] = [];
  nodes.forEach((p, i) => {
    const dists = nodes
      .map((q, j) => ({ j, d: (q.x - p.x) ** 2 + (q.y - p.y) ** 2, ok: q.side === p.side }))
      .filter((o) => o.j !== i && o.ok)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    dists.forEach((o) => edges.push([i, o.j]));
  });

  return (
    <svg viewBox="0 0 440 360" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="brainGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="oklch(0.85 0.18 215)" stopOpacity="0.6" />
          <stop offset="55%" stopColor="oklch(0.55 0.2 265)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="oklch(0.2 0.1 285)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="synapse" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.9 0.15 215)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.92 0.16 215)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="oklch(0.75 0.22 295)" stopOpacity="0" />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* volumetric halo */}
      <ellipse cx="220" cy="180" rx="190" ry="150" fill="url(#brainGlow)" />

      {/* Brain silhouette — two hemispheres with gyri folds */}
      <g
        fill="none"
        stroke="oklch(0.88 0.14 215 / 65%)"
        strokeWidth="1.3"
        strokeLinecap="round"
        filter="url(#softGlow)"
      >
        {/* outer hemispheres */}
        <path
          d="M220 45
                 C 150 40, 78 90, 70 175
                 C 62 255, 130 310, 220 312"
        />
        <path
          d="M220 45
                 C 290 40, 362 90, 370 175
                 C 378 255, 310 310, 220 312"
        />
        {/* central fissure */}
        <path
          d="M220 50 C 215 130, 225 220, 220 308"
          stroke="oklch(0.9 0.15 215 / 45%)"
          strokeDasharray="2 4"
        />
        {/* gyri (folds) — left */}
        <path d="M95 130 C 130 120, 155 145, 150 180 C 145 215, 115 225, 100 250" opacity="0.7" />
        <path d="M115 95  C 145 110, 170 110, 195 95" opacity="0.6" />
        <path d="M85 200  C 115 195, 145 210, 160 235" opacity="0.6" />
        <path d="M130 270 C 160 260, 185 270, 210 268" opacity="0.55" />
        {/* gyri — right */}
        <path d="M345 130 C 310 120, 285 145, 290 180 C 295 215, 325 225, 340 250" opacity="0.7" />
        <path d="M325 95  C 295 110, 270 110, 245 95" opacity="0.6" />
        <path d="M355 200 C 325 195, 295 210, 280 235" opacity="0.6" />
        <path d="M310 270 C 280 260, 255 270, 230 268" opacity="0.55" />
        {/* brainstem hint */}
        <path d="M205 305 C 210 325, 230 325, 235 305" opacity="0.6" />
      </g>

      {/* synapse edges */}
      <g stroke="url(#synapse)" strokeWidth="0.75" filter="url(#softGlow)">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            opacity={0.3 + ((i * 37) % 60) / 100}
          />
        ))}
      </g>

      {/* neuron nodes (clusters) */}
      <g filter="url(#softGlow)">
        {nodes.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={1.2 + ((i * 13) % 9) / 6}
            fill="oklch(0.96 0.1 215)"
            opacity={0.85}
          >
            <animate
              attributeName="opacity"
              values="0.25;1;0.25"
              dur={`${2.6 + (i % 6) * 0.5}s`}
              begin={`${(i % 9) * 0.27}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* firing pulses traveling along edges */}
      <g>
        {edges.slice(0, 22).map(([a, b], i) => (
          <circle key={`p${i}`} r="2.1" fill="oklch(0.98 0.09 200)">
            <animateMotion
              dur={`${2.2 + (i % 5) * 0.6}s`}
              repeatCount="indefinite"
              begin={`${i * 0.22}s`}
              path={`M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`}
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${2.2 + (i % 5) * 0.6}s`}
              begin={`${i * 0.22}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  );
}

/* ---------- Orbit capsule ---------- */
function Capsule({ label, Icon, primary }: Tech & { primary?: boolean }) {
  return (
    <div className="group pointer-events-auto -translate-x-1/2 -translate-y-1/2 select-none">
      <div
        className={`glass-strong holo-border flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono tracking-wide text-foreground/90 transition-all duration-300 group-hover:scale-110 ${
          primary
            ? "border border-cyan/40 text-[11px] shadow-[0_0_22px_-4px_var(--cyan)] group-hover:shadow-[0_0_32px_-2px_var(--cyan)]"
            : "border border-violet/30 text-[10px] shadow-[0_0_16px_-6px_var(--violet)] group-hover:shadow-[0_0_24px_-4px_var(--violet)]"
        }`}
      >
        <Icon className={`h-3 w-3 ${primary ? "text-[var(--cyan)]" : "text-[var(--violet)]"}`} />
        <span>{label}</span>
      </div>
    </div>
  );
}

/* ---------- Orbit ring (labels stay horizontal) ---------- */
function Orbit({
  radius,
  duration,
  items,
  tiltX = 70,
  reverse = false,
  primary = false,
}: {
  radius: number;
  duration: number;
  items: Tech[];
  tiltX?: number;
  reverse?: boolean;
  primary?: boolean;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        transformStyle: "preserve-3d",
        transform: `rotateX(${tiltX}deg)`,
      }}
    >
      {/* ring line */}
      <div
        className={`absolute inset-0 rounded-full border ${primary ? "border-cyan/20" : "border-violet/15"}`}
        style={{ boxShadow: `0 0 30px -10px ${primary ? "var(--cyan)" : "var(--violet)"} inset` }}
      />
      {/* rotating waypoints */}
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {items.map((t, i) => {
          const angle = (i / items.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={t.label}
              className="absolute left-1/2 top-1/2"
              style={{
                // place on ring, then un-tilt so capsule faces camera
                transform: `translate(${x}px, ${y}px) rotateX(-${tiltX}deg)`,
              }}
            >
              {/* counter-rotate so label stays horizontal */}
              <motion.div
                animate={{ rotate: reverse ? 360 : -360 }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
              >
                <Capsule {...t} primary={primary} />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ---------- Particle streams between brain & orbits ---------- */
function DataParticles() {
  const particles = Array.from({ length: 22 });
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const r = 110 + (i % 3) * 70;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r * 0.32;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[var(--cyan)]"
            style={{ boxShadow: "0 0 8px var(--cyan)" }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: [0, x, 0], y: [0, y, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + (i % 5) * 0.4,
              repeat: Infinity,
              delay: i * 0.16,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Main export ---------- */
export function AICore() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-10, 10]);
  const rotX = useTransform(sy, [-1, 1], [7, -7]);
  const brainX = useTransform(sx, [-1, 1], [-10, 10]);
  const brainY = useTransform(sy, [-1, 1], [-8, 8]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div
      ref={ref}
      className="relative mx-auto h-[520px] w-[520px] max-w-full lg:-translate-x-8 xl:-translate-x-12"
      style={{ perspective: 1200 }}
    >
      {/* tilt wrapper for orbits */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      >
        {/* Primary orbit — closer, brighter (cyan) */}
        <Orbit radius={185} duration={26} items={PRIMARY} tiltX={68} primary />
        {/* Secondary orbit — farther, dimmer (violet) */}
        <Orbit radius={250} duration={42} items={SECONDARY} tiltX={72} reverse />
        <DataParticles />
      </motion.div>

      {/* central brain (≈25% larger than before) */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[350px] w-[412px] -translate-x-1/2 -translate-y-1/2"
        style={{ x: brainX, y: brainY }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.85 0.18 215 / 38%) 0%, transparent 65%)",
            filter: "blur(10px)",
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={{ rotate: [0, 1.2, 0, -1.2, 0], y: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          <NeuralBrain />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 scanline opacity-15 mix-blend-overlay" />
      </motion.div>
    </div>
  );
}

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  FileDown,
  Bot,
  Send,
  X,
  Cpu,
  Sparkles,
  Code2,
  Database,
  Brain,
  Layers,
  GitBranch,
  Zap,
  ExternalLink,
  MapPin,
  Award,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NeuralBackground } from "@/components/NeuralBackground";
import { AICore } from "@/components/AICore";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { profile, stats, skills, projects } from "@/data/portfolio";
import portrait from "@/assets/PROFILE.jpg";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "AI / ML": Brain,
  "LLM Engineering": Sparkles,
  "RAG Systems": Layers,
  "Agentic AI": Bot,
  "Vector DBs": Database,
  Backend: Cpu,
  Frontend: Code2,
  Languages: Code2,
  Tooling: GitBranch,
};

/* -------------------- Typewriter -------------------- */
function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const speed = del ? 35 : 70;
    const t = setTimeout(() => {
      if (!del) {
        if (text.length < w.length) setText(w.slice(0, text.length + 1));
        else setTimeout(() => setDel(true), 1400);
      } else {
        if (text.length > 0) setText(w.slice(0, text.length - 1));
        else {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return <span className="cursor-blink text-gradient font-medium">{text}</span>;
}

/* -------------------- Section helper -------------------- */
function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-7xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
          {kicker}
        </div>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

/* -------------------- Nav -------------------- */
function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#architecture", label: "Architecture" },
    { href: "#github", label: "GitHub" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <div className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5">
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-cyan to-violet text-background">
            PD
          </span>
          <span className="hidden sm:inline">Deepak.dev</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button
          asChild
          size="sm"
          className="rounded-full bg-gradient-to-r from-cyan to-violet text-background hover:opacity-90"
        >
          <a href={profile.resume} target="_blank" rel="noreferrer">
            <FileDown className="mr-1.5 h-4 w-4" /> Resume
          </a>
        </Button>
      </div>
    </header>
  );
}

/* -------------------- Hero -------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 scanline opacity-30" />
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-32 lg:grid-cols-2 lg:pt-0"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cyan"
          >
            <Activity className="h-3 w-3" /> AI Engineer · Open to opportunities
          </motion.div>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Parasa <span className="text-gradient">Deepak</span> Kumar
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">
            <Typewriter
              words={[
                "Building intelligent systems.",
                "Designing RAG pipelines.",
                "Shipping agentic AI.",
                "Engineering LLM products.",
              ]}
            />
          </p>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-cyan to-violet text-background hover:opacity-90 glow-cyan"
            >
              <a href={profile.resume} target="_blank" rel="noreferrer">
                <FileDown className="mr-2 h-4 w-4" /> View Resume
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/15 bg-white/5 hover:bg-white/10"
            >
              <a href="#projects">
                Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="flex items-center gap-1.5 pl-1">
              <IconLink href={profile.github} label="GitHub">
                <Github className="h-4 w-4" />
              </IconLink>
              <IconLink href={profile.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </IconLink>
              <IconLink
                href={`mailto:${profile.email}`}
                label="Email"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`,
                    "_blank",
                  );
                }}
              >
                <Mail className="h-4 w-4" />
              </IconLink>
            </div>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-3 text-center">
                <div className="font-mono text-xl font-semibold text-gradient">{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <AICore />
          {/* corner HUD */}
          <div className="absolute left-0 top-0 hidden font-mono text-[10px] uppercase tracking-widest text-cyan/70 md:block">
            ◢ ai.core.v3 ▸ online
          </div>
          <div className="absolute bottom-0 right-0 hidden font-mono text-[10px] uppercase tracking-widest text-violet/70 md:block">
            neural.mesh ▸ stable
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          scroll ↓
        </motion.div>
      </div>
    </section>
  );
}

function IconLink({
  href,
  children,
  label,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition hover:border-cyan/40 hover:text-foreground"
    >
      {children}
    </a>
  );
}

/* -------------------- About -------------------- */
function About() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <Section
      id="about"
      kicker="01 · About"
      title={
        <>
          An engineer focused on <span className="text-gradient">production AI</span>.
        </>
      }
    >
      <div className="grid items-start gap-10 lg:grid-cols-[360px_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setTilt({
              x: ((e.clientY - r.top) / r.height - 0.5) * -8,
              y: ((e.clientX - r.left) / r.width - 0.5) * 8,
            });
          }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          className="relative mx-auto"
        >
          <div className="holo-border relative h-[360px] w-[300px] rounded-3xl glass-strong p-3">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan/20 via-transparent to-violet/30 blur-2xl" />
            <img
              src={portrait}
              alt="Parasa Deepak Kumar"
              width={1024}
              height={1024}
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" /> live
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            I'm a final-year <strong className="text-foreground">B.Tech CSE (AIML)</strong> student
            building real-world AI products — from retrieval-augmented systems and agents to ML
            services that ship. My focus: combining strong software engineering with modern AI
            tooling to build systems that are{" "}
            <strong className="text-foreground">accurate, evaluable, and reliable</strong>.
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            <InfoCard icon={MapPin} label="Based in" value={profile.location} />
            <InfoCard icon={Award} label="Education" value="B.Tech CSE (AIML), Final Year" />
            <InfoCard icon={Brain} label="Focus" value="LLM · RAG · Agentic AI" />
            <InfoCard icon={Zap} label="Currently" value="Open to AI Engineer roles" />
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">
              Objective
            </div>
            <p className="text-sm text-muted-foreground">
              Join an ambitious team building production AI products where I can own LLM pipelines,
              RAG retrieval quality, agentic workflows, and the surrounding evals & infra.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="glass flex items-center gap-3 rounded-xl p-3">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

/* -------------------- Skills -------------------- */
function Skills() {
  return (
    <Section
      id="skills"
      kicker="02 · Stack"
      title={
        <>
          Skills <span className="text-gradient">command center</span>.
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => {
          const Icon = ICONS[s.group] ?? Cpu;
          return (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
            >
              <Card className="glass-strong group relative overflow-hidden rounded-2xl border-white/10 p-5 transition hover:border-cyan/40">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/10 blur-2xl transition group-hover:bg-cyan/20" />
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{s.group}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.items.length} modules
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <Badge
                      key={it}
                      variant="secondary"
                      className="rounded-full border-white/10 bg-white/5 font-normal text-foreground/90"
                    >
                      {it}
                    </Badge>
                  ))}
                </div>
                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${70 + (i % 4) * 7}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
                  />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* -------------------- Projects -------------------- */
function Projects() {
  const [open, setOpen] = useState<string | null>(null);
  const active = projects.find((p) => p.slug === open);

  return (
    <Section
      id="projects"
      kicker="03 · Work"
      title={
        <>
          Featured <span className="text-gradient">projects</span>.
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Card
              onClick={() => setOpen(p.slug)}
              className="glass-strong group relative cursor-pointer overflow-hidden rounded-3xl border-white/10 p-6 transition hover:border-cyan/40 hover:-translate-y-1"
            >
              <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-cyan/20 blur-3xl" />
              </div>
              <div className="flex items-start justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                  PROJECT_0{i + 1}
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>

              {/* pipeline preview */}
              <div className="mt-5 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                {p.pipeline.map((n, idx) => (
                  <span key={n} className="flex items-center gap-1.5">
                    <span className="rounded-md border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-cyan">
                      {n}
                    </span>
                    {idx < p.pipeline.length - 1 && (
                      <span className="text-muted-foreground">→</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 5).map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="rounded-full border-white/10 bg-white/5 font-normal"
                  >
                    {t}
                  </Badge>
                ))}
                {p.tech.length > 5 && (
                  <Badge variant="secondary" className="rounded-full bg-white/5">
                    +{p.tech.length - 5}
                  </Badge>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="glass-strong max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 text-foreground">
          {active && (
            <>
              <DialogHeader>
                <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                  case_file
                </div>
                <DialogTitle className="text-2xl">{active.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {active.summary}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 space-y-5">
                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">
                    Problem
                  </h4>
                  <p className="text-sm text-muted-foreground">{active.problem}</p>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">
                    Key Features
                  </h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {active.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-cyan">▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">
                    Architecture
                  </h4>
                  <PipelineDiagram nodes={active.pipeline} />
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">
                    Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {active.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-full border-white/10 bg-white/5 font-normal"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    asChild
                    className="rounded-full bg-gradient-to-r from-cyan to-violet text-background hover:opacity-90"
                  >
                    <a href={active.github} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/15 bg-white/5"
                  >
                    <a href={active.demo} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

/* -------------------- Architecture Pipeline -------------------- */
function PipelineDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${nodes.length}, minmax(0,1fr))` }}
      >
        {nodes.map((n, i) => (
          <motion.div
            key={n + i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative"
          >
            <div className="grid place-items-center rounded-xl border border-cyan/30 bg-gradient-to-br from-cyan/10 to-violet/10 px-2 py-3 text-center text-[11px] font-mono uppercase tracking-wider">
              {n}
            </div>
            {i < nodes.length - 1 && (
              <div className="absolute right-[-10px] top-1/2 hidden h-px w-5 -translate-y-1/2 bg-gradient-to-r from-cyan to-violet md:block" />
            )}
          </motion.div>
        ))}
      </div>
      {/* moving packet */}
      <motion.div
        className="pointer-events-none absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_12px_var(--cyan)]"
        initial={{ left: "2%" }}
        animate={{ left: ["2%", "98%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Architecture() {
  return (
    <Section
      id="architecture"
      kicker="04 · Systems"
      title={
        <>
          RAG <span className="text-gradient">data flow</span>, visualized.
        </>
      }
    >
      <p className="mb-8 max-w-2xl text-muted-foreground">
        A reference architecture for the production RAG assistant — every node animates as data
        flows through the pipeline.
      </p>
      <PipelineDiagram
        nodes={["User Query", "Retriever", "Vector DB", "Reranker", "LLM", "Cited Answer"]}
      />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { t: "Document Processing", d: "PDF ingestion, chunking, metadata extraction" },
          { t: "Semantic Retrieval", d: "Embedding search and context selection" },
          { t: "Citation-Based Answers", d: "Responses generated using retrieved sources" },
        ].map((b) => (
          <div key={b.t} className="glass rounded-2xl p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">module</div>
            <div className="mt-1 font-semibold">{b.t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{b.d}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- GitHub Command Center -------------------- */
function GitHubPanel() {
  // Synthetic contribution grid (52 weeks x 7 days)
  const cells = Array.from({ length: 52 * 7 }, (_, i) => {
    const seed = Math.sin(i * 12.9898) * 43758.5453;
    const v = Math.abs(seed - Math.floor(seed));
    return v < 0.55 ? 0 : v < 0.75 ? 1 : v < 0.9 ? 2 : 3;
  });
  const colors = ["bg-white/5", "bg-cyan/30", "bg-cyan/60", "bg-cyan"];

  return (
    <Section
      id="github"
      kicker="05 · Signals"
      title={
        <>
          GitHub <span className="text-gradient">command center</span>.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass-strong rounded-3xl border-white/10 p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">
                contributions · last 12 months
              </div>
              <div className="mt-1 text-xl font-semibold">1,240+ commits</div>
            </div>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full border-white/15 bg-white/5"
            >
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github className="mr-1.5 h-4 w-4" />
                Open GitHub
              </a>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-flow-col grid-rows-7 gap-1">
              {cells.map((v, i) => (
                <div key={i} className={`h-3 w-3 rounded-sm ${colors[v]}`} />
              ))}
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          {[
            { label: "Top language", value: "Python", pct: 56 },
            { label: "Secondary", value: "TypeScript", pct: 22 },
            { label: "Backend", value: "Java", pct: 14 },
          ].map((l) => (
            <Card key={l.label} className="glass rounded-2xl border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {l.label}
                </div>
                <div className="font-mono text-xs text-cyan">{l.pct}%</div>
              </div>
              <div className="mt-2 text-base font-semibold">{l.value}</div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------- Contact -------------------- */
function Contact() {
  return (
    <Section
      id="contact"
      kicker="06 · Contact"
      title={
        <>
          Let's build <span className="text-gradient">something real</span>.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="glass-strong relative overflow-hidden rounded-3xl border-white/10 p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/15 blur-3xl" />
          <div className="relative">
            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Available for AI Engineer roles & collaborations.
            </h3>
            <p className="mt-3 max-w-lg text-muted-foreground">
              The fastest way to reach me is email — I usually reply within a day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => {
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`,
                    "_blank",
                  );
                }}
                className="rounded-full bg-gradient-to-r from-cyan to-violet text-background hover:opacity-90"
              >
                <Mail className="mr-2 h-4 w-4" /> {profile.email}
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/15 bg-white/5"
              >
                <a href={profile.resume} target="_blank" rel="noreferrer">
                  <FileDown className="mr-2 h-4 w-4" /> Resume
                </a>
              </Button>
            </div>
          </div>
        </Card>
        <div className="space-y-3">
          <ContactLink href={profile.github} icon={Github} label="GitHub" value="@deepak-parasa" />
          <ContactLink
            href={profile.linkedin}
            icon={Linkedin}
            label="LinkedIn"
            value="Parasa Deepak Kumar"
          />
          <ContactLink
            href={`mailto:${profile.email}`}
            icon={Mail}
            label="Email"
            value={profile.email}
            onClick={(e) => {
              e.preventDefault();
              window.open(
                `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`,
                "_blank",
              );
            }}
          />
        </div>
      </div>
      <footer className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Parasa Deepak Kumar · Built with intent.</div>
        <div className="font-mono">v1.0 · system online</div>
      </footer>
    </Section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className="glass group flex items-center gap-3 rounded-2xl p-4 transition hover:border-cyan/40"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-medium">{value}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}

/* -------------------- AI Assistant (local, rule-based) -------------------- */
type Msg = { role: "user" | "assistant"; content: string };

function answer(q: string): string {
  const s = q.toLowerCase();
  if (/who|about|deepak|parasa/.test(s))
    return "Deepak is a final-year B.Tech CSE (AIML) student and AI engineer focused on LLM, RAG, and agentic systems. He's open to full-time AI Engineer roles.";
  if (/project|build|made|portfolio/.test(s))
    return "Featured projects: Intelligent Loan Approval System (ML + SHAP), Lumora AI Learning Platform, Advanced RAG Document Intelligence Assistant, and an Autonomous Research Agent. Click any project card for the architecture.";
  if (/rag|retriev/.test(s))
    return "His RAG assistant uses hybrid BM25 + dense retrieval, a cross-encoder reranker, and grounded generation with inline citations. See the Architecture section.";
  if (/agent/.test(s))
    return "The Autonomous Research Agent runs a Planner / Executor / Critic loop on LangGraph with budgeted tool use (search, scraping, code) and produces cited markdown briefs.";
  if (/skill|tech|stack/.test(s))
    return "Core stack: Python, Java, Spring Boot, React, TypeScript. AI: LangChain, LangGraph, OpenAI, pgvector, Weaviate, Pinecone. Strong in evals, retrieval, and agent design.";
  if (/contact|hire|email|reach/.test(s))
    return `Reach Deepak at ${profile.email}, on LinkedIn, or via the Contact section. He responds within a day.`;
  if (/resume|cv/.test(s))
    return "Resume is at the top-right Resume button — downloadable anywhere on the site.";
  if (/education|study|college/.test(s))
    return "Final-year B.Tech in Computer Science & Engineering with AI/ML specialization.";
  if (/hello|hi|hey/.test(s))
    return "Hi! Ask me about Deepak's projects, skills, RAG/agent work, or how to contact him.";
  return "I can answer questions about Deepak's projects, AI stack, RAG/agent architectures, education, or contact info. Try 'tell me about the RAG project'.";
}

function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm Deepak's portfolio assistant. Ask me about his projects, AI stack, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs, open]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", content: t }]);
    setTimeout(() => setMsgs((m) => [...m, { role: "assistant", content: answer(t) }]), 280);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet text-background shadow-[0_0_30px_-5px_var(--cyan)]"
        aria-label="AI Assistant"
      >
        {open ? <X className="h-5 w-5" /> : <Bot className="h-6 w-6" />}
      </motion.button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="glass-strong fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border-white/10"
        >
          <div className="flex items-center gap-3 border-b border-white/10 p-4">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet text-background">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">Portfolio Assistant</div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" /> online
              </div>
            </div>
          </div>
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-cyan to-violet text-background"
                      : "bg-white/5 text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills…"
                className="rounded-full border-white/10 bg-white/5"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full bg-gradient-to-br from-cyan to-violet text-background"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
}

/* -------------------- Page -------------------- */
export function Portfolio() {
  return (
    <div className="relative min-h-screen">
      <NeuralBackground />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Architecture />
        <GitHubPanel />
        <Contact />
      </main>
      <Assistant />
      <Toaster />
    </div>
  );
}

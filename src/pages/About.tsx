import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Bot, Search, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";

const RIVET_CSR_URL = "https://rivetcsr.com";

const services = [
  { icon: Search, title: "AI-assisted sourcing setup", desc: "Rather have the signal-based sourcing and outbound workflow built for you than piece it together? Rivet CSR configures the automation end to end." },
  { icon: Bot, title: "Custom AI workflows", desc: "Screening, scheduling, and rediscovery automation tuned to how your desk actually runs, not a generic template." },
  { icon: Users, title: "ATS / CRM integration", desc: "Live data flowing between your sourcing tools and your system of record. No copy-pasting between tabs." },
  { icon: BarChart3, title: "Ongoing optimization", desc: "Regular review of reply rates, time-to-shortlist, and placement data, with adjustments included." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Guide
        </Link>
        <a href={RIVET_CSR_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          rivetcsr.com <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>

    <main className="mx-auto max-w-4xl px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <img
            src="https://alexfranco.io/assets/alex-about-B_r7ujKr.png"
            alt="Alex Franco"
            className="h-48 w-48 rounded-2xl object-cover shadow-lg"
          />
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Hey, I'm Alex.</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              I wrote this guide because most of what I saw agency owners doing with AI was either a scattershot
              of unrelated tools, or nothing at all out of fear of getting it wrong. Neither gets you filled reqs
              faster.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">AI Adoption for Recruiting Agencies</strong> maps every stage of the
              desk, from landing the job order to keeping the client, to where AI actually earns its cost, with
              real tool pricing and evidence instead of hype. No chapter is padded with theory you can't act on
              this week.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-16">
        <h2 className="font-heading text-2xl font-bold text-foreground">Don't Want to Build It Yourself?</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          This guide is the DIY playbook. If you'd rather hand off the setup work,{" "}
          <a href={RIVET_CSR_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
            Rivet CSR
          </a>{" "}
          is Alex's studio for building and managing AI-assisted workflows for service businesses.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <s.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-heading text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 text-center">
        <a
          href={RIVET_CSR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          See Rivet CSR <ExternalLink className="h-4 w-4" />
        </a>
        <p className="mt-3 text-xs text-muted-foreground">Or grab the DIY guide →</p>
      </motion.div>
    </main>
  </div>
);

export default About;

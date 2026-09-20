import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Wallet, ArrowRight } from "lucide-react";

interface StackLine {
  juncture: string;
  tool: string;
  price: string;
  chapter: number;
}

interface BudgetTier {
  id: string;
  label: string;
  range: string;
  blurb: string;
  lines: StackLine[];
}

// Every price here is the same verified figure used in Chapter 2, the Tool
// Directory, and each juncture's own chapter — this just reassembles them
// per budget tier instead of leaving that assembly to the reader.
const TIERS: BudgetTier[] = [
  {
    id: "starting",
    label: "Just Starting",
    range: "$15-19/mo",
    blurb: "You're on spreadsheets and want the one system everything else will eventually plug into, without adding real spend yet.",
    lines: [
      { juncture: "Core ATS/CRM", tool: "Manatal Professional", price: "$15-19/mo", chapter: 9 },
      { juncture: "Sourcing", tool: "Juicebox, free tier", price: "$0", chapter: 5 },
      { juncture: "Business development", tool: "Claude + manual search", price: "$0", chapter: 4 },
      { juncture: "Interview intelligence", tool: "Metaview, free tier", price: "$0", chapter: 7 },
      { juncture: "Reference checks", tool: "Manual", price: "$0", chapter: 8 },
    ],
  },
  {
    id: "lean",
    label: "Lean",
    range: "$185-260/mo",
    blurb: "The budget tier from Chapter 2: a full juncture-by-juncture stack for a single-recruiter desk, still under the cost of a fraction of one placement fee.",
    lines: [
      { juncture: "Core ATS/CRM", tool: "Manatal Professional", price: "$15-19/mo", chapter: 9 },
      { juncture: "Sourcing", tool: "Pin or Juicebox, entry tier", price: "$99-119/mo", chapter: 5 },
      { juncture: "Interview intelligence", tool: "Metaview, free tier", price: "$0", chapter: 7 },
      { juncture: "Reference checks", tool: "Xref, entry pricing", price: "~$70/mo", chapter: 8 },
      { juncture: "Business development", tool: "Claude + manual search", price: "$0", chapter: 4 },
    ],
  },
  {
    id: "growing",
    label: "Growing",
    range: "$530-620/mo",
    blurb: "Sourcing or screening has become the visible bottleneck and it's time to move past the entry tier: the Chapter 2 mid-tier stack.",
    lines: [
      { juncture: "Core ATS/CRM", tool: "Recruit CRM Pro or Crelate Business", price: "$95-119/mo", chapter: 9 },
      { juncture: "Sourcing", tool: "Pin Professional or SeekOut Recruit Core", price: "$149-179/mo", chapter: 5 },
      { juncture: "Screening", tool: "Hirevire Professional", price: "$99/mo", chapter: 6 },
      { juncture: "Reference checks", tool: "Xref Growth", price: "$140/mo", chapter: 8 },
      { juncture: "Business development", tool: "Apollo", price: "$49-79/mo", chapter: 4 },
    ],
  },
  {
    id: "scaling",
    label: "Scaling",
    range: "$1,100-1,400/mo",
    blurb: "Multiple recruiters, real applicant volume, and a client base that expects a documented, defensible process at every juncture.",
    lines: [
      { juncture: "Core ATS/CRM", tool: "Loxo Professional", price: "$199/seat/mo", chapter: 9 },
      { juncture: "Sourcing", tool: "hireEZ or SeekOut, upper tier", price: "~$350/mo", chapter: 5 },
      { juncture: "Screening", tool: "Hirevire Agency", price: "$199/mo", chapter: 6 },
      { juncture: "Reference + background", tool: "Xref Plus + Checkr Complete", price: "~$385/mo", chapter: 8 },
      { juncture: "Business development", tool: "Apollo Professional", price: "$79-119/mo", chapter: 4 },
    ],
  },
];

const StackBuilder = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("lean");

  const tier = TIERS.find((t) => t.id === selected) ?? TIERS[1];

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Wallet className="h-5 w-5" />
          <p className="font-heading text-sm font-bold uppercase tracking-widest">Build Your Stack</p>
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Pick a monthly budget. Every price below is the same figure used throughout this guide, just
          assembled into one recommended combo instead of leaving that to you.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TIERS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`rounded-xl border px-3 py-3 text-center transition-colors ${
                selected === t.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <div className="font-heading text-xs font-bold">{t.label}</div>
              <div className="mt-1 text-[11px]">{t.range}</div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">{tier.blurb}</p>

            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              {tier.lines.map((line, i) => (
                <button
                  key={line.juncture}
                  onClick={() => navigate(`/chapter/${line.chapter}`)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-secondary/60 ${
                    i !== tier.lines.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
                      {line.juncture}
                    </div>
                    <div className="mt-0.5 font-medium text-foreground">{line.tool}</div>
                  </div>
                  <div className="shrink-0 font-heading text-sm font-bold text-primary">{line.price}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Estimated total
              </span>
              <span className="font-heading text-lg font-bold text-foreground">{tier.range}</span>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Tap any row to jump to that juncture's chapter: tool selection, pricing detail, and the pilot
              walkthrough all live there. This combo is a starting point, not a purchase order: pilot each juncture
              per Chapter 12 before you commit to anything.
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => navigate("/chapter/2")}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/70"
        >
          See the full pricing breakdown in Chapter 2
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default StackBuilder;

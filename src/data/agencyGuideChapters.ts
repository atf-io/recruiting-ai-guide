export interface ChapterMeta {
  index: number;
  part: string;
  title: string;
  subtitle?: string;
  free: boolean;
  bodyHtml: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  tagline: string;
  freeChapterLimit: number;
}

export const book: Book = {
  id: "agency-ai-adoption",
  title: "AI Adoption for Recruiting Agencies",
  subtitle: "Where to Add AI, What It Costs, What It's Worth",
  author: "Alex Franco",
  tagline: "Land More Job Orders. Fill Them Faster. Keep Every Client.",
  freeChapterLimit: 4,
};

export const chapters: ChapterMeta[] = [
  {
    index: 0,
    part: "PART 1 — WHY & WHAT",
    title: "Why AI Adoption Is a Competitive Necessity",
    subtitle: "The Market Has Changed",
    free: true,
    bodyHtml:
      "<p>Every recruiting agency owner already feels it. More competitors, fewer open reqs, and candidates and clients alike expecting a speed of response that a spreadsheet and a phone can't deliver anymore. This isn't a motivation problem. It's a systems problem.</p><div class=\"stat-grid\"><div class=\"stat-card\"><div class=\"num\">50-70%</div><div class=\"label\">of teams that deploy AI outbound tools churn within 3 months from bad rollout, not bad technology</div></div><div class=\"stat-card\"><div class=\"num\">15-25%</div><div class=\"label\">reply rate on signal-based outreach, versus 3-5% on cold lists</div></div><div class=\"stat-card\"><div class=\"num\">2026</div><div class=\"label\">the year agency headcount exploded while open reqs grew \"uncomfortably slow\"</div></div></div><div class=\"callout info\"><div class=\"head\">The pattern that matters</div><p>Every juncture in this guide shares the same shape: a response-speed problem the buyer can already calculate the cost of.</p></div><h3>What this guide covers</h3><p>Eight junctures across the full agency workflow. At each: what to evaluate, real tools with current pricing, expected value backed by evidence, and a step-by-step pilot walkthrough.</p>",
  },
  {
    index: 1,
    part: "PART 1 — WHY & WHAT",
    title: "What the Data Already Shows",
    subtitle: "Benchmarks, Not Guesses",
    free: true,
    bodyHtml:
      "<p>Before you spend a dollar, here's what's already documented across the industry at each juncture this guide covers.</p><table><tr><th>Juncture</th><th>Documented benchmark</th></tr><tr><td>Business development</td><td>15-25% reply rate on signal-based outreach vs. 3-5% cold</td></tr><tr><td>Sourcing</td><td>Sourcing is recruiters' single largest weekly time category</td></tr><tr><td>Screening</td><td>30-70% reported time-to-hire reduction, wide range driven by volume</td></tr><tr><td>Reference checks</td><td>Turnaround cut from 3-5 working days to roughly 18-24 hours</td></tr><tr><td>Rediscovery</td><td>Zero marginal sourcing cost against a database you already paid to build</td></tr></table><div class=\"callout tip\"><div class=\"head\">Your case study goes here</div><p>Run the Chapter 3 quick start for 4-6 weeks, log your own before/after numbers, and drop them in this slot.</p></div>",
  },
  {
    index: 2,
    part: "PART 1 — WHY & WHAT",
    title: "Pricing & ROI",
    subtitle: "What This Actually Costs",
    free: true,
    bodyHtml:
      "<p>A realistic monthly stack for a boutique agency, built up juncture by juncture, budget tier first.</p><table><tr><th>Juncture</th><th>Budget option</th><th>Monthly cost</th></tr><tr><td>Core ATS/CRM</td><td>Manatal Professional</td><td>$15-19/user</td></tr><tr><td>Sourcing</td><td>Juicebox Starter</td><td>$99-139/seat</td></tr><tr><td>Interview intelligence</td><td>Metaview free tier</td><td>$0</td></tr><tr><td>Reference checks</td><td>Xref, entry pricing</td><td>~$70/mo equivalent</td></tr><tr><td>Business development</td><td>Manual, Claude-assisted</td><td>$0 added software</td></tr></table><div class=\"callout info\"><div class=\"head\">Total cost of ownership</div><p>A lean, single-recruiter stack runs roughly $185-260/month. That's less than the commission on a fraction of one placement.</p></div>",
  },
  {
    index: 3,
    part: "PART 2 — QUICK WIN",
    title: "Day 1 Quick Start",
    subtitle: "Go Live This Week, No Budget Required",
    free: true,
    bodyHtml:
      "<p>Before you evaluate a single paid tool, run this. It costs nothing and tells you which junctures are worth paying to fix.</p><div class=\"steps\"><div class=\"step\"><div class=\"circle\">1</div><div class=\"body\"><b>Pick your hardest open req and your slowest-moving client relationship.</b></div></div><div class=\"step\"><div class=\"circle\">2</div><div class=\"body\"><b>Run a manual signal scan with Claude.</b><span>Search for 10-15 companies with a recent funding round, exec hire, or fresh job posting.</span></div></div><div class=\"step\"><div class=\"circle\">3</div><div class=\"body\"><b>Trial Metaview's free tier on your next 5 interviews.</b></div></div><div class=\"step\"><div class=\"circle\">4</div><div class=\"body\"><b>Search your own ATS for rediscovery candidates on your hardest req.</b></div></div><div class=\"step\"><div class=\"circle\">5</div><div class=\"body\"><b>Log everything.</b><span>This is your baseline for every decision in Part 3.</span></div></div></div>",
  },
  {
    index: 4,
    part: "PART 3 — BUILD",
    title: "Business Development",
    subtitle: "Landing Job Orders",
    free: false,
    bodyHtml:
      "<p>Winning new client companies, before there's a candidate to place.</p><div class=\"stat-grid\"><div class=\"stat-card\"><div class=\"num\">15-25%</div><div class=\"label\">reply rate, signal-driven</div></div><div class=\"stat-card\"><div class=\"num\">3-5%</div><div class=\"label\">reply rate, cold-list</div></div><div class=\"stat-card\"><div class=\"num\">$0</div><div class=\"label\">cost to pilot manually</div></div></div><table><tr><th>Tool</th><th>What it does</th><th>Fit</th></tr><tr><td>Claude / ChatGPT + manual search</td><td>Search signals, draft grounded outreach</td><td>Any agency, no added cost</td></tr><tr><td>Gem</td><td>Outbound sequencing + CRM</td><td>From $135/mo</td></tr><tr><td>Apollo</td><td>Company/contact database with signal lists</td><td>Mid-tier</td></tr></table><h3>How to add it</h3><div class=\"steps\"><div class=\"step\"><div class=\"circle\">1</div><div class=\"body\"><b>Write your ICP down.</b></div></div><div class=\"step\"><div class=\"circle\">2</div><div class=\"body\"><b>Run a 2-week manual pilot before paying for anything.</b></div></div><div class=\"step\"><div class=\"circle\">3</div><div class=\"body\"><b>Track reply rate against your cold-list baseline.</b></div></div><div class=\"step\"><div class=\"circle\">4</div><div class=\"body\"><b>Add a paid tool only once manual volume is the bottleneck.</b></div></div></div>",
  },
  {
    index: 5,
    part: "PART 3 — BUILD",
    title: "Candidate Sourcing",
    subtitle: "Finding Who to Pitch",
    free: false,
    bodyHtml:
      "<p>Finding people who match the open role, especially passive candidates.</p><div class=\"callout info\"><div class=\"head\">Expected value</div><p>Sourcing is the single largest time category in a recruiter's week.</p></div><table><tr><th>Tool</th><th>Best for</th><th>Price</th></tr><tr><td>Juicebox (PeopleGPT)</td><td>Solo recruiters, plain-English search</td><td>Free tier; $139/seat/mo</td></tr><tr><td>hireEZ</td><td>Multi-platform open-web sourcing</td><td>~$169-494/mo</td></tr><tr><td>SeekOut</td><td>Deep technical and cleared-talent sourcing</td><td>~$149/user/mo</td></tr><tr><td>Fetcher</td><td>Hands-off, human-reviewed batches</td><td>$115-379/mo</td></tr></table>",
  },
  {
    index: 6,
    part: "PART 3 — BUILD",
    title: "Screening & Qualification",
    subtitle: "Filtering Before the Call",
    free: false,
    bodyHtml:
      "<p>Filtering applicants before you spend time on a call with each one.</p><div class=\"callout warn\"><div class=\"head\">Most of this category isn't built for you</div><p>Paradox and HireVue are priced for high-volume hourly/retail hiring, not a boutique agency placing 20-40 people a year.</p></div><table><tr><th>Tool</th><th>Best for</th><th>Price</th></tr><tr><td>Manatal</td><td>Budget-conscious agencies</td><td>$15-19/user/mo</td></tr><tr><td>Hirevire</td><td>Async video/audio/text screening</td><td>From $39/mo</td></tr><tr><td>Paradox (Olivia)</td><td>High-volume conversational screening</td><td>Custom, enterprise</td></tr></table>",
  },
  {
    index: 7,
    part: "PART 3 — BUILD",
    title: "Interview Scheduling & Intelligence",
    subtitle: "Coordination and Capture",
    free: false,
    bodyHtml:
      "<p>Coordinating interviews and capturing what happens in them.</p><table><tr><th>Tool</th><th>What it does</th><th>Price</th></tr><tr><td>Metaview</td><td>Records/summarizes interviews into ATS-ready scorecards</td><td>Free with work email</td></tr><tr><td>GoodTime</td><td>Coordinates multi-stakeholder panels automatically</td><td>Quote-based</td></tr></table><div class=\"callout tip\"><div class=\"head\">Easiest win in the whole guide</div><p>Cheap or free tools, minimal workflow change.</p></div>",
  },
  {
    index: 8,
    part: "PART 3 — BUILD",
    title: "Reference & Background Verification",
    subtitle: "Confirming Before You Close",
    free: false,
    bodyHtml:
      "<p>Confirming the candidate is who they say they are, right before the finish line.</p><div class=\"stat-grid\"><div class=\"stat-card\"><div class=\"num\">3-5 days</div><div class=\"label\">manual reference turnaround</div></div><div class=\"stat-card\"><div class=\"num\">18-24 hrs</div><div class=\"label\">automated equivalent</div></div><div class=\"stat-card\"><div class=\"num\">Final stage</div><div class=\"label\">is when a slow process costs you the candidate</div></div></div><table><tr><th>Tool</th><th>What it does</th><th>Notes</th></tr><tr><td>Xref</td><td>Automated reference surveys, fraud flagging</td><td>Entry pricing ~$840/yr</td></tr><tr><td>Checkr</td><td>AI-powered background checks</td><td>From ~$30/report</td></tr></table>",
  },
  {
    index: 9,
    part: "PART 3 — BUILD",
    title: "Core ATS / CRM",
    subtitle: "Your System of Record",
    free: false,
    bodyHtml:
      "<div class=\"callout warn\"><div class=\"head\">The highest-leverage, hardest-to-reverse decision</div><p>Every other juncture ideally writes back into whatever you pick here.</p></div><table><tr><th>Tool</th><th>Best for</th><th>Price</th></tr><tr><td>Manatal</td><td>Lean placement or exec-search agencies</td><td>$15-19/user/mo</td></tr><tr><td>Recruit CRM</td><td>Growing agencies needing deals + placements together</td><td>Not publicly listed</td></tr><tr><td>Loxo</td><td>Sourcing-heavy agencies wanting search + CRM unified</td><td>Custom</td></tr><tr><td>Crelate</td><td>Executive search, agentic AI workflows</td><td>Custom</td></tr></table>",
  },
  {
    index: 10,
    part: "PART 3 — BUILD",
    title: "Pipeline Rediscovery & Nurture",
    subtitle: "Your Database Is a Channel",
    free: false,
    bodyHtml:
      "<p>Reusing candidates you've already sourced instead of starting from zero on every new req.</p><div class=\"callout tip\"><div class=\"head\">Expected value</div><p>Rediscovery turns your database into a channel with zero marginal cost.</p></div><table><tr><th>Tool</th><th>What it does</th></tr><tr><td>hireEZ Rediscovery</td><td>Surfaces previously sourced candidates matching a new req</td></tr><tr><td>Your ATS's native search + Claude</td><td>Manual equivalent</td></tr></table>",
  },
  {
    index: 11,
    part: "PART 3 — BUILD",
    title: "Client Account Management",
    subtitle: "The Retention Layer",
    free: false,
    bodyHtml:
      "<p>Keeping the client relationship alive between job orders, and proving your value with data.</p><div class=\"callout info\"><div class=\"head\">Why this matters more than it looks like</div><p>Winning a new client is expensive. Keeping one who already trusts you is close to free.</p></div>",
  },
  {
    index: 12,
    part: "PART 4 — LAUNCH",
    title: "Rollout Sequencing",
    subtitle: "What Order to Add These In",
    free: false,
    bodyHtml:
      "<p>Don't run all eight junctures at once.</p><div class=\"steps\"><div class=\"step\"><div class=\"circle\">1</div><div class=\"body\"><b>Core ATS/CRM first if you're on spreadsheets.</b></div></div><div class=\"step\"><div class=\"circle\">2</div><div class=\"body\"><b>Sourcing next.</b></div></div><div class=\"step\"><div class=\"circle\">3</div><div class=\"body\"><b>Interview intelligence.</b></div></div><div class=\"step\"><div class=\"circle\">4</div><div class=\"body\"><b>Business development.</b></div></div><div class=\"step\"><div class=\"circle\">5</div><div class=\"body\"><b>Reference checking.</b></div></div><div class=\"step\"><div class=\"circle\">6</div><div class=\"body\"><b>Screening, rediscovery, account management.</b></div></div></div>",
  },
  {
    index: 13,
    part: "PART 4 — LAUNCH",
    title: "How to Evaluate & Pilot Any Tool",
    subtitle: "A Repeatable Checklist",
    free: false,
    bodyHtml:
      "<ul class=\"icon-list\"><li>Pilot against your hardest, not your easiest, use case</li><li>Run 2-4 weeks minimum — a demo is not a trial</li><li>Compare output against what you'd have done manually</li><li>Check the disagreement cases, not just the agreement cases</li><li>Confirm the integration list before you commit</li><li>Never sign annual on the first cycle</li></ul>",
  },
  {
    index: 14,
    part: "PART 4 — LAUNCH",
    title: "Data & Client Confidentiality",
    subtitle: "Before You Feed Anything to an AI Tool",
    free: false,
    bodyHtml:
      "<div class=\"callout warn\"><div class=\"head\">This chapter is informational, not legal advice</div><p>Confirm your specific obligations with counsel.</p></div><ul class=\"icon-list\"><li>Check where a tool stores and processes candidate data</li><li>Disclose AI-assisted screening to candidates where required</li><li>Never paste client-identifying information into a general-purpose AI tool without checking retention policy</li><li>Keep a written scorecard for any AI-assisted screening decision</li></ul>",
  },
  {
    index: 15,
    part: "PART 5 — ADVANCED",
    title: "Building Your Own BD System with Claude",
    subtitle: "Signal, Outreach, Cadence",
    free: false,
    bodyHtml:
      "<div class=\"steps\"><div class=\"step\"><div class=\"circle\">1</div><div class=\"body\"><b>Signal detection.</b></div></div><div class=\"step\"><div class=\"circle\">2</div><div class=\"body\"><b>Outreach generation.</b></div></div><div class=\"step\"><div class=\"circle\">3</div><div class=\"body\"><b>Cadence tracking.</b></div></div></div><div class=\"callout tip\"><div class=\"head\">The part most agencies skip</div><p>BD is the first thing that gets dropped when delivery gets busy.</p></div>",
  },
  {
    index: 16,
    part: "PART 5 — ADVANCED",
    title: "Measuring What Matters",
    subtitle: "KPIs Per Juncture",
    free: false,
    bodyHtml:
      "<table><tr><th>Juncture</th><th>KPI to track</th></tr><tr><td>Business development</td><td>Reply rate, meetings booked, job orders won per week</td></tr><tr><td>Sourcing</td><td>Time to 10-candidate shortlist per req</td></tr><tr><td>Screening</td><td>Agreement rate between AI ranking and final hire</td></tr><tr><td>Scheduling / intelligence</td><td>Hours saved on notes per week</td></tr><tr><td>Reference checks</td><td>Turnaround time in hours</td></tr><tr><td>Rediscovery</td><td>% of placements sourced from existing database</td></tr><tr><td>Account management</td><td>Repeat-client rate, revenue per active client</td></tr></table>",
  },
  {
    index: 17,
    part: "PART 5 — ADVANCED",
    title: "Common Objections & Failure Modes",
    subtitle: "What Goes Wrong and Why",
    free: false,
    bodyHtml:
      "<div class=\"callout warn\"><div class=\"head\">\"Candidates will hate an AI-screened process\"</div><p>Candidates prefer a fast, clear response over a slow human one.</p></div><div class=\"callout warn\"><div class=\"head\">\"This is too expensive for a small agency\"</div><p>A lean stack runs under $300/month.</p></div><div class=\"callout warn\"><div class=\"head\">\"Clients won't trust AI-screened candidates\"</div><p>They will if you can explain the scorecard behind it.</p></div><div class=\"callout warn\"><div class=\"head\">The real failure mode: adding everything at once</div><p>50-70% of teams that deploy AI outbound tools churn within 3 months.</p></div>",
  },
  {
    index: 18,
    part: "APPENDIX",
    title: "Tool Directory",
    subtitle: "Every Tool and Price in One Table",
    free: false,
    bodyHtml:
      "<table><tr><th>Juncture</th><th>Tool</th><th>Price</th></tr><tr><td>Business development</td><td>Gem</td><td>From $135/mo</td></tr><tr><td>Business development</td><td>Apollo</td><td>Mid-tier</td></tr><tr><td>Sourcing</td><td>Juicebox</td><td>Free tier; $139/seat/mo</td></tr><tr><td>Sourcing</td><td>hireEZ</td><td>$169-494/mo</td></tr><tr><td>Sourcing</td><td>SeekOut</td><td>$149/user/mo</td></tr><tr><td>Sourcing</td><td>Fetcher</td><td>$115-379/mo</td></tr><tr><td>Screening</td><td>Manatal</td><td>$15-19/user/mo</td></tr><tr><td>Screening</td><td>Hirevire</td><td>From $39/mo</td></tr><tr><td>Screening</td><td>Paradox (Olivia)</td><td>Custom</td></tr><tr><td>Interview intelligence</td><td>Metaview</td><td>Free with work email</td></tr><tr><td>Scheduling</td><td>GoodTime</td><td>Quote-based</td></tr><tr><td>Reference checks</td><td>Xref</td><td>From ~$840/yr</td></tr><tr><td>Reference checks</td><td>Checkr</td><td>From ~$30/report</td></tr><tr><td>ATS/CRM</td><td>Manatal</td><td>$15-19/user/mo</td></tr><tr><td>ATS/CRM</td><td>Recruit CRM</td><td>Not publicly listed</td></tr><tr><td>ATS/CRM</td><td>Loxo</td><td>Custom</td></tr><tr><td>ATS/CRM</td><td>Crelate</td><td>Custom</td></tr><tr><td>Rediscovery</td><td>hireEZ Rediscovery</td><td>Included with hireEZ</td></tr></table>",
  },
  {
    index: 19,
    part: "APPENDIX",
    title: "Glossary",
    subtitle: "Key Terms Explained",
    free: false,
    bodyHtml:
      "<table><tr><th>Term</th><th>Meaning</th></tr><tr><td>ATS</td><td>Applicant Tracking System — manages candidates through a hiring pipeline</td></tr><tr><td>Recruiting CRM</td><td>Tracks client companies, contacts, and the business-development pipeline</td></tr><tr><td>Signal-based sourcing</td><td>Targeting outreach off a real event instead of a static list</td></tr><tr><td>Rediscovery</td><td>Resurfacing previously sourced candidates for a new, different open req</td></tr><tr><td>ICP</td><td>Ideal Client Profile</td></tr><tr><td>Silver medalist</td><td>A strong candidate who didn't get the job but is worth re-engaging later</td></tr><tr><td>Job order</td><td>An open role a client company has authorized the agency to fill</td></tr></table>",
  },
];

export const lastChapter = chapters.length - 1;

/** Groups consecutive chapters by their `part` label, preserving source order. */
export function groupByPart(list: ChapterMeta[] = chapters) {
  const groups: { part: string; items: ChapterMeta[] }[] = [];
  for (const ch of list) {
    const current = groups[groups.length - 1];
    if (current && current.part === ch.part) {
      current.items.push(ch);
    } else {
      groups.push({ part: ch.part, items: [ch] });
    }
  }
  return groups;
}

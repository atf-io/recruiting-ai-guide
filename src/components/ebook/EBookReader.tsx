import { useState, useRef, useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Timer,
  Wrench,
  Rocket,
  TrendingUp,
  Library,
  Lock,
  Download,
  Loader2,
  Mail,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { book, chapters, lastChapter, groupByPart, type ChapterMeta } from "@/data/agencyGuideChapters";
import ChapterBody from "./ChapterBody";
import StackBuilder from "./StackBuilder";

// Commerce + integration config — see .env.example
const CHECKOUT_URL = import.meta.env.VITE_CHECKOUT_URL || "";
const EMAIL_CAPTURE_URL = import.meta.env.VITE_EMAIL_CAPTURE_URL || "";
const PRICE_DISPLAY = import.meta.env.VITE_PRICE_DISPLAY || "";
const PURCHASE_TOKEN = import.meta.env.VITE_PURCHASE_TOKEN || "";
const RIVET_CSR_URL = "https://rivetcsr.com";

// localStorage keys — namespaced separately from the voice-agents book
const PURCHASED_KEY = "rag-purchased";
const EMAIL_KEY = "rag-email";
const CHAPTER_KEY = "rag-current-chapter";

const FREE_CHAPTER_LIMIT = book.freeChapterLimit;

// No checkout link means there's nothing to sell yet — don't lock content
// behind a purchase flow that doesn't exist. Gating switches back on the
// moment VITE_CHECKOUT_URL is set for launch.
const GATING_ENABLED = Boolean(CHECKOUT_URL);

const partIcon: Record<string, React.ReactNode> = {
  "PART 1 — WHY & WHAT": <Sparkles className="h-4 w-4" />,
  "PART 2 — QUICK WIN": <Timer className="h-4 w-4" />,
  "PART 3 — BUILD": <Wrench className="h-4 w-4" />,
  "PART 4 — LAUNCH": <Rocket className="h-4 w-4" />,
  "PART 5 — ADVANCED": <TrendingUp className="h-4 w-4" />,
  APPENDIX: <Library className="h-4 w-4" />,
};

const partGroups = groupByPart(chapters);

const EBookReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const readPurchased = () => typeof window !== "undefined" && localStorage.getItem(PURCHASED_KEY) === "1";
  const isIndexLocked = (index: number, purchased: boolean) =>
    GATING_ENABLED && !purchased && index >= FREE_CHAPTER_LIMIT;

  const getInitialChapter = (): number | null => {
    const purchased = readPurchased();
    if (id !== undefined) {
      const parsed = parseInt(id, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= lastChapter && !isIndexLocked(parsed, purchased)) {
        return parsed;
      }
    }
    const saved = localStorage.getItem(CHAPTER_KEY);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= lastChapter && !isIndexLocked(parsed, purchased)) {
        return parsed;
      }
    }
    return null;
  };

  const [currentChapter, setCurrentChapter] = useState<number | null>(getInitialChapter);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [renderAllForPdf, setRenderAllForPdf] = useState(false);
  const [hasPurchased, setHasPurchased] = useState<boolean>(readPurchased);
  const [showBuyGate, setShowBuyGate] = useState<boolean>(() => {
    if (id === undefined) return false;
    const parsed = parseInt(id, 10);
    return !isNaN(parsed) && parsed >= 0 && parsed <= lastChapter && isIndexLocked(parsed, readPurchased());
  });
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(
    () => typeof window !== "undefined" && !!localStorage.getItem(EMAIL_KEY)
  );
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // On mount: check for ?purchased=TOKEN from the Lemon Squeezy success redirect
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const token = params.get("purchased");
    if (token && PURCHASE_TOKEN && token === PURCHASE_TOKEN) {
      localStorage.setItem(PURCHASED_KEY, "1");
      setHasPurchased(true);
      params.delete("purchased");
      const newSearch = params.toString();
      const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ""}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  // Sync URL with chapter state
  useEffect(() => {
    if (currentChapter !== null) {
      const expectedPath = `/chapter/${currentChapter}`;
      if (window.location.pathname !== expectedPath) {
        navigate(expectedPath, { replace: true });
      }
      localStorage.setItem(CHAPTER_KEY, String(currentChapter));
    } else {
      if (window.location.pathname !== "/") {
        navigate("/", { replace: true });
      }
      localStorage.removeItem(CHAPTER_KEY);
    }
  }, [currentChapter, navigate]);

  // Sync chapter from URL changes (browser back/forward, or a direct link to /chapter/:id)
  useEffect(() => {
    if (id !== undefined) {
      const parsed = parseInt(id, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= lastChapter && parsed !== currentChapter) {
        if (isIndexLocked(parsed, hasPurchased)) {
          setCurrentChapter(null);
          setShowBuyGate(true);
        } else {
          setCurrentChapter(parsed);
        }
      }
    } else if (window.location.pathname === "/" && currentChapter !== null) {
      setCurrentChapter(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, hasPurchased]);

  const isChapterLocked = useCallback(
    (index: number) => GATING_ENABLED && !hasPurchased && index >= FREE_CHAPTER_LIMIT,
    [hasPurchased]
  );

  const openCheckout = useCallback(() => {
    if (!CHECKOUT_URL) {
      toast("Checkout isn't live yet — check back soon.");
      return;
    }
    window.open(CHECKOUT_URL, "_blank", "noopener,noreferrer");
  }, []);

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const email = emailInput.trim();
      if (!email || !email.includes("@")) return;
      setEmailSubmitting(true);
      try {
        if (EMAIL_CAPTURE_URL) {
          const body = new URLSearchParams({ email, source: "recruiting-ai-guide-cover" });
          await fetch(EMAIL_CAPTURE_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
          });
        } else {
          console.warn("VITE_EMAIL_CAPTURE_URL is not configured. Email saved locally only.");
        }
        localStorage.setItem(EMAIL_KEY, email);
        setEmailSubmitted(true);
        setEmailInput("");
      } catch (error) {
        console.error("Email capture failed:", error);
        localStorage.setItem(EMAIL_KEY, email);
        setEmailSubmitted(true);
        setEmailInput("");
      } finally {
        setEmailSubmitting(false);
      }
    },
    [emailInput]
  );

  const handleDownloadPdf = useCallback(async () => {
    if (GATING_ENABLED && !hasPurchased) {
      setShowBuyGate(true);
      return;
    }
    setIsGeneratingPdf(true);
    try {
      flushSync(() => setRenderAllForPdf(true));
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(null))));
      await new Promise((resolve) => setTimeout(resolve, 600));

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const pdfEl = pdfContainerRef.current;
      if (!pdfEl) throw new Error("PDF container not found");

      const images = Array.from(pdfEl.querySelectorAll("img"));
      images.forEach((img) => {
        img.loading = "eager";
        img.decoding = "sync";
      });
      await Promise.all(
        images.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.addEventListener("load", () => resolve(null), { once: true });
                img.addEventListener("error", () => resolve(null), { once: true });
              })
        )
      );

      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const marginX = 12;
      const marginY = 12;
      const contentW = pageW - marginX * 2;
      const contentH = pageH - marginY * 2;
      const scale = 1.5;

      const sections = Array.from(pdfEl.querySelectorAll<HTMLElement>(".pdf-section"));
      let firstPage = true;

      for (const section of sections) {
        const canvas = await html2canvas(section, {
          scale,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          windowWidth: section.offsetWidth,
        });
        if (!canvas.width || !canvas.height) continue;

        const pxPerMm = canvas.width / contentW;
        const sliceHeightPx = Math.floor(contentH * pxPerMm);

        for (let y = 0; y < canvas.height; y += sliceHeightPx) {
          const h = Math.min(sliceHeightPx, canvas.height - y);
          const slice = document.createElement("canvas");
          slice.width = canvas.width;
          slice.height = h;
          const ctx = slice.getContext("2d");
          if (!ctx) continue;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, slice.width, slice.height);
          ctx.drawImage(canvas, 0, y, canvas.width, h, 0, 0, canvas.width, h);

          if (!firstPage) pdf.addPage();
          firstPage = false;
          pdf.addImage(slice.toDataURL("image/jpeg", 0.92), "JPEG", marginX, marginY, contentW, h / pxPerMm);
        }
      }

      pdf.save("AI-Adoption-for-Recruiting-Agencies.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setRenderAllForPdf(false);
      setIsGeneratingPdf(false);
    }
  }, [hasPurchased]);

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToChapter = (index: number) => {
    if (isChapterLocked(index)) {
      setShowBuyGate(true);
      return;
    }
    setCurrentChapter(index);
    setSidebarOpen(false);
    setTimeout(scrollToTop, 100);
  };

  const goToCover = () => {
    setCurrentChapter(null);
    setSidebarOpen(false);
  };

  const currentChapterMeta: ChapterMeta | null = currentChapter !== null ? chapters[currentChapter] : null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-heading text-sm font-bold text-foreground">AI for Agencies</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Table of Contents
            </p>
            <button
              onClick={goToCover}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                currentChapter === null
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              <span className="font-medium">Cover</span>
            </button>

            {partGroups.map((group) => (
              <div key={group.part}>
                <p className="mb-2 mt-4 flex items-center gap-1.5 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {group.part}
                </p>
                {group.items.map((ch) => {
                  const locked = isChapterLocked(ch.index);
                  return (
                    <button
                      key={ch.index}
                      onClick={() => goToChapter(ch.index)}
                      className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        currentChapter === ch.index
                          ? "bg-primary/10 text-primary"
                          : locked
                          ? "text-muted-foreground/50 hover:bg-secondary hover:text-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="shrink-0">{locked ? <Lock className="h-4 w-4" /> : partIcon[group.part]}</span>
                      <span className="line-clamp-2 font-medium">{ch.title}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {isGeneratingPdf ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : GATING_ENABLED && !hasPurchased ? (
                <Lock className="h-3.5 w-3.5" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {isGeneratingPdf
                ? "Generating…"
                : !GATING_ENABLED || hasPurchased
                ? "Download Full PDF"
                : PRICE_DISPLAY
                ? `Get PDF — $${PRICE_DISPLAY}`
                : "Get PDF"}
            </button>
            <p className="text-xs text-muted-foreground">Created by Alex Franco</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main ref={contentRef} className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:bg-secondary lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {currentChapterMeta && (
              <>
                <span className="font-heading font-semibold text-primary">Ch. {currentChapterMeta.index}</span>
                <span>·</span>
                <span className="hidden sm:inline">{currentChapterMeta.title}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => currentChapter !== null && currentChapter > 0 && goToChapter(currentChapter - 1)}
              disabled={currentChapter === null || currentChapter === 0}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => currentChapter !== null && currentChapter < lastChapter && goToChapter(currentChapter + 1)}
              disabled={currentChapter === null || currentChapter >= lastChapter}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentChapterMeta === null ? (
            <motion.div
              key="cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero / Cover */}
              <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[hsl(var(--hero-bg))] px-6 py-24 text-center">
                <div className="relative z-10 max-w-3xl">
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-[hsl(var(--hero-eyebrow))]">
                      For Boutique & Independent Recruiting Agencies
                    </p>
                    <h1 className="mt-4 font-serif text-4xl font-semibold italic leading-tight text-[hsl(var(--hero-foreground))] md:text-5xl lg:text-6xl">
                      {book.title}
                    </h1>
                    <p className="mt-4 text-lg text-[hsl(var(--hero-muted))] md:text-xl">
                      {book.subtitle} — by {book.author}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-8 flex flex-wrap justify-center gap-2"
                  >
                    {["Contingent Placement", "Retained Search", "Embedded / Fractional Recruiting"].map((s) => (
                      <span key={s} className="rounded-full border border-[hsl(var(--hero-muted))]/30 bg-white/5 px-4 py-1.5 text-xs font-medium text-[hsl(var(--hero-muted))]">
                        {s}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-8 rounded-xl border border-primary/40 bg-white/5 px-6 py-4"
                  >
                    <p className="font-heading text-sm font-bold text-primary md:text-base">{book.tagline}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-8 flex flex-wrap justify-center gap-3"
                  >
                    {hasPurchased ? (
                      <button
                        onClick={() => goToChapter(0)}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-heading text-sm font-bold text-primary-foreground transition-all hover:scale-105 ebook-glow"
                      >
                        Start Reading
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={openCheckout}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-heading text-sm font-bold text-primary-foreground transition-all hover:scale-105 ebook-glow"
                      >
                        {PRICE_DISPLAY ? `Get the Guide for $${PRICE_DISPLAY}` : "Get the Guide"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => goToChapter(0)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--hero-muted))]/30 bg-white/5 px-6 py-3.5 font-heading text-sm font-bold text-[hsl(var(--hero-foreground))] transition-all hover:bg-white/10"
                    >
                      <BookOpen className="h-4 w-4" />
                      Read {FREE_CHAPTER_LIMIT} Chapters Free
                    </button>
                  </motion.div>
                  {!hasPurchased && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="mt-4 text-xs text-[hsl(var(--hero-muted))]"
                    >
                      One-time payment · Instant access · {chapters.length} chapters · PDF included
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Interactive budget-based stack recommender */}
              <div className="mt-4">
                <StackBuilder />
              </div>

              {/* Contents, grouped by part */}
              <div className="mx-auto max-w-3xl px-6 pb-20 mt-16">
                <p className="mb-2 text-center font-heading text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  Contents
                </p>
                <h2 className="mb-12 text-center font-serif text-3xl font-semibold italic text-foreground">
                  What's Inside
                </h2>

                {partGroups.map((group) => (
                  <div key={group.part} className="mb-12 last:mb-0">
                    <h3 className="mb-4 flex items-center gap-2 font-serif text-lg italic text-primary">
                      {partIcon[group.part]}
                      {group.part.replace(/^PART \d+ — /, "")}
                    </h3>
                    <div className="border-t border-border">
                      {group.items.map((ch) => {
                        const locked = isChapterLocked(ch.index);
                        return (
                          <motion.button
                            key={ch.index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            onClick={() => goToChapter(ch.index)}
                            className="group flex w-full items-baseline gap-4 border-b border-border py-4 text-left transition-colors hover:bg-secondary/30"
                          >
                            <span className="w-9 shrink-0 font-serif text-lg text-muted-foreground/50">
                              {ch.index === 0 ? "—" : String(ch.index).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-2 font-serif text-base text-foreground group-hover:text-primary">
                                {ch.title}
                                {locked && <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                              </span>
                              {ch.subtitle && (
                                <span className="mt-0.5 block text-xs text-muted-foreground">{ch.subtitle}</span>
                              )}
                            </span>
                            <ChevronRight className="h-4 w-4 shrink-0 self-center text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Email signup — soft, optional, separate from the Buy gate */}
                {!emailSubmitted && !hasPurchased && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto mt-16 max-w-xl"
                  >
                    <div className="rounded-2xl border border-border bg-card p-6">
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <Mail className="h-5 w-5" />
                        <p className="font-heading text-sm font-bold uppercase tracking-widest">Free Updates</p>
                      </div>
                      <p className="mt-3 text-center text-sm text-muted-foreground">
                        Drop your email for new chapters and tool updates. No spam — unsubscribe anytime.
                      </p>
                      <form onSubmit={handleEmailSubmit} className="mt-4 flex gap-2">
                        <input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="you@agency.com"
                          required
                          disabled={emailSubmitting}
                          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
                        />
                        <button
                          type="submit"
                          disabled={emailSubmitting}
                          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                        >
                          {emailSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
                {emailSubmitted && !hasPurchased && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto mt-16 max-w-xl text-center"
                  >
                    <p className="text-sm text-muted-foreground">Thanks — you're on the list.</p>
                  </motion.div>
                )}

                {/* About the Author */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mx-auto mt-16 max-w-2xl pb-8"
                >
                  <div className="rounded-2xl border border-border bg-card p-8">
                    <p className="text-center font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      About the Author
                    </p>
                    <h3 className="mt-3 text-center font-serif text-2xl font-semibold italic text-foreground">Alex Franco</h3>
                    <p className="mt-4 text-center text-sm text-muted-foreground leading-relaxed">
                      Alex builds AI-assisted workflows for service businesses, including recruiting agencies
                      evaluating where automation actually pays for itself. This guide distills that evaluation
                      process — juncture by juncture, with real pricing — into one resource.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        href={RIVET_CSR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        More from Alex — Rivet CSR
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`chapter-${currentChapter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-3xl px-6 py-12 lg:px-8"
            >
              <ChapterBody chapter={currentChapterMeta} />

              <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
                <button
                  onClick={() => currentChapter! > 0 && goToChapter(currentChapter! - 1)}
                  disabled={currentChapter === 0}
                  className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <span className="text-xs text-muted-foreground">
                  {currentChapter! + 1} / {chapters.length}
                </span>
                <button
                  onClick={() => currentChapter! < lastChapter && goToChapter(currentChapter! + 1)}
                  disabled={currentChapter! >= lastChapter}
                  className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Buy gate modal — shown when a free user hits a locked chapter or tries to download the PDF */}
      <AnimatePresence>
        {showBuyGate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowBuyGate(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl"
            >
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-foreground">Unlock the Full Guide</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  You've been reading the free preview. The remaining {chapters.length - FREE_CHAPTER_LIMIT} chapters —
                  every juncture's tools, pricing, and rollout steps, plus the downloadable PDF — are part of the paid
                  guide.
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
                {PRICE_DISPLAY ? (
                  <p className="font-heading text-3xl font-bold text-foreground">${PRICE_DISPLAY}</p>
                ) : (
                  <p className="font-heading text-lg font-bold text-foreground">Price coming soon</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">One-time payment · Lifetime access · PDF included</p>
              </div>
              <button
                onClick={openCheckout}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ArrowRight className="h-4 w-4" />
                Get the Guide
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Or{" "}
                <a href={RIVET_CSR_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  see what else Alex builds
                </a>
              </p>
              <button
                onClick={() => setShowBuyGate(false)}
                className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden container for PDF generation — renders all chapters at once */}
      {renderAllForPdf && (
        <div
          ref={pdfContainerRef}
          style={{
            position: "fixed",
            left: "-9999px",
            top: 0,
            width: "800px",
            background: "white",
            color: "#1a1a1a",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: "1.6",
            padding: "40px",
          }}
        >
          <style>{`
            .pdf-export-root * {
              opacity: 1 !important;
              transform: none !important;
              animation: none !important;
              transition: none !important;
              filter: none !important;
              visibility: visible !important;
              color: #1a1a1a;
              background-image: none !important;
              box-shadow: none !important;
              max-height: none !important;
            }
            .pdf-export-root img { max-width: 100% !important; height: auto !important; }
            .pdf-export-root pre, .pdf-export-root code {
              white-space: pre-wrap !important;
              word-break: break-word !important;
              background: #f4f4f5 !important;
              color: #18181b !important;
            }
            .pdf-export-root table {
              width: 100% !important;
              border-collapse: collapse !important;
              margin: 16px 0 !important;
            }
            .pdf-export-root th, .pdf-export-root td {
              border: 1px solid #d4d4d8 !important;
              padding: 8px 10px !important;
              text-align: left !important;
              font-size: 12px !important;
            }
            .pdf-export-root th {
              background: #f4f4f5 !important;
              font-weight: 700 !important;
              text-transform: uppercase !important;
              font-size: 10px !important;
              letter-spacing: 0.05em !important;
            }
            .pdf-export-root .stat-grid {
              display: flex !important;
              gap: 12px !important;
              margin: 16px 0 !important;
            }
            .pdf-export-root .stat-card {
              flex: 1 !important;
              border: 1px solid #d4d4d8 !important;
              border-radius: 8px !important;
              padding: 12px !important;
              text-align: center !important;
            }
            .pdf-export-root .stat-card .num {
              font-size: 18px !important;
              font-weight: 800 !important;
              color: #2563eb !important;
            }
            .pdf-export-root .stat-card .label {
              font-size: 10px !important;
              color: #52525b !important;
              margin-top: 4px !important;
            }
            .pdf-export-root .callout {
              border: 1px solid #d4d4d8 !important;
              border-radius: 8px !important;
              padding: 12px 16px !important;
              margin: 16px 0 !important;
              background: #fafafa !important;
            }
            .pdf-export-root .callout .head {
              font-weight: 700 !important;
              font-size: 11px !important;
              text-transform: uppercase !important;
              letter-spacing: 0.05em !important;
              margin-bottom: 4px !important;
              color: #18181b !important;
            }
            .pdf-export-root .steps { margin: 16px 0 !important; }
            .pdf-export-root .step {
              display: flex !important;
              gap: 10px !important;
              margin-bottom: 10px !important;
              align-items: flex-start !important;
            }
            .pdf-export-root .step .circle {
              flex-shrink: 0 !important;
              width: 22px !important;
              height: 22px !important;
              border-radius: 999px !important;
              background: #dbeafe !important;
              color: #1d4ed8 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              font-size: 11px !important;
              font-weight: 700 !important;
            }
            .pdf-export-root .icon-list { list-style: none !important; padding-left: 0 !important; margin: 16px 0 !important; }
            .pdf-export-root .icon-list li { margin-bottom: 6px !important; font-size: 13px !important; }
            .pdf-export-root .icon-list li:before { content: "→ " !important; color: #2563eb !important; font-weight: 700 !important; }
          `}</style>

          {/* Title page */}
          <div style={{ textAlign: "center", padding: "120px 40px 80px" }} className="pdf-page-break pdf-section">
            <p style={{ fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase", color: "#666", marginBottom: "16px" }}>
              For Boutique & Independent Recruiting Agencies
            </p>
            <h1 style={{ fontSize: "36px", fontWeight: 800, margin: 0, color: "#1a1a1a" }}>{book.title}</h1>
            <p style={{ fontSize: "16px", color: "#666", marginTop: "12px" }}>
              {book.subtitle} — by {book.author}
            </p>
            <hr style={{ margin: "40px auto", width: "60px", border: "none", borderTop: "3px solid #3b82f6" }} />
            <p style={{ fontSize: "13px", color: "#999" }}>{book.tagline}</p>
          </div>

          {/* Table of contents */}
          <div className="pdf-page-break pdf-section" style={{ padding: "20px 0" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px", color: "#1a1a1a" }}>Table of Contents</h2>
            {partGroups.map((group) => (
              <div key={group.part}>
                <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#3b82f6", margin: "16px 0 8px" }}>
                  {group.part}
                </p>
                {group.items.map((ch) => (
                  <p key={ch.index} style={{ fontSize: "13px", color: "#333", margin: "4px 0", paddingLeft: "12px" }}>
                    <strong style={{ color: "#111" }}>Chapter {ch.index}.</strong> {ch.title}
                    {ch.subtitle ? <span style={{ color: "#777" }}> — {ch.subtitle}</span> : null}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* All chapters, in full */}
          <div className="pdf-export-root">
            {chapters.map((ch) => (
              <div key={ch.index} className="pdf-page-break pdf-section" style={{ padding: "20px 0" }}>
                <ChapterBody chapter={ch} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EBookReader;

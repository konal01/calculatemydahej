"use client";
import { useState, lazy, Suspense } from "react";
import FloatingPetals from "@/components/FloatingPetals";

const GroomCalculator = lazy(() => import("@/components/GroomCalculator"));
const BrideCalculator = lazy(() => import("@/components/BrideCalculator"));

const STATS = [
  { num: "8,000+", label: "Dowry deaths per year in India", icon: "💔" },
  { num: "₹0", label: "Legal value of dowry (it's illegal!)", icon: "⚖️" },
  { num: "1961", label: "Year Dowry Prohibition Act passed", icon: "📜" },
  { num: "98%", label: "Cases go unpunished", icon: "😔" },
];

const FACTS = [
  "The Dowry Prohibition Act (1961) makes giving or taking dowry a criminal offence, punishable by 5 years imprisonment and ₹15,000 fine.",
  "Despite being illegal for over 60 years, an estimated 2 million dowry cases occur every year across India.",
  "Dark-skinned brides are disproportionately targeted for higher dowry demands — a reflection of deep-rooted colorism in Indian society.",
  "Women who are employed and educated are statistically less likely to be subjected to extreme dowry demands.",
  "The National Crime Records Bureau (NCRB) reports over 6,000–8,000 dowry-related deaths annually — roughly one every hour.",
  "Section 498A IPC (1983) criminalises cruelty by husband or in-laws, including dowry harassment.",
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");
  const [factIdx, setFactIdx] = useState(0);

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      {/* Ambient background */}
      <div className="mandala-bg" />
      <FloatingPetals />

      {/* ── Header ── */}
      <header className="relative z-10 text-center pt-12 pb-6 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-medium tracking-widest uppercase"
          style={{ background: "rgba(128,0,32,0.4)", border: "1px solid rgba(212,160,23,0.3)", color: "#F0C040" }}>
          🪷 Satire for Social Awareness 🪷
        </div>

        <h1 className="fancy-heading gold-gradient-text" style={{ fontSize: "clamp(2.4rem, 8vw, 5rem)", lineHeight: 1.05 }}>
          Calculate My Dahej
        </h1>

        <p className="mt-2 text-lg" style={{ fontFamily: "'Dancing Script', cursive", color: "#D4A017", fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}>
          — कलयुग का दहेज़ कैलकुलेटर —
        </p>

        <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed" style={{ color: "rgba(255,248,231,0.65)", fontFamily: "'Noto Sans', sans-serif" }}>
          A <strong style={{ color: "#F0C040" }}>satirical</strong> calculator that exposes the absurdity of India's dowry
          system by calculating dahej based on the same ridiculous parameters society uses —
          skin tone, job, salary, looks. <br />
          <span style={{ color: "#FF9933" }}>Because numbers make the insanity undeniable.</span>
        </p>

        {/* CTA awareness */}
        <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl text-sm"
          style={{ background: "rgba(255,102,0,0.12)", border: "1px solid rgba(255,102,0,0.3)", color: "#FFB47A" }}>
          <span className="text-lg">🚨</span>
          <span><strong>Dahej Pratha is ILLEGAL.</strong> Section 2 of Dowry Prohibition Act, 1961.</span>
        </div>
      </header>

      {/* ── Stats Bar ── */}
      <section className="relative z-10 px-4 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <div key={i} className="glass-card text-center p-4">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="fancy-heading text-xl gold-text">{s.num}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,248,231,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Calculator Tabs ── */}
      <section className="relative z-10 px-4 pb-12 max-w-4xl mx-auto">
        {/* Tab selector */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setActiveTab("groom")}
            className={`btn-secondary flex items-center gap-2 text-base py-3 px-6 ${activeTab === "groom" ? "active" : ""}`}
          >
            <span>🤵</span> Groom's Dahej
          </button>
          <button
            onClick={() => setActiveTab("bride")}
            className={`btn-secondary flex items-center gap-2 text-base py-3 px-6 ${activeTab === "bride" ? "active" : ""}`}
          >
            <span>👰</span> Bride's Dahej
          </button>
        </div>

        {/* Tab description */}
        <div className="text-center mb-6 text-sm" style={{ color: "rgba(255,248,231,0.5)" }}>
          {activeTab === "groom" ? (
            <p>Enter the groom's details — the more "prestigious" he is, the more dahej he'll demand. 💰</p>
          ) : (
            <p>Enter the bride's details — society will "penalise" her for things beyond her control. 😔</p>
          )}
        </div>

        {/* Calculator card */}
        <div className="glass-card p-6 md:p-8">
          <Suspense fallback={<div className="text-center py-8 text-yellow-400">Loading calculator...</div>}>
            {activeTab === "groom" ? (
              <div className="tab-content" key="groom">
                <GroomCalculator />
              </div>
            ) : (
              <div className="tab-content" key="bride">
                <BrideCalculator />
              </div>
            )}
          </Suspense>
        </div>
      </section>

      {/* ── Facts Carousel ── */}
      <section className="relative z-10 px-4 pb-12 max-w-3xl mx-auto">
        <div className="ornament mb-6">
          <h2 className="fancy-heading text-xl text-center px-4" style={{ color: "#F0C040" }}>
            📖 Did You Know?
          </h2>
        </div>

        <div className="glass-card p-6 text-center min-h-[100px] flex flex-col items-center justify-center gap-4">
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,248,231,0.8)" }}>
            "{FACTS[factIdx]}"
          </p>
          <div className="flex gap-2 mt-2">
            {FACTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setFactIdx(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ background: i === factIdx ? "#D4A017" : "rgba(212,160,23,0.3)" }}
              />
            ))}
          </div>
          <button
            onClick={() => setFactIdx((prev) => (prev + 1) % FACTS.length)}
            className="btn-secondary text-sm py-1.5 px-4"
          >
            Next Fact →
          </button>
        </div>
      </section>

      {/* ── Share the Awareness ── */}
      <section className="relative z-10 px-4 pb-12 max-w-3xl mx-auto">
        <div className="glass-card p-6 text-center space-y-4"
          style={{ background: "rgba(128,0,32,0.25)", border: "1px solid rgba(212,160,23,0.3)" }}>
          <h2 className="fancy-heading text-2xl gold-text">
            🛑 End Dahej. Start Now.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,248,231,0.65)" }}>
            Share this calculator with friends and family to start conversations about how absurd and harmful the
            dowry system is. Education and awareness are the first steps to change.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/?text=Check%20out%20this%20eye-opening%20Dahej%20Calculator%20that%20exposes%20the%20absurdity%20of%20dowry%20in%20India!%20%F0%9F%92%94%20https://calculatemydahej.com`}
              target="_blank" rel="noopener noreferrer"
              className="btn-secondary text-sm flex items-center gap-2"
            >
              💬 Share on WhatsApp
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Dahej%20is%20illegal,%20but%20still%20rampant.%20This%20satirical%20calculator%20exposes%20the%20absurdity%20%F0%9F%92%94%20%23EndDowry%20%23DahejMuktBharat"
              target="_blank" rel="noopener noreferrer"
              className="btn-secondary text-sm flex items-center gap-2"
            >
              🐦 Share on Twitter
            </a>
          </div>
          <div className="pt-2 space-y-1 text-xs" style={{ color: "rgba(255,248,231,0.4)" }}>
            <p>📞 Dowry Harassment Helpline: <strong style={{ color: "#F0C040" }}>181</strong></p>
            <p>🔗 National Commission for Women: <strong style={{ color: "#F0C040" }}>ncw.nic.in</strong></p>
            <p>⚖️ Dahej Prohibition Act, 1961 | Section 498A IPC | Section 304B IPC</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 text-center py-8 px-4"
        style={{ borderTop: "1px solid rgba(212,160,23,0.15)", color: "rgba(255,248,231,0.3)", fontSize: "0.78rem" }}>
        <p className="mb-1">
          🪷 Made with 💔 to spread awareness about Dowry — <strong style={{ color: "#D4A017" }}>calculatemydahej.com</strong>
        </p>
        <p>
          All calculations are satirical & fictional. We do not endorse or promote the dowry system in any way.
          Dahej is illegal under Indian law.
        </p>
        <p className="mt-2" style={{ color: "#D4A017" }}>
          #EndDowry #DahejMuktBharat #BetiBachaoBetiPadhao
        </p>
      </footer>
    </main>
  );
}

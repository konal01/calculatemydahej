"use client";
import { useState, lazy, Suspense } from "react";
import FloatingPetals from "@/components/FloatingPetals";

const GroomCalculator = lazy(() => import("@/components/GroomCalculator"));
const BrideCalculator = lazy(() => import("@/components/BrideCalculator"));

/* ── Indian monuments silhouette SVG ────────────────────── */
function SilhouetteSVG() {
  return (
    <svg
      viewBox="0 0 1440 160"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
      style={{ display: "block", width: "100%", height: "160px" }}
      aria-hidden="true"
    >
      {/* Sky dots (birds) */}
      <ellipse cx="700" cy="22" rx="4" ry="2" fill="rgba(255,255,255,0.35)" />
      <ellipse cx="720" cy="16" rx="3" ry="1.5" fill="rgba(255,255,255,0.28)" />
      <ellipse cx="740" cy="20" rx="4" ry="2" fill="rgba(255,255,255,0.28)" />

      {/* Sun */}
      <circle cx="710" cy="32" r="22" fill="rgba(255,220,100,0.28)" />
      <circle cx="710" cy="32" r="14" fill="rgba(255,200,60,0.32)" />

      {/* ── Ground ─────────────────────────────────────────── */}
      {/* Taj Mahal dome (center) */}
      <ellipse cx="720" cy="82" rx="28" ry="30" fill="rgba(255,255,255,0.22)" />
      <rect x="692" y="82" width="56" height="55" fill="rgba(255,255,255,0.22)" />
      {/* Taj minarets */}
      <rect x="670" y="96" width="9" height="41" rx="2" fill="rgba(255,255,255,0.22)" />
      <ellipse cx="674.5" cy="96" rx="5" ry="6" fill="rgba(255,255,255,0.22)" />
      <rect x="761" y="96" width="9" height="41" rx="2" fill="rgba(255,255,255,0.22)" />
      <ellipse cx="765.5" cy="96" rx="5" ry="6" fill="rgba(255,255,255,0.22)" />

      {/* Gate of India (left-center) */}
      <rect x="540" y="100" width="68" height="57" rx="2" fill="rgba(255,255,255,0.18)" />
      <path d="M554 100 Q574 76 594 100" fill="rgba(255,255,255,0.18)" />
      <rect x="558" y="110" width="16" height="47" fill="rgba(255,200,80,0.12)" />
      <rect x="520" y="112" width="20" height="45" rx="2" fill="rgba(255,255,255,0.16)" />
      <rect x="608" y="112" width="20" height="45" rx="2" fill="rgba(255,255,255,0.16)" />

      {/* Qutub Minar (far left) */}
      <rect x="380" y="68" width="18" height="89" rx="4" fill="rgba(255,255,255,0.2)" />
      <ellipse cx="389" cy="68" rx="10" ry="6" fill="rgba(255,255,255,0.22)" />
      <rect x="375" y="88" width="28" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="375" y="108" width="28" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="375" y="128" width="28" height="3" rx="1" fill="rgba(255,255,255,0.2)" />

      {/* Charminar (right side) */}
      <rect x="920" y="90" width="60" height="67" rx="2" fill="rgba(255,255,255,0.18)" />
      <path d="M930 90 Q950 74 970 90" fill="rgba(255,255,255,0.18)" />
      <rect x="915" y="102" width="14" height="55" rx="3" fill="rgba(255,255,255,0.18)" />
      <rect x="971" y="102" width="14" height="55" rx="3" fill="rgba(255,255,255,0.18)" />
      <ellipse cx="922" cy="102" rx="7" ry="8" fill="rgba(255,255,255,0.18)" />
      <ellipse cx="978" cy="102" rx="7" ry="8" fill="rgba(255,255,255,0.18)" />

      {/* Hawa Mahal style (far right) */}
      <rect x="1060" y="88" width="80" height="69" fill="rgba(255,255,255,0.16)" />
      {[1060,1074,1088,1102,1116].map((x,i)=>(
        <path key={i} d={`M${x} 88 Q${x+7} 76 ${x+14} 88`} fill="rgba(255,255,255,0.18)" />
      ))}

      {/* Palm trees (left) */}
      <rect x="440" y="120" width="5" height="37" rx="2" fill="rgba(255,255,255,0.2)" />
      <ellipse cx="442" cy="118" rx="18" ry="9" fill="rgba(255,255,255,0.18)" />
      <rect x="460" y="128" width="4" height="29" rx="2" fill="rgba(255,255,255,0.18)" />
      <ellipse cx="462" cy="126" rx="14" ry="7" fill="rgba(255,255,255,0.16)" />

      {/* Palm trees (right) */}
      <rect x="1000" y="118" width="5" height="39" rx="2" fill="rgba(255,255,255,0.2)" />
      <ellipse cx="1002" cy="116" rx="18" ry="9" fill="rgba(255,255,255,0.18)" />

      {/* Ground base */}
      <path
        d="M0,148 Q360,130 720,148 Q1080,165 1440,148 L1440,160 L0,160 Z"
        fill="var(--cream)"
      />
    </svg>
  );
}

/* ── Stats ───────────────────────────────────────────────── */
const STATS = [
  { num: "8,000+", label: "Dowry deaths per year", icon: "💔" },
  { num: "₹0",    label: "Legal value of dowry",  icon: "⚖️" },
  { num: "1961",  label: "Prohibition Act passed", icon: "📜" },
  { num: "98%",   label: "Cases go unpunished",   icon: "😔" },
];

/* ── Facts ───────────────────────────────────────────────── */
const FACTS = [
  "The Dowry Prohibition Act (1961) makes giving or taking dowry a criminal offence — punishable by 5 years imprisonment and ₹15,000 fine.",
  "Despite being illegal for over 60 years, an estimated 2 million dowry cases occur every year across India.",
  "Dark-skinned brides are disproportionately targeted for higher dowry demands — reflecting deep colorism in Indian society.",
  "Women who are employed and educated are statistically less likely to face extreme dowry demands.",
  "The NCRB reports 6,000–8,000 dowry-related deaths annually — roughly one every hour.",
  "Section 498A IPC (1983) criminalises cruelty by a husband or in-laws, including dowry harassment.",
];

export default function HomePage() {
  const [tab, setTab] = useState<"groom" | "bride">("groom");
  const [factIdx, setFactIdx] = useState(0);

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <FloatingPetals />

      {/* ── Top announcement bar ── */}
      <div
        style={{
          background: "var(--ink)",
          color: "rgba(255,248,236,0.65)",
          textAlign: "center",
          padding: "9px 20px",
          fontSize: "0.78rem",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.02em",
        }}
      >
        👨‍💻 View my other projects →{" "}
        <a
          href="https://konal.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--marigold-light)",
            fontWeight: 600,
            textDecoration: "none",
            borderBottom: "1px solid rgba(245,200,80,0.4)",
            paddingBottom: "1px",
            transition: "color 0.2s, border-color 0.2s",
          }}
        >
          konal.in
        </a>
      </div>

      {/* ════════════════════════════════════════════
          HERO — saffron gradient
      ═══════════════════════════════════════════════ */}
      <section className="hero-bg" style={{ paddingTop: "52px" }}>
        {/* Pill badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "22px" }}>
          <span
            className="label-caps"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "6px 18px",
              borderRadius: "50px",
            }}
          >
            🪷 Satire for Social Awareness 🪷
          </span>
        </div>

        {/* Main heading */}
        <div style={{ textAlign: "center", padding: "0 20px" }}>
          <h1
            className="heading-display"
            style={{
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              color: "#fff",
              textShadow: "0 2px 24px rgba(100,30,0,0.25)",
            }}
          >
            Calculate My Dahej
          </h1>

          <p
            className="hindi-script"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              color: "rgba(255,255,255,0.82)",
              marginTop: "8px",
              letterSpacing: "0.04em",
            }}
          >
            — कलयुग का दहेज़ कैलकुलेटर —
          </p>

          <p
            style={{
              maxWidth: "560px",
              margin: "18px auto 0",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.78)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            A <strong style={{ color: "#FFF5CC" }}>satirical</strong> calculator that exposes the absurdity
            of India's dowry system — using the same ridiculous metrics society uses. Numbers make the
            insanity undeniable.
          </p>

          {/* Legal pill */}
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
            <span
              style={{
                background: "rgba(61,28,14,0.35)",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "#FFE8CC",
                padding: "8px 20px",
                borderRadius: "50px",
                fontSize: "0.82rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              🚨 Dahej Pratha is <strong>ILLEGAL</strong> — Dowry Prohibition Act, 1961
            </span>
          </div>
        </div>

        {/* Silhouette */}
        <div style={{ marginTop: "36px", position: "relative", zIndex: 1 }}>
          <SilhouetteSVG />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--saffron)",
          padding: "28px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }}
          className="stats-grid"
        >
          {STATS.map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>{s.icon}</div>
              <div
                className="heading-sub"
                style={{ fontSize: "1.6rem", color: "#fff", lineHeight: 1 }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.75)",
                  marginTop: "4px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CALCULATOR
      ═══════════════════════════════════════════════ */}
      <section className="content-section" style={{ padding: "56px 20px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          {/* Section label */}
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <span className="label-caps text-saffron">Try the Calculator</span>
          </div>

          <h2
            className="heading-display text-gradient-warm"
            style={{ fontSize: "clamp(2rem,5vw,3rem)", textAlign: "center", marginBottom: "6px" }}
          >
            How Much is a Person Worth?
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--ink-muted)",
              fontSize: "0.95rem",
              marginBottom: "36px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            (Spoiler: Infinitely more than any number below.)
          </p>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "28px",
            }}
          >
            <button
              onClick={() => setTab("groom")}
              className={`btn-tab ${tab === "groom" ? "active" : ""}`}
            >
              🤵 Groom's Dahej
            </button>
            <button
              onClick={() => setTab("bride")}
              className={`btn-tab ${tab === "bride" ? "active" : ""}`}
            >
              👰 Bride's Dahej
            </button>
          </div>

          {/* Tab description */}
          <p
            style={{
              textAlign: "center",
              color: "var(--ink-muted)",
              fontSize: "0.875rem",
              marginBottom: "24px",
              minHeight: "22px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {tab === "groom"
              ? "The more 'prestigious' he is, the more dahej society says he deserves. 💰"
              : "Society 'penalises' her for things entirely beyond her control. 😔"}
          </p>

          {/* Calculator card */}
          <div className="card" style={{ padding: "32px 36px" }}>
            <Suspense
              fallback={
                <div style={{ textAlign: "center", padding: "40px", color: "var(--ink-muted)" }}>
                  Loading…
                </div>
              }
            >
              {tab === "groom" ? (
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
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FACTS
      ═══════════════════════════════════════════════ */}
      <section style={{ background: "var(--cream-dark)", padding: "52px 20px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div className="ornament" style={{ marginBottom: "32px" }}>
            <h2
              className="heading-sub"
              style={{
                fontSize: "1.5rem",
                color: "var(--ink)",
                textAlign: "center",
                padding: "0 16px",
                whiteSpace: "nowrap",
              }}
            >
              📖 Did You Know?
            </h2>
          </div>

          <div
            className="card"
            style={{
              padding: "32px 36px",
              textAlign: "center",
              minHeight: "130px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "var(--ink-light)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              &ldquo;{FACTS[factIdx]}&rdquo;
            </p>

            {/* Dots */}
            <div style={{ display: "flex", gap: "6px" }}>
              {FACTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFactIdx(i)}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    background: i === factIdx ? "var(--saffron)" : "var(--cream-deeper)",
                    transition: "background 0.2s, transform 0.2s",
                    transform: i === factIdx ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <button
              className="btn-ghost"
              onClick={() => setFactIdx((p) => (p + 1) % FACTS.length)}
            >
              Next Fact →
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA — End Dahej
      ═══════════════════════════════════════════════ */}
      <section style={{ background: "var(--cream)", padding: "52px 20px" }}>
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            background: "linear-gradient(135deg, var(--saffron-dark), var(--terracotta))",
            borderRadius: "24px",
            padding: "44px 40px",
            textAlign: "center",
            color: "#fff",
            boxShadow: "0 8px 40px rgba(180,60,20,0.3)",
          }}
        >
          <p className="label-caps" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "10px" }}>
            Take Action
          </p>
          <h2
            className="heading-display"
            style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: "14px" }}
          >
            End Dahej. Start Now.
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.78)",
              maxWidth: "480px",
              margin: "0 auto 28px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Share this calculator to start conversations about how absurd and harmful the dowry system
            truly is. Awareness is the first step to change.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/?text=Check%20out%20this%20eye-opening%20Dahej%20Calculator!%20https://calculatemydahej.com`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
                padding: "11px 24px",
                borderRadius: "50px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                transition: "background 0.2s",
              }}
            >
              💬 Share on WhatsApp
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Dahej%20is%20illegal%2C%20but%20still%20rampant.%20This%20satirical%20calculator%20exposes%20the%20absurdity%20%F0%9F%92%94%20%23EndDowry"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
                padding: "11px 24px",
                borderRadius: "50px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              🐦 Share on Twitter
            </a>
          </div>

          <div
            style={{
              marginTop: "28px",
              paddingTop: "22px",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              justifyContent: "center",
              gap: "28px",
              flexWrap: "wrap",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.65)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span>📞 Helpline: <strong style={{ color: "#FFE8CC" }}>181</strong></span>
            <span>🔗 <strong style={{ color: "#FFE8CC" }}>ncw.nic.in</strong></span>
            <span>⚖️ Section 498A IPC</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer
        style={{
          background: "var(--ink)",
          color: "rgba(255,248,236,0.45)",
          textAlign: "center",
          padding: "28px 20px",
          fontSize: "0.78rem",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.8,
        }}
      >
        <p>
          🪷 Made to spread awareness about Dowry —{" "}
          <strong style={{ color: "var(--marigold)" }}>calculatemydahej.com</strong>
        </p>
        <p style={{ marginTop: "4px" }}>
          All calculations are satirical & fictional. Dahej is illegal under Indian law.
        </p>
        <p style={{ marginTop: "6px", color: "var(--saffron-light)" }}>
          #EndDowry · #DahejMuktBharat · #BetiBachaoBetiPadhao
        </p>
      </footer>

      {/* Mobile responsive grid fix */}
      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .card { padding: 22px 18px !important; }
        }
      `}</style>
    </main>
  );
}

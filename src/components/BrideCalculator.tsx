"use client";
import { useState, useCallback } from "react";
import { formatINR, formatBrideResult } from "@/lib/calculator";
import type { BrideInputs, BrideResult } from "@/lib/calculator";

const SKIN_TONES = [
  { label: "Very Fair", value: "very_fair", color: "#F5D5B0", desc: "−50% (Advantage!)" },
  { label: "Fair",      value: "fair",      color: "#E8B88A", desc: "−28%" },
  { label: "Wheatish",  value: "wheatish",  color: "#C68642", desc: "Baseline" },
  { label: "Dusky",     value: "dusky",     color: "#8D5524", desc: "+40% more!" },
  { label: "Dark",      value: "dark",      color: "#4A2912", desc: "+90% more!" },
];

const BEAUTY_LABELS = [
  "Plain", "Below avg", "Average", "Okay", "Pretty",
  "Beautiful", "Gorgeous", "Stunning", "Radiant", "Divine ✨",
];

export default function BrideCalculator() {
  const [inp, setInp] = useState<BrideInputs>({
    skinTone: "wheatish", education: "graduate", beauty: 5,
    height: 160, age: 24, familySalary: 10, sisters: 0,
    employed: false, urban: false,
  });
  const [result, setResult] = useState<BrideResult | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof BrideInputs, v: unknown) => setInp((p) => ({ ...p, [k]: v }));

  const calculate = useCallback(async () => {
    setBusy(true); setResult(null);
    await new Promise((r) => setTimeout(r, 800));
    setResult(formatBrideResult(inp));
    setBusy(false);
  }, [inp]);

  const skin = SKIN_TONES.find((s) => s.value === inp.skinTone);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      {/* Awareness strip */}
      <div className="awareness-card">
        <strong style={{ color: "#FFE4A0" }}>⚠️ Satire for Awareness:</strong> This reflects the
        shameful reality women face in Indian matrimonial society — judged by skin tone, looks, and
        family wealth.{" "}
        <strong style={{ color: "#FFE4A0" }}>Every woman is priceless. Dahej Pratha is a crime.</strong>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

          {/* Skin Tone */}
          <div>
            <label className="field-label">
              🎨 Skin Tone —{" "}
              <span style={{ color: inp.skinTone === "dark" || inp.skinTone === "dusky" ? "#B84218" : "var(--saffron)" }}>
                {skin?.label}
              </span>
              <span style={{ fontWeight: 400, marginLeft: 6, color: "var(--ink-muted)", textTransform: "none", letterSpacing: 0 }}>
                ({skin?.desc})
              </span>
            </label>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-end", flexWrap: "wrap" }}>
              {SKIN_TONES.map((s) => (
                <div key={s.value} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                  <div
                    className={`skin-swatch ${inp.skinTone === s.value ? "selected" : ""}`}
                    style={{ background: s.color }}
                    onClick={() => set("skinTone", s.value)}
                  />
                  <span style={{ fontSize: "0.62rem", color: "var(--ink-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                    {s.label.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
            {inp.skinTone === "dark" && (
              <p style={{ fontSize: "0.75rem", color: "#B84218", marginTop: "7px", background: "rgba(184,66,24,0.08)", padding: "8px 12px", borderRadius: "8px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                😔 Society unfairly demands MORE dahej from dark-skinned brides. This is racist & wrong.
              </p>
            )}
          </div>

          {/* Beauty */}
          <div>
            <label className="field-label">
              💄 Conventional Beauty —{" "}
              <span style={{ color: "var(--saffron)" }}>{BEAUTY_LABELS[Math.round(inp.beauty)]}</span>
            </label>
            <input type="range" min={0} max={9} step={1} value={inp.beauty}
              onChange={(e) => set("beauty", +e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "5px" }}>
              <span>Plain</span><span>Divine ✨</span>
            </div>
            <p style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "4px", fontFamily: "'DM Sans', sans-serif" }}>
              * More beautiful = family gives LESS dahej (society's logic)
            </p>
          </div>

          {/* Age */}
          <div>
            <label className="field-label">
              🎂 Age —{" "}
              <span style={{ color: inp.age > 27 ? "#B84218" : "var(--saffron)" }}>
                {inp.age} yrs{inp.age > 27 ? " ⬆ pressure" : ""}
              </span>
            </label>
            <input type="range" min={18} max={40} step={1} value={inp.age}
              onChange={(e) => set("age", +e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "5px" }}>
              <span>18</span><span>40</span>
            </div>
          </div>

          {/* Sisters */}
          <div>
            <label className="field-label">
              👭 Number of Sisters —{" "}
              <span style={{ color: "var(--saffron)" }}>{inp.sisters}</span>
            </label>
            <input type="range" min={0} max={5} step={1} value={inp.sisters}
              onChange={(e) => set("sisters", +e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "5px" }}>
              <span>0</span><span>5+</span>
            </div>
            {inp.sisters >= 3 && (
              <p style={{ fontSize: "0.75rem", color: "#B84218", marginTop: "5px", fontFamily: "'DM Sans', sans-serif" }}>
                ⚠️ More sisters = more dahej demanded per girl (by society's twisted logic)
              </p>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

          {/* Education */}
          <div>
            <label className="field-label">🎓 Education</label>
            <select value={inp.education} onChange={(e) => set("education", e.target.value)}>
              <option value="10th">10th Pass</option>
              <option value="12th">12th Pass</option>
              <option value="graduate">Graduate</option>
              <option value="engineer">Engineer</option>
              <option value="doctor">Doctor</option>
              <option value="mba">MBA / Masters</option>
              <option value="phd">PhD / Highly Qualified</option>
            </select>
            <p style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "5px", fontFamily: "'DM Sans', sans-serif" }}>
              * Higher education → LESS dowry expected
            </p>
          </div>

          {/* Height */}
          <div>
            <label className="field-label">
              📏 Height — <span style={{ color: "var(--saffron)" }}>{inp.height}cm</span>
            </label>
            <input type="range" min={145} max={180} step={1} value={inp.height}
              onChange={(e) => set("height", +e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "5px" }}>
              <span>4&apos;9&quot;</span><span>5&apos;11&quot;</span>
            </div>
          </div>

          {/* Family Income */}
          <div>
            <label className="field-label">
              💰 Family Annual Income — <span style={{ color: "var(--saffron)" }}>₹{inp.familySalary}L/yr</span>
            </label>
            <input type="range" min={2} max={80} step={1} value={inp.familySalary}
              onChange={(e) => set("familySalary", +e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "5px" }}>
              <span>₹2L</span><span>₹80L</span>
            </div>
          </div>

          {/* Toggles */}
          <div>
            <label className="field-label">🌟 Additional Factors</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {([
                { k: "employed", label: "👩‍💼 Bride is Employed",  sub: "Self-earning = less dowry" },
                { k: "urban",    label: "🏙️ Urban Family",         sub: "City family = more financial pressure" },
              ] as { k: keyof BrideInputs; label: string; sub: string }[]).map(({ k, label, sub }) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    className={`toggle-track ${inp[k] ? "on" : ""}`}
                    onClick={() => set(k, !inp[k])}
                  >
                    <div className="toggle-thumb" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, fontFamily: "'DM Sans', sans-serif", color: "var(--ink)" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--ink-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                      {sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calculate */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "4px" }}>
        <button className="btn-primary" onClick={calculate} disabled={busy}>
          {busy
            ? <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Calculating…</>
            : "🧮 Calculate Dahej"}
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {result && <BrideResultCard result={result} />}
    </div>
  );
}

function BrideResultCard({ result }: { result: BrideResult }) {
  return (
    <div className="result-reveal" style={{ borderTop: "1px solid var(--cream-deeper)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>

      <div style={{ textAlign: "center" }}>
        <p className="field-label" style={{ marginBottom: "6px" }}>Bride's Family Must Give</p>
        <h3 className="heading-display text-gradient-warm" style={{ fontSize: "clamp(2.4rem,6vw,3.6rem)", lineHeight: 1 }}>
          {formatINR(result.total)}
        </h3>
        {result.extras.length > 0 && (
          <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>
            + {result.extras.join(" · ")}
          </p>
        )}
      </div>

      <div style={{ background: "var(--cream)", borderRadius: "12px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <p className="field-label" style={{ marginBottom: "2px" }}>Breakdown</p>
        {result.breakdown.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
            <span style={{ color: "var(--ink-muted)" }}>{item.label}</span>
            <span style={{ fontWeight: 600, color: item.impact === "positive" ? "#B84218" : "#4A8C3F" }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="awareness-card" style={{ textAlign: "center" }}>
        🛑 <strong>Reminder:</strong> {result.awareneessMsg}
      </div>

      <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--ink-muted)", fontFamily: "'DM Sans', sans-serif" }}>
        Section 498A IPC — Dowry harassment is a cognizable, non-bailable offence.
      </p>
    </div>
  );
}

"use client";
import { useState, useCallback } from "react";
import { formatINR, formatResult } from "@/lib/calculator";
import type { GroomInputs, GroomResult } from "@/lib/calculator";

const SKIN_TONES = [
  { label: "Very Fair", value: "very_fair", color: "#F5D5B0", desc: "+25%" },
  { label: "Fair",      value: "fair",      color: "#E8B88A", desc: "+12%" },
  { label: "Wheatish",  value: "wheatish",  color: "#C68642", desc: "base" },
  { label: "Dusky",     value: "dusky",     color: "#8D5524", desc: "−10%" },
  { label: "Dark",      value: "dark",      color: "#4A2912", desc: "−22%" },
];

const HEIGHT_MAP: Record<number, string> = {
  150:"4'11\"",155:"5'1\"",160:"5'3\"",165:"5'5\"",170:"5'7\"",175:"5'9\"",180:"5'11\"",185:"6'1\"",190:"6'3\"",195:"6'5\"",
};
const nearestHeight = (h: number) => HEIGHT_MAP[Math.round(h / 5) * 5] ?? `${h}cm`;

export default function GroomCalculator() {
  const [inp, setInp] = useState<GroomInputs>({
    salary: 12, jobType: "private", height: 175, skinTone: "wheatish",
    education: "engineer", familyStatus: "middle",
    ownsCar: false, ownsHome: false, abroad: false,
  });
  const [result, setResult] = useState<GroomResult | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof GroomInputs, v: unknown) => setInp((p) => ({ ...p, [k]: v }));

  const calculate = useCallback(async () => {
    setBusy(true); setResult(null);
    await new Promise((r) => setTimeout(r, 800));
    setResult(formatResult(inp) as GroomResult);
    setBusy(false);
  }, [inp]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

      {/* Awareness strip */}
      <div className="awareness-card">
        <strong style={{ color: "#FFE4A0" }}>⚠️ Satire for Awareness:</strong> These calculations
        are fictional and highlight the absurdity of valuing a person with money & goods.{" "}
        <strong style={{ color: "#FFE4A0" }}>Dahej Pratha is illegal & immoral.</strong>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

          {/* Salary */}
          <div>
            <label className="field-label">
              💼 Annual Salary —{" "}
              <span style={{ color: "var(--saffron)", fontVariantNumeric: "tabular-nums" }}>
                ₹{inp.salary} LPA
              </span>
            </label>
            <input type="range" min={1} max={100} step={1} value={inp.salary}
              onChange={(e) => set("salary", +e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "5px" }}>
              <span>₹1 LPA</span><span>₹100 LPA</span>
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="field-label">🏛️ Job Type</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[
                { v: "govt",    l: "🏛️ Sarkari Naukri" },
                { v: "psu",     l: "🔩 PSU / Bank" },
                { v: "private", l: "💻 Private" },
                { v: "business",l: "📊 Business" },
              ].map(({ v, l }) => (
                <button
                  key={v}
                  onClick={() => set("jobType", v)}
                  className={`btn-ghost ${inp.jobType === v ? "active" : ""}`}
                  style={{ fontSize: "0.8rem", padding: "9px 12px", textAlign: "left" }}
                >
                  {l}
                </button>
              ))}
            </div>
            {inp.jobType === "govt" && (
              <p style={{ fontSize: "0.75rem", color: "var(--saffron)", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>
                🎯 Sarkari naukri = maximum dahej unlocked!
              </p>
            )}
          </div>

          {/* Height */}
          <div>
            <label className="field-label">
              📏 Height —{" "}
              <span style={{ color: "var(--saffron)" }}>{inp.height}cm ({nearestHeight(inp.height)})</span>
            </label>
            <input type="range" min={150} max={195} step={1} value={inp.height}
              onChange={(e) => set("height", +e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "5px" }}>
              <span>4&apos;11&quot;</span><span>6&apos;5&quot;</span>
            </div>
          </div>

          {/* Skin Tone */}
          <div>
            <label className="field-label">
              🎨 Skin Tone —{" "}
              <span style={{ color: "var(--saffron)" }}>
                {SKIN_TONES.find((s) => s.value === inp.skinTone)?.label}
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
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

          {/* Education */}
          <div>
            <label className="field-label">🎓 Education</label>
            <select value={inp.education} onChange={(e) => set("education", e.target.value)}>
              <option value="12th">12th Pass</option>
              <option value="graduate">Graduate (BA / BCom / BSc)</option>
              <option value="engineer">Engineer (BTech / BE)</option>
              <option value="doctor">Doctor (MBBS / MD)</option>
              <option value="mba">MBA / Masters</option>
              <option value="phd">PhD / IIT / IIM</option>
            </select>
          </div>

          {/* Family Status */}
          <div>
            <label className="field-label">🏠 Family Status</label>
            <select value={inp.familyStatus} onChange={(e) => set("familyStatus", e.target.value)}>
              <option value="lower">Lower Middle Class</option>
              <option value="middle">Middle Class</option>
              <option value="upper_middle">Upper Middle Class</option>
              <option value="rich">Rich / Business Family</option>
              <option value="elite">Elite / Crorepati</option>
            </select>
          </div>

          {/* Bonus Assets */}
          <div>
            <label className="field-label">🌟 Bonus Assets</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {([
                { k: "ownsCar",  label: "🚗 Owns a Car",          sub: "Adds ₹3–8L to demand" },
                { k: "ownsHome", label: "🏠 Owns Property / Home", sub: "Adds ₹10–25L to demand" },
                { k: "abroad",   label: "✈️ NRI / Works Abroad",   sub: "3× multiplier!" },
              ] as { k: keyof GroomInputs; label: string; sub: string }[]).map(({ k, label, sub }) => (
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

      {/* Calculate button */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "4px" }}>
        <button className="btn-primary" onClick={calculate} disabled={busy}>
          {busy
            ? <><span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Calculating…</>
            : "🧮 Calculate Dahej"}
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {result && <GroomResult result={result} />}
    </div>
  );
}

function GroomResult({ result }: { result: GroomResult }) {
  return (
    <div className="result-reveal" style={{ borderTop: "1px solid var(--cream-deeper)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Amount */}
      <div style={{ textAlign: "center" }}>
        <p className="field-label" style={{ marginBottom: "6px" }}>Estimated Dahej Demand</p>
        <h3 className="heading-display text-gradient-warm" style={{ fontSize: "clamp(2.4rem,6vw,3.6rem)", lineHeight: 1 }}>
          {formatINR(result.total)}
        </h3>
        {result.extras.length > 0 && (
          <p style={{ fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>
            + {result.extras.join(" · ")}
          </p>
        )}
      </div>

      {/* Breakdown */}
      <div style={{ background: "var(--cream)", borderRadius: "12px", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <p className="field-label" style={{ marginBottom: "2px" }}>Breakdown</p>
        {result.breakdown.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
            <span style={{ color: "var(--ink-muted)" }}>{item.label}</span>
            <span style={{ fontWeight: 600, color: "var(--saffron-dark)" }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Awareness */}
      <div className="awareness-card" style={{ textAlign: "center" }}>
        🚨 <strong>Remember:</strong> {result.awareneessMsg}
      </div>

      <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--ink-muted)", fontFamily: "'DM Sans', sans-serif" }}>
        Dahej Prohibition Act, 1961 — Giving or taking dowry is punishable under IPC.
      </p>
    </div>
  );
}

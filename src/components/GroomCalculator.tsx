"use client";
import { useState, useCallback } from "react";
import { formatINR, formatResult } from "@/lib/calculator";
import type { GroomInputs, GroomResult } from "@/lib/calculator";

const SKIN_TONES_GROOM = [
  { label: "Very Fair", value: "very_fair", color: "#F5D5B0", bonus: 1.25, desc: "+25% bonus" },
  { label: "Fair", value: "fair", color: "#E8B88A", bonus: 1.12, desc: "+12% bonus" },
  { label: "Wheatish", value: "wheatish", color: "#C68642", bonus: 1.0, desc: "neutral" },
  { label: "Dusky", value: "dusky", color: "#8D5524", bonus: 0.9, desc: "-10% penalty" },
  { label: "Dark", value: "dark", color: "#4A2912", bonus: 0.78, desc: "-22% penalty" },
];

const HEIGHT_LABELS: Record<number, string> = {
  155: "5'1\"", 160: "5'3\"", 165: "5'5\"", 170: "5'7\"",
  175: "5'9\"", 180: "5'11\"", 185: "6'1\"", 190: "6'3\"",
};

export default function GroomCalculator() {
  const [inputs, setInputs] = useState<GroomInputs>({
    salary: 5,
    jobType: "private",
    height: 170,
    skinTone: "wheatish",
    education: "graduate",
    familyStatus: "middle",
    ownsCar: false,
    ownsHome: false,
    abroad: false,
  });

  const [result, setResult] = useState<GroomResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = useCallback(async () => {
    setIsCalculating(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 900));
    const res = formatResult(inputs);
    setResult(res as GroomResult);
    setIsCalculating(false);
  }, [inputs]);

  const set = (key: keyof GroomInputs, val: unknown) =>
    setInputs((prev) => ({ ...prev, [key]: val }));

  const selectedSkin = SKIN_TONES_GROOM.find((s) => s.value === inputs.skinTone);

  return (
    <div className="space-y-6">
      {/* Awareness Banner */}
      <div className="awareness-banner">
        <span className="text-yellow-300 font-semibold">⚠️ Satire for Awareness:</span> This calculator
        reflects the absurd logic of dowry system in India. These calculations are fictional and exist to highlight
        how ridiculous it is to value a human being with money & goods.{" "}
        <strong className="text-yellow-200">Dahej Pratha is illegal & immoral.</strong>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              💼 Monthly Salary: <span className="text-white">₹{inputs.salary} LPA</span>
            </label>
            <input
              type="range" min={1} max={100} step={1}
              value={inputs.salary}
              onChange={(e) => set("salary", Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "rgba(255,248,231,0.4)" }}>
              <span>₹1 LPA</span><span>₹100 LPA</span>
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              🏛️ Job Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "govt", label: "🏛️ Sarkari Naukri" },
                { value: "psu", label: "🔩 PSU / Bank" },
                { value: "private", label: "💻 Private" },
                { value: "business", label: "📊 Business" },
              ].map((j) => (
                <button
                  key={j.value}
                  onClick={() => set("jobType", j.value)}
                  className={`btn-secondary text-sm py-2 px-3 ${inputs.jobType === j.value ? "active" : ""}`}
                >
                  {j.label}
                </button>
              ))}
            </div>
            {inputs.jobType === "govt" && (
              <p className="text-xs mt-1.5" style={{ color: "#F0C040" }}>
                🎯 Jackpot! Sarkari naukri = maximum dahej unlock
              </p>
            )}
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              📏 Height:{" "}
              <span className="text-white">
                {inputs.height}cm ({HEIGHT_LABELS[Math.round(inputs.height / 5) * 5] ?? `${Math.round(inputs.height / 2.54 / 12)}'`})
              </span>
            </label>
            <input
              type="range" min={150} max={195} step={1}
              value={inputs.height}
              onChange={(e) => set("height", Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "rgba(255,248,231,0.4)" }}>
              <span>5'0"</span><span>6'5"</span>
            </div>
          </div>

          {/* Skin Tone */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              🎨 Skin Tone:{" "}
              <span className="text-white">{selectedSkin?.label}</span>
              <span className="ml-2 text-xs" style={{ color: inputs.skinTone === "dark" || inputs.skinTone === "dusky" ? "#FF6B6B" : "#90EE90" }}>
                ({selectedSkin?.desc})
              </span>
            </label>
            <div className="flex gap-3 flex-wrap">
              {SKIN_TONES_GROOM.map((s) => (
                <div key={s.value} className="flex flex-col items-center gap-1">
                  <div
                    className={`skin-swatch ${inputs.skinTone === s.value ? "selected" : ""}`}
                    style={{ background: s.color }}
                    onClick={() => set("skinTone", s.value)}
                  />
                  <span className="text-xs" style={{ color: "rgba(255,248,231,0.5)" }}>{s.label.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Education */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              🎓 Education
            </label>
            <select value={inputs.education} onChange={(e) => set("education", e.target.value)}>
              <option value="12th">12th Pass</option>
              <option value="graduate">Graduate (BA/BCom/BSc)</option>
              <option value="engineer">Engineer (BTech/BE)</option>
              <option value="doctor">Doctor (MBBS/MD)</option>
              <option value="mba">MBA / Masters</option>
              <option value="phd">PhD / IIT / IIM</option>
            </select>
          </div>

          {/* Family Status */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              🏠 Family Status
            </label>
            <select value={inputs.familyStatus} onChange={(e) => set("familyStatus", e.target.value)}>
              <option value="lower">Lower Middle Class</option>
              <option value="middle">Middle Class</option>
              <option value="upper_middle">Upper Middle Class</option>
              <option value="rich">Rich / Business Family</option>
              <option value="elite">Elite / Crorepati</option>
            </select>
          </div>

          {/* Bonus Assets */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#F0C040" }}>
              🌟 Bonus Assets
            </label>
            <div className="space-y-3">
              {[
                { key: "ownsCar", label: "🚗 Owns a Car", desc: "Add ₹3–8L to demands" },
                { key: "ownsHome", label: "🏠 Owns Property/Home", desc: "Add ₹10–25L to demands" },
                { key: "abroad", label: "✈️ NRI / Works Abroad", desc: "3× multiplier!" },
              ].map(({ key, label, desc }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                      inputs[key as keyof GroomInputs] ? "bg-gradient-to-r from-red-800 to-yellow-600" : "bg-gray-800"
                    }`}
                    onClick={() => set(key as keyof GroomInputs, !inputs[key as keyof GroomInputs])}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                        inputs[key as keyof GroomInputs] ? "left-6" : "left-0.5"
                      }`}
                    />
                  </div>
                  <div>
                    <span className="font-medium text-sm">{label}</span>
                    <p className="text-xs" style={{ color: "rgba(255,248,231,0.45)" }}>{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="flex justify-center pt-2">
        <button onClick={calculate} className="btn-primary relative overflow-hidden" disabled={isCalculating}>
          {isCalculating ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              Kundli Match ho raha hai...
            </span>
          ) : (
            "🧮 Calculate Dahej →"
          )}
        </button>
      </div>

      {/* Result */}
      {result && <GroomResult result={result} />}
    </div>
  );
}

function GroomResult({ result }: { result: GroomResult }) {
  return (
    <div className="result-reveal glass-card p-6 mt-4 space-y-4" style={{ border: "1px solid rgba(212,160,23,0.4)" }}>
      <div className="text-center">
        <p className="text-sm mb-1" style={{ color: "rgba(255,248,231,0.6)" }}>Estimated Dahej Demand</p>
        <h3
          className="fancy-heading gold-gradient-text"
          style={{ fontSize: "2.8rem", lineHeight: 1 }}
        >
          {formatINR(result.total)}
        </h3>
        <p className="text-sm mt-1" style={{ color: "rgba(255,248,231,0.5)" }}>
          + {result.extras.join(" + ")}
        </p>
      </div>

      <div className="ornament">
        <span className="text-xs" style={{ color: "#D4A017" }}>✦ Breakdown ✦</span>
      </div>

      <div className="space-y-2">
        {result.breakdown.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span style={{ color: "rgba(255,248,231,0.7)" }}>{item.label}</span>
            <span style={{ color: "#F0C040", fontWeight: 600 }}>{item.value}</span>
          </div>
        ))}
      </div>

      <div className="awareness-banner text-center" style={{ fontSize: "0.8rem" }}>
        🚨 <strong>Remember:</strong> This is satire. {result.awareneessMsg}
      </div>

      <div className="text-center text-xs" style={{ color: "rgba(255,248,231,0.35)" }}>
        Dahej Prohibition Act, 1961 — Giving or taking dowry is a criminal offence punishable under IPC.
      </div>
    </div>
  );
}

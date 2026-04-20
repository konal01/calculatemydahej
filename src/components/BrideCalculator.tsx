"use client";
import { useState, useCallback } from "react";
import { formatINR, formatBrideResult } from "@/lib/calculator";
import type { BrideInputs, BrideResult } from "@/lib/calculator";

const SKIN_TONES_BRIDE = [
  { label: "Very Fair", value: "very_fair", color: "#F5D5B0", multiplier: 0.5, desc: "-50% (Advantage!)" },
  { label: "Fair", value: "fair", color: "#E8B88A", multiplier: 0.72, desc: "-28%" },
  { label: "Wheatish", value: "wheatish", color: "#C68642", multiplier: 1.0, desc: "baseline" },
  { label: "Dusky", value: "dusky", color: "#8D5524", multiplier: 1.4, desc: "+40% more!" },
  { label: "Dark", value: "dark", color: "#4A2912", multiplier: 1.9, desc: "+90% more!!!" },
];

export default function BrideCalculator() {
  const [inputs, setInputs] = useState<BrideInputs>({
    skinTone: "wheatish",
    education: "graduate",
    beauty: 5,
    height: 160,
    age: 24,
    familySalary: 10,
    sisters: 0,
    employed: false,
    urban: false,
  });

  const [result, setResult] = useState<BrideResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = useCallback(async () => {
    setIsCalculating(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 900));
    const res = formatBrideResult(inputs);
    setResult(res);
    setIsCalculating(false);
  }, [inputs]);

  const set = (key: keyof BrideInputs, val: unknown) =>
    setInputs((prev) => ({ ...prev, [key]: val }));

  const selectedSkin = SKIN_TONES_BRIDE.find((s) => s.value === inputs.skinTone);
  const beautyLabels = ["👹 Ugly", "😕 Plain", "😐 Average", "🙂 Okay", "😊 Pretty", "😍 Beautiful", "🌹 Gorgeous", "✨ Stunning", "💫 Radiant", "👑 Divine"];

  return (
    <div className="space-y-6">
      {/* Awareness Banner */}
      <div className="awareness-banner">
        <span className="text-yellow-300 font-semibold">⚠️ Satire for Awareness:</span> This reflects the
        shameful reality women face in Indian matrimonial society — judged by skin tone, looks, and family
        wealth.{" "}
        <strong className="text-yellow-200">
          Every woman is priceless. Dahej Pratha is a crime.
        </strong>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Skin Tone */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              🎨 Skin Tone:{" "}
              <span className="text-white">{selectedSkin?.label}</span>
              <span
                className="ml-2 text-xs"
                style={{ color: selectedSkin && selectedSkin.multiplier > 1 ? "#FF6B6B" : "#90EE90" }}
              >
                ({selectedSkin?.desc})
              </span>
            </label>
            <div className="flex gap-3 flex-wrap">
              {SKIN_TONES_BRIDE.map((s) => (
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
            {inputs.skinTone === "dark" && (
              <p className="text-xs mt-2 p-2 rounded-lg" style={{ background: "rgba(255,50,50,0.15)", color: "#FF9999" }}>
                😔 Society unfairly demands more dowry from dark-skinned brides. This is RACIST & WRONG.
              </p>
            )}
          </div>

          {/* Beauty */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              💄 "Conventional Beauty":{" "}
              <span className="text-white">{beautyLabels[Math.round(inputs.beauty)]}</span>
            </label>
            <input
              type="range" min={0} max={9} step={1}
              value={inputs.beauty}
              onChange={(e) => set("beauty", Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "rgba(255,248,231,0.4)" }}>
              <span>Plain</span><span>Divine ✨</span>
            </div>
            <p className="text-xs mt-1" style={{ color: "rgba(255,248,231,0.4)" }}>
              * More beautiful = family has to give LESS dahej (society's twisted logic)
            </p>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              🎂 Age:{" "}
              <span className="text-white">{inputs.age} years</span>
              {inputs.age > 27 && (
                <span className="ml-2 text-xs" style={{ color: "#FF9999" }}>(⬆️ dahej pressure increases!)</span>
              )}
            </label>
            <input
              type="range" min={18} max={40} step={1}
              value={inputs.age}
              onChange={(e) => set("age", Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "rgba(255,248,231,0.4)" }}>
              <span>18</span><span>40</span>
            </div>
          </div>

          {/* Number of sisters */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              👭 Number of Sisters:{" "}
              <span className="text-white">{inputs.sisters}</span>
            </label>
            <input
              type="range" min={0} max={5} step={1}
              value={inputs.sisters}
              onChange={(e) => set("sisters", Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "rgba(255,248,231,0.4)" }}>
              <span>0</span><span>5+</span>
            </div>
            {inputs.sisters >= 3 && (
              <p className="text-xs mt-1" style={{ color: "#FF6B6B" }}>
                ⚠️ "Beti ki zyada demand" — more sisters = society demands more dahej per girl
              </p>
            )}
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
              <option value="10th">10th Pass</option>
              <option value="12th">12th Pass</option>
              <option value="graduate">Graduate</option>
              <option value="engineer">Engineer</option>
              <option value="doctor">Doctor</option>
              <option value="mba">MBA / Masters</option>
              <option value="phd">PhD / High Qualified</option>
            </select>
            <p className="text-xs mt-1" style={{ color: "rgba(255,248,231,0.4)" }}>
              * Higher education = LESS dowry expected (one small silver lining)
            </p>
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              📏 Height: <span className="text-white">{inputs.height}cm</span>
            </label>
            <input
              type="range" min={145} max={180} step={1}
              value={inputs.height}
              onChange={(e) => set("height", Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "rgba(255,248,231,0.4)" }}>
              <span>4'9"</span><span>5'11"</span>
            </div>
          </div>

          {/* Family Annual Income */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#F0C040" }}>
              💰 Family Annual Income:{" "}
              <span className="text-white">₹{inputs.familySalary}L/yr</span>
            </label>
            <input
              type="range" min={2} max={80} step={1}
              value={inputs.familySalary}
              onChange={(e) => set("familySalary", Number(e.target.value))}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "rgba(255,248,231,0.4)" }}>
              <span>₹2L</span><span>₹80L</span>
            </div>
          </div>

          {/* Toggles */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#F0C040" }}>
              🌟 Additional Factors
            </label>
            <div className="space-y-3">
              {[
                {
                  key: "employed",
                  label: "👩‍💼 Bride is Employed",
                  desc: "Self-earning = family gives less dowry",
                },
                {
                  key: "urban",
                  label: "🏙️ Urban Family",
                  desc: "City family = more financial pressure",
                },
              ].map(({ key, label, desc }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                      inputs[key as keyof BrideInputs] ? "bg-gradient-to-r from-red-800 to-yellow-600" : "bg-gray-800"
                    }`}
                    onClick={() => set(key as keyof BrideInputs, !inputs[key as keyof BrideInputs])}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
                        inputs[key as keyof BrideInputs] ? "left-6" : "left-0.5"
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
        <button onClick={calculate} className="btn-primary" disabled={isCalculating}>
          {isCalculating ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              Calculating shame...
            </span>
          ) : (
            "🧮 Calculate Dahej →"
          )}
        </button>
      </div>

      {result && <BrideResult result={result} />}
    </div>
  );
}

function BrideResult({ result }: { result: BrideResult }) {
  return (
    <div className="result-reveal glass-card p-6 mt-4 space-y-4" style={{ border: "1px solid rgba(212,160,23,0.4)" }}>
      <div className="text-center">
        <p className="text-sm mb-1" style={{ color: "rgba(255,248,231,0.6)" }}>Bride's Family Must Give</p>
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
            <span style={{ color: item.impact === "positive" ? "#FF6B6B" : "#90EE90", fontWeight: 600 }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl text-sm text-center" style={{ background: "rgba(255,50,50,0.12)", border: "1px solid rgba(255,100,100,0.2)" }}>
        <p className="font-semibold mb-1" style={{ color: "#FF9999" }}>
          🛑 Reminder: This is SATIRE
        </p>
        <p style={{ color: "rgba(255,200,200,0.8)", fontSize: "0.8rem" }}>
          {result.awareneessMsg}
        </p>
      </div>

      <div className="text-center text-xs" style={{ color: "rgba(255,248,231,0.35)" }}>
        Section 498A IPC — Dowry harassment is a cognizable, non-bailable offence.
      </div>
    </div>
  );
}

// ============================================================
// Dahej Calculator Logic – SATIRICAL, FOR AWARENESS ONLY
// These values are fictional and designed to expose the
// absurdity of India's dowry system.
// ============================================================

export interface GroomInputs {
  salary: number;           // LPA
  jobType: "govt" | "psu" | "private" | "business";
  height: number;           // cm
  skinTone: "very_fair" | "fair" | "wheatish" | "dusky" | "dark";
  education: "12th" | "graduate" | "engineer" | "doctor" | "mba" | "phd";
  familyStatus: "lower" | "middle" | "upper_middle" | "rich" | "elite";
  ownsCar: boolean;
  ownsHome: boolean;
  abroad: boolean;
}

export interface BrideInputs {
  skinTone: "very_fair" | "fair" | "wheatish" | "dusky" | "dark";
  education: "10th" | "12th" | "graduate" | "engineer" | "doctor" | "mba" | "phd";
  beauty: number;           // 0–9
  height: number;           // cm
  age: number;
  familySalary: number;     // LPA
  sisters: number;
  employed: boolean;
  urban: boolean;
}

export interface BreakdownItem {
  label: string;
  value: string;
  impact?: "positive" | "negative";
}

export interface GroomResult {
  total: number;
  breakdown: BreakdownItem[];
  extras: string[];
  awareneessMsg: string;
}

export interface BrideResult {
  total: number;
  breakdown: BreakdownItem[];
  extras: string[];
  awareneessMsg: string;
}

// ── Helpers ────────────────────────────────────────────────

export function formatINR(amount: number): string {
  if (amount >= 10_000_000) {
    return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  } else if (amount >= 100_000) {
    return `₹${(amount / 100_000).toFixed(1)} Lakh`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

function randomJitter(base: number, pct = 0.08): number {
  return base * (1 + (Math.random() * 2 - 1) * pct);
}

// ── Groom Calculator ────────────────────────────────────────

export function formatResult(inputs: GroomInputs): GroomResult {
  const breakdown: BreakdownItem[] = [];
  const extras: string[] = [];

  // --- Base from salary ---
  let base = inputs.salary * 1_00_000 * 1.8; // ~1.8× annual salary
  breakdown.push({
    label: "💼 Salary base (1.8× annual)",
    value: formatINR(base),
  });

  // --- Job type multiplier ---
  const jobMultipliers: Record<string, number> = {
    govt: 2.8,
    psu: 1.9,
    private: 1.0,
    business: 1.4,
  };
  const jobLabels: Record<string, string> = {
    govt: "🏛️ Sarkari naukri (2.8× jackpot)",
    psu: "🔩 PSU/Bank (1.9×)",
    private: "💻 Private (1×)",
    business: "📊 Business (1.4×)",
  };
  const jobMul = jobMultipliers[inputs.jobType];
  base *= jobMul;
  breakdown.push({ label: jobLabels[inputs.jobType], value: `×${jobMul}` });

  // --- Education bonus ---
  const eduBonus: Record<string, number> = {
    "12th": 0,
    graduate: 2_00_000,
    engineer: 5_00_000,
    doctor: 8_00_000,
    mba: 6_00_000,
    phd: 9_00_000,
  };
  const eduLabel: Record<string, string> = {
    "12th": "12th pass",
    graduate: "Graduate",
    engineer: "Engineer",
    doctor: "Doctor",
    mba: "MBA",
    phd: "PhD/IIT/IIM",
  };
  const eduB = eduBonus[inputs.education];
  if (eduB) {
    base += eduB;
    breakdown.push({ label: `🎓 ${eduLabel[inputs.education]} bonus`, value: `+${formatINR(eduB)}` });
  }

  // --- Height bonus ---
  let heightBonus = 0;
  if (inputs.height >= 183) heightBonus = 4_00_000;
  else if (inputs.height >= 178) heightBonus = 2_50_000;
  else if (inputs.height >= 173) heightBonus = 1_00_000;
  else if (inputs.height < 163) heightBonus = -1_50_000;
  if (heightBonus !== 0) {
    base += heightBonus;
    breakdown.push({
      label: `📏 Height (${inputs.height}cm)`,
      value: `${heightBonus > 0 ? "+" : ""}${formatINR(heightBonus)}`,
    });
  }

  // --- Skin tone ---
  const skinMul: Record<string, number> = {
    very_fair: 1.25, fair: 1.12, wheatish: 1.0, dusky: 0.9, dark: 0.78,
  };
  const skinLabel: Record<string, string> = {
    very_fair: "Very Fair 🏻 (+25%)", fair: "Fair (+12%)", wheatish: "Wheatish (0%)",
    dusky: "Dusky (-10%)", dark: "Dark (-22%)",
  };
  const skinM = skinMul[inputs.skinTone];
  base *= skinM;
  breakdown.push({ label: `🎨 Skin tone — ${skinLabel[inputs.skinTone]}`, value: `×${skinM}` });

  // --- Family status ---
  const famMul: Record<string, number> = {
    lower: 1.15, middle: 1.0, upper_middle: 0.9, rich: 0.8, elite: 0.65,
  };
  const famLabel: Record<string, string> = {
    lower: "Lower Middle (1.15×)", middle: "Middle (1×)",
    upper_middle: "Upper Middle (0.9×)", rich: "Rich (0.8×)", elite: "Elite (0.65×)",
  };
  base *= famMul[inputs.familyStatus];
  breakdown.push({ label: `🏠 Family — ${famLabel[inputs.familyStatus]}`, value: `×${famMul[inputs.familyStatus]}` });

  // --- NRI multiplier ---
  if (inputs.abroad) {
    base *= 3.2;
    breakdown.push({ label: "✈️ NRI multiplier", value: "×3.2 🚀" });
    extras.push("Flat in London/Dubai");
  }

  // --- Assets ---
  if (inputs.ownsCar) {
    const carVal = randomJitter(5_00_000);
    base += carVal;
    extras.push("New Car (Innova Crysta)");
    breakdown.push({ label: "🚗 Car (demands Innova)", value: `+${formatINR(carVal)}` });
  }
  if (inputs.ownsHome) {
    const homeVal = randomJitter(20_00_000);
    base += homeVal;
    extras.push("Home Registry / Property");
    breakdown.push({ label: "🏠 Home/Property demand", value: `+${formatINR(homeVal)}` });
  }

  // --- Jitter for realism ---
  base = randomJitter(base, 0.05);

  // Standard extras
  extras.push("1 kg Gold Jewellery");
  extras.push("AC + Fridge + Washing Machine");

  const awareness = [
    "No human has a price. Dahej Pratha treats women as commodities.",
    "Thousands of brides die every year due to dowry harassment in India.",
    "Real love doesn't come with a price tag. Report dowry harassment: 181.",
    "Your daughter's worth is immeasurable. Don't let anyone put a price on her.",
  ];

  return {
    total: Math.round(base),
    breakdown,
    extras,
    awareneessMsg: awareness[Math.floor(Math.random() * awareness.length)],
  };
}

// ── Bride Calculator ────────────────────────────────────────

export function formatBrideResult(inputs: BrideInputs): BrideResult {
  const breakdown: BreakdownItem[] = [];
  const extras: string[] = [];

  // --- Base from family income ---
  let base = inputs.familySalary * 1_00_000 * 2.5;
  breakdown.push({ label: "💰 Family income base", value: formatINR(base), impact: "positive" });

  // --- Skin tone multiplier (very racist logic exposed as satire) ---
  const skinMul: Record<string, number> = {
    very_fair: 0.5, fair: 0.72, wheatish: 1.0, dusky: 1.4, dark: 1.9,
  };
  const skinLabel: Record<string, string> = {
    very_fair: "Very Fair (×0.5 — advantage)",
    fair: "Fair (×0.72)",
    wheatish: "Wheatish (×1.0)",
    dusky: "Dusky (×1.4 — penalised!)",
    dark: "Dark (×1.9 — heavily penalised!!!)",
  };
  const sM = skinMul[inputs.skinTone];
  base *= sM;
  breakdown.push({
    label: `🎨 Skin tone: ${skinLabel[inputs.skinTone]}`,
    value: `×${sM}`,
    impact: sM > 1 ? "positive" : "negative",
  });

  // --- Beauty ---
  // 0 = very plain → +40%, 9 = divine → -50%
  const beautyMul = 1.4 - (inputs.beauty / 9) * 0.9;
  base *= beautyMul;
  const beautyPct = Math.round((1 - beautyMul) * 100);
  breakdown.push({
    label: `💄 Beauty factor`,
    value: beautyPct >= 0 ? `-${beautyPct}%` : `+${Math.abs(beautyPct)}%`,
    impact: beautyPct >= 0 ? "negative" : "positive",
  });

  // --- Education (reduces dahej — one positive thing!) ---
  const eduReduction: Record<string, number> = {
    "10th": 0,
    "12th": 0.05,
    graduate: 0.15,
    engineer: 0.28,
    doctor: 0.38,
    mba: 0.32,
    phd: 0.45,
  };
  const eduLabel: Record<string, string> = {
    "10th": "10th pass",
    "12th": "12th",
    graduate: "Graduate",
    engineer: "Engineer",
    doctor: "Doctor",
    mba: "MBA",
    phd: "PhD",
  };
  const eduRed = eduReduction[inputs.education];
  if (eduRed > 0) {
    const reduction = base * eduRed;
    base -= reduction;
    breakdown.push({
      label: `🎓 ${eduLabel[inputs.education]} (reduces demand)`,
      value: `-${formatINR(reduction)}`,
      impact: "negative",
    });
  }

  // --- Age penalty ---
  if (inputs.age > 27) {
    const agePenalty = (inputs.age - 27) * 80_000;
    base += agePenalty;
    breakdown.push({
      label: `🎂 Age ${inputs.age} — "late" marriage penalty`,
      value: `+${formatINR(agePenalty)}`,
      impact: "positive",
    });
  }

  // --- Number of sisters ---
  if (inputs.sisters >= 2) {
    const sisterPenalty = inputs.sisters * 1_50_000;
    base += sisterPenalty;
    breakdown.push({
      label: `👭 ${inputs.sisters} sisters — "burden" penalty`,
      value: `+${formatINR(sisterPenalty)}`,
      impact: "positive",
    });
  }

  // --- Height ---
  let heightAdj = 0;
  if (inputs.height >= 168) heightAdj = -80_000;
  else if (inputs.height < 152) heightAdj = 1_20_000;
  if (heightAdj !== 0) {
    base += heightAdj;
    breakdown.push({
      label: `📏 Height (${inputs.height}cm)`,
      value: `${heightAdj > 0 ? "+" : ""}${formatINR(heightAdj)}`,
      impact: heightAdj > 0 ? "positive" : "negative",
    });
  }

  // --- Self-employed ---
  if (inputs.employed) {
    const empRed = base * 0.2;
    base -= empRed;
    breakdown.push({
      label: "👩‍💼 Self-employed (reduces demand)",
      value: `-${formatINR(empRed)}`,
      impact: "negative",
    });
  }

  // --- Urban ---
  if (inputs.urban) {
    base *= 1.3;
    breakdown.push({ label: "🏙️ Urban family premium", value: "×1.3", impact: "positive" });
  }

  base = randomJitter(base, 0.06);

  // Standard extras
  extras.push("Gold Jewellery & Clothes");
  extras.push("Furniture for new home");
  if (inputs.familySalary >= 15) extras.push("Wedding expenses (₹5–20L)");

  const awareness = [
    "No dowry is worth a daughter's life. 8,000+ dowry deaths reported annually in India.",
    "A woman's worth cannot be measured in gold or gadgets. She is priceless.",
    "If they demand dahej, they don't deserve her. Choose dignity over greed.",
    "Educate girls. Empower them. Never pay for their marriages. #EndDowry",
  ];

  return {
    total: Math.round(base),
    breakdown,
    extras,
    awareneessMsg: awareness[Math.floor(Math.random() * awareness.length)],
  };
}

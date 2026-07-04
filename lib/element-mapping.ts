import type { ElementKey, HiddenStem } from "@/lib/types";

export const elementOrder: ElementKey[] = ["metal", "wood", "water", "fire", "earth"];

export const elementLabels: Record<ElementKey, string> = {
  metal: "金",
  wood: "木",
  water: "水",
  fire: "火",
  earth: "土"
};

export const elementThemes: Record<
  ElementKey,
  {
    text: string;
    bg: string;
    border: string;
    bar: string;
    softBg: string;
    ring: string;
  }
> = {
  metal: {
    text: "text-stone-700",
    bg: "bg-stone-100",
    border: "border-stone-300",
    bar: "bg-stone-300",
    softBg: "bg-stone-50",
    ring: "ring-stone-200"
  },
  wood: {
    text: "text-emerald-800",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    bar: "bg-emerald-500",
    softBg: "bg-emerald-50",
    ring: "ring-emerald-200"
  },
  water: {
    text: "text-slate-800",
    bg: "bg-slate-100",
    border: "border-slate-300",
    bar: "bg-slate-600",
    softBg: "bg-slate-50",
    ring: "ring-slate-200"
  },
  fire: {
    text: "text-rose-900",
    bg: "bg-rose-50",
    border: "border-rose-200",
    bar: "bg-rose-700",
    softBg: "bg-rose-50",
    ring: "ring-rose-200"
  },
  earth: {
    text: "text-amber-900",
    bg: "bg-amber-50",
    border: "border-amber-200",
    bar: "bg-amber-600",
    softBg: "bg-amber-50",
    ring: "ring-amber-200"
  }
};

export const heavenlyStemElements: Record<string, ElementKey> = {
  甲: "wood",
  乙: "wood",
  丙: "fire",
  丁: "fire",
  戊: "earth",
  己: "earth",
  庚: "metal",
  辛: "metal",
  壬: "water",
  癸: "water"
};

export const earthlyBranchMainElements: Record<string, ElementKey> = {
  子: "water",
  丑: "earth",
  寅: "wood",
  卯: "wood",
  辰: "earth",
  巳: "fire",
  午: "fire",
  未: "earth",
  申: "metal",
  酉: "metal",
  戌: "earth",
  亥: "water"
};

export const earthlyBranchHiddenStems: Record<string, string[]> = {
  子: ["癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "戊", "庚"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"]
};

export function getStemElement(stem: string) {
  return heavenlyStemElements[stem];
}

export function getBranchElement(branch: string) {
  return earthlyBranchMainElements[branch];
}

export function getHiddenStems(branch: string): HiddenStem[] {
  return (earthlyBranchHiddenStems[branch] || []).map((stem, index) => ({
    stem,
    element: getStemElement(stem),
    weight: index === 0 ? 1 : index === 1 ? 0.5 : 0.25
  }));
}

export function getElementTheme(element: ElementKey) {
  return elementThemes[element];
}

export function splitPillar(pillar: string) {
  return {
    stem: pillar.slice(0, 1),
    branch: pillar.slice(1, 2)
  };
}

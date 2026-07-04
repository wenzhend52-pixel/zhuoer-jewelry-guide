import type { ElementKey } from "@/lib/types";
import { elementLabels, elementOrder } from "@/lib/element-mapping";
import { getElementJewelryRule } from "@/lib/jewelry-recommendation";

export { elementOrder };

export const elementMeta: Record<
  ElementKey,
  {
    label: string;
    title: string;
    colors: string[];
    gemstones: string[];
    materials: string[];
    mood: string;
    wearingAdvice: string;
    stylingAdvice: string;
    staffScript: string;
    energyMeaning: string;
    className: string;
  }
> = {
  metal: {
    label: elementLabels.metal,
    title: "清透金韵",
    mood: "清醒、理性、讲究品质",
    stylingAdvice: "适合明亮、精致、有品质感的珠宝。线条干净、光泽细腻的款式，会让整体气质更显高级。",
    className: "bg-stone-100 text-stone-700 border-stone-300",
    ...toMeta("metal")
  },
  wood: {
    label: elementLabels.wood,
    title: "温润生长",
    mood: "温和、自然、有生命力",
    stylingAdvice: "适合自然、清透、有生命力的珠宝。绿色系或带有植物感的设计，会让气质更舒展。",
    className: "bg-emerald-50 text-emerald-800 border-emerald-200",
    ...toMeta("wood")
  },
  water: {
    label: elementLabels.water,
    title: "静水深流",
    mood: "沉静、柔和、有内涵",
    stylingAdvice: "适合沉静、柔和、有内涵的珠宝。冷色调、银白色或蓝黑色系，能增加温润与安静的质感。",
    className: "bg-slate-100 text-slate-800 border-slate-300",
    ...toMeta("water")
  },
  fire: {
    label: elementLabels.fire,
    title: "朱光映面",
    mood: "明亮、热情、有表达力",
    stylingAdvice: "适合明亮、显气色、有存在感的珠宝。红紫色、粉色或玫瑰金，可以让面部气色更柔和。",
    className: "bg-rose-50 text-rose-900 border-rose-200",
    ...toMeta("fire")
  },
  earth: {
    label: elementLabels.earth,
    title: "丰润安定",
    mood: "稳定、踏实、重视质感",
    stylingAdvice: "适合温润、稳重、有贵气感的珠宝。暖金色、蜜蜡感或自然光泽的款式，更显亲和与端庄。",
    className: "bg-amber-50 text-amber-900 border-amber-200",
    ...toMeta("earth")
  }
};

function toMeta(element: ElementKey) {
  const rule = getElementJewelryRule(element);

  return {
    colors: rule.colors,
    gemstones: rule.gemstones,
    materials: rule.materials,
    wearingAdvice: rule.wearingStyle,
    staffScript: `可重点介绍 ${rule.gemstones.slice(0, 3).join("、")}，强调${rule.staffKeywords.join("、")}的佩戴效果。`,
    energyMeaning: rule.energyMeaning
  };
}

export function getElementOptions() {
  return elementOrder.map((key) => ({ key, ...elementMeta[key] }));
}

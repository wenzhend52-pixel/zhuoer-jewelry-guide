import type { ElementKey } from "@/lib/types";
import { elementLabels } from "@/lib/element-mapping";

type PersonalityInput = {
  metalScore: number;
  woodScore: number;
  waterScore: number;
  fireScore: number;
  earthScore: number;
  strongestElement: ElementKey;
  primaryElement: ElementKey;
};

type BaseProfile = {
  title: string;
  keywords: string[];
  description: string;
  emotionalStyle: string;
  lifeAttitude: string;
};

const baseProfiles: Record<ElementKey, BaseProfile> = {
  metal: {
    title: "清醒有分寸的金性气质",
    keywords: ["清醒", "理性", "讲究品质", "有边界感", "审美干净"],
    description:
      "从五行气质来看，你的性格中可能带有比较明显的“金”的特质。你可能更重视品质和分寸感，喜欢干净、清楚、有质感的事物。相比过于复杂夸张的设计，你的气质更适合简洁、耐看、有高级感的珠宝风格。",
    emotionalStyle: "情绪表达可能比较克制，更需要清楚、安定、有秩序的空间。",
    lifeAttitude: "做选择时可能更看重质感、细节和长期耐看，不容易被一时热闹的风格带走。"
  },
  wood: {
    title: "温和有生机的木性气质",
    keywords: ["温和", "有生命力", "重视自由", "善于照顾", "有成长感"],
    description:
      "从五行气质来看，你的性格中可能带有比较明显的“木”的特质。你可能更偏向柔和、自然、有韧性的状态，喜欢舒服、有呼吸感的事物。你的气质更适合清透、自然、带有生机感的珠宝。",
    emotionalStyle: "情绪可能更像细水长流，愿意照顾他人，也需要给自己留出舒展和休息的空间。",
    lifeAttitude: "你可能更喜欢稳定成长的节奏，不急于张扬，但会在细节里慢慢形成自己的风格。"
  },
  water: {
    title: "细腻有内涵的水性气质",
    keywords: ["细腻", "敏感", "直觉好", "安静", "有内涵"],
    description:
      "从五行气质来看，你的性格中可能带有比较明显的“水”的特质。你可能内心细腻，观察力较强，不一定喜欢过分张扬，但很适合有质感、有故事感的珠宝。你的气质更适合冷色调、柔和、带有流动感的款式。",
    emotionalStyle: "情绪感受可能比较细致，容易察觉环境和他人的变化，也更适合安静、温柔的表达方式。",
    lifeAttitude: "你可能不急着表现自己，但会被有深度、有质地、经得起细看的事物吸引。"
  },
  fire: {
    title: "明亮有表达力的火性气质",
    keywords: ["热情", "有表达力", "有魅力", "行动力强", "容易被看见"],
    description:
      "从五行气质来看，你的性格中可能带有比较明显的“火”的特质。你可能更有感染力，也更适合能够提升气色、增强存在感的珠宝。你的气质更适合红色、紫色、粉色系，或者设计感更明显的款式。",
    emotionalStyle: "情绪可能来得比较直接，也容易被美好的氛围带动。适当的光彩感会让你显得更有精神。",
    lifeAttitude: "你可能更愿意把生活过得有声有色，适合选择能让自己状态变好的珠宝。"
  },
  earth: {
    title: "稳定有包容感的土性气质",
    keywords: ["稳定", "踏实", "包容", "可靠", "重视安全感"],
    description:
      "从五行气质来看，你的性格中可能带有比较明显的“土”的特质。你可能给人稳重、亲切、可靠的感觉，更适合温润、厚重、有安定感的珠宝。你的气质更适合暖色调、自然光泽、不过分夸张的款式。",
    emotionalStyle: "情绪可能更重视安全感和确定感，温暖稳定的环境会让你更放松。",
    lifeAttitude: "你可能更看重真实、可靠和长久陪伴，不太喜欢过分漂浮或短暂流行的选择。"
  }
};

export function createPersonalityProfile(input: PersonalityInput) {
  const strongest = baseProfiles[input.strongestElement];
  const lowestScore = Math.min(input.metalScore, input.woodScore, input.waterScore, input.fireScore, input.earthScore);
  const highestScore = Math.max(input.metalScore, input.woodScore, input.waterScore, input.fireScore, input.earthScore);
  const scoreGap = highestScore - lowestScore;
  const balanceNote =
    scoreGap >= 14
      ? "本次五行分布的高低差较明显，所以珠宝搭配可以更有方向感。"
      : "本次五行分布整体较为平和，珠宝搭配可以以轻柔补充为主。";

  return {
    personalityTitle: strongest.title,
    temperamentKeywords: strongest.keywords,
    personalityDescription: strongest.description,
    emotionalStyle: strongest.emotionalStyle,
    lifeAttitude: strongest.lifeAttitude,
    jewelryEnergyAdvice: `本次建议可以参考“${elementLabels[input.primaryElement]}”作为主要珠宝方向。`,
    whyThisJewelry: `${balanceNote}你的五行气质中，“${elementLabels[input.strongestElement]}”的特点比较明显，而“${elementLabels[input.primaryElement]}”可以作为本次主要珠宝能量方向。`
  };
}

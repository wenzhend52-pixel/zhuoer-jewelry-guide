import { jewelryRules } from "@/data/jewelry-rules";
import { elementLabels } from "@/lib/element-mapping";
import type { ElementDecision, ElementKey } from "@/lib/types";

type CombinedJewelryRecommendationInput = {
  primaryElement: ElementKey;
  secondaryElements: ElementDecision[];
  avoidElements?: ElementDecision[];
};

function uniqueItems(items: string[], limit?: number) {
  const values = Array.from(new Set(items));
  return typeof limit === "number" ? values.slice(0, limit) : values;
}

function elementNames(items: ElementDecision[]) {
  return items.map((item) => elementLabels[item.element]).join("、");
}

function getRatioText(secondaryCount: number) {
  if (secondaryCount === 0) {
    return "主补方向可以占整体搭配的 100%。";
  }

  if (secondaryCount === 1) {
    return "主补方向约占 70%，辅助方向约占 30%。";
  }

  return "主补方向约占 70%，第一辅助约占 20%，第二辅助约占 10%。";
}

export function getElementJewelryRule(element: ElementKey) {
  return jewelryRules[element];
}

export function getJewelryRecommendation(element: ElementKey) {
  return jewelryRules[element];
}

export function getCombinedJewelryRecommendation({ primaryElement, secondaryElements, avoidElements = [] }: CombinedJewelryRecommendationInput) {
  const primaryRule = jewelryRules[primaryElement];
  const secondaryRules = secondaryElements.map((item) => jewelryRules[item.element]);
  const avoidRules = avoidElements.map((item) => jewelryRules[item.element]);
  const secondaryLabels = elementNames(secondaryElements);
  const avoidLabels = elementNames(avoidElements);
  const colorPalette = uniqueItems([...primaryRule.colors, ...secondaryRules.flatMap((rule) => rule.colors)], 8);
  const gemstoneOptions = uniqueItems([...primaryRule.gemstones, ...secondaryRules.flatMap((rule) => rule.gemstones)], 10);
  const materialOptions = uniqueItems([...primaryRule.materials, ...secondaryRules.flatMap((rule) => rule.materials)], 8);
  const avoidColors = uniqueItems(avoidRules.flatMap((rule) => rule.colors), 6);
  const avoidGemstones = uniqueItems(avoidRules.flatMap((rule) => rule.gemstones), 6);
  const ratioText = getRatioText(secondaryElements.length);

  return {
    primaryElement,
    secondaryElements,
    avoidElements,
    primaryAdvice: `本次珠宝建议以${primaryRule.elementLabel}系为主。${primaryRule.energyMeaning}可以优先看${primaryRule.colors.slice(0, 2).join("、")}等色调。`,
    secondaryAdvice:
      secondaryElements.length > 0
        ? `可以搭配少量${secondaryLabels}系珠宝，让整体选择更有层次。`
        : "这次不需要额外加入太多辅助方向，保持主线清晰会更耐看。",
    colorPalette,
    gemstoneOptions,
    materialOptions,
    avoidColors,
    avoidGemstones,
    wearingStyle: `${ratioText}款式上建议：${primaryRule.wearingStyle}${secondaryRules.length > 0 ? ` 辅助款可参考${secondaryRules.map((rule) => rule.wearingStyle).join(" ")}` : ""}`,
    customerAdvice:
      secondaryElements.length > 0
        ? `本次建议以${primaryRule.elementLabel}系珠宝为主，可以搭配少量${secondaryLabels}系珠宝。`
        : `本次建议以${primaryRule.elementLabel}系珠宝为主，整体搭配保持简洁即可。`,
    staffTip: [
      `请优先带客户看${primaryRule.colors.join("、")}系珠宝，主推${primaryRule.gemstones.join("、")}。`,
      secondaryElements.length > 0
        ? `可少量搭配${secondaryRules.flatMap((rule) => rule.gemstones.slice(0, 2)).join("、")}，丰富选择范围。`
        : "不需要主动扩展太多五行方向，先围绕主推款式试戴。",
      `推荐时可强调${uniqueItems([primaryRule, ...secondaryRules].flatMap((rule) => rule.staffKeywords), 5).join("、")}的佩戴效果。`,
      avoidElements.length > 0 ? `${avoidLabels}系珠宝暂不作为优先推荐方向。` : ""
    ]
      .filter(Boolean)
      .join("")
  };
}

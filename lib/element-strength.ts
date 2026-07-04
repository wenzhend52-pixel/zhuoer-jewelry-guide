import { elementSupportRuleConfig } from "@/data/element-support-rules";
import type { BaziChartResult, ElementDecision, ElementKey, ElementProfile, RuleWeightConfig } from "@/lib/types";
import { elementLabels, elementOrder } from "@/lib/element-mapping";

export const defaultRuleWeightConfig: RuleWeightConfig = {
  stem: 10,
  branchMain: 8,
  hiddenStemMain: 4,
  hiddenStemSecondary: 2,
  hiddenStemRest: 1,
  monthBranchMultiplier: 1.5,
  visibleStemBonus: 2
};

type StrengthOptions = {
  ruleWeightConfig?: RuleWeightConfig;
  manualOverrideRecommendedElement?: ElementKey;
  adminEditableRules?: boolean;
};

type ElementStructure = {
  visibleStemCount: ElementProfile;
  branchMainCount: ElementProfile;
  hiddenStemCount: ElementProfile;
  monthElement: ElementKey;
};

function createEmptyScores(): ElementProfile {
  return { metal: 0, wood: 0, water: 0, fire: 0, earth: 0 };
}

function normalizeScores(rawScores: ElementProfile) {
  const total = elementOrder.reduce((sum, key) => sum + rawScores[key], 0);
  return elementOrder.reduce((scores, key) => {
    scores[key] = total > 0 ? Math.round((rawScores[key] / total) * 100) : 0;
    return scores;
  }, createEmptyScores());
}

function collectStructure(chart: BaziChartResult): ElementStructure {
  const visibleStemCount = createEmptyScores();
  const branchMainCount = createEmptyScores();
  const hiddenStemCount = createEmptyScores();

  chart.pillarList.forEach((pillar) => {
    visibleStemCount[pillar.stemElement] += 1;
    branchMainCount[pillar.branchElement] += 1;
    pillar.hiddenStems.forEach((hiddenStem) => {
      hiddenStemCount[hiddenStem.element] += 1;
    });
  });

  return {
    visibleStemCount,
    branchMainCount,
    hiddenStemCount,
    monthElement: chart.pillars.month.branchElement
  };
}

function getReasonParts(element: ElementKey, scores: ElementProfile, structure: ElementStructure) {
  const config = elementSupportRuleConfig;
  const parts: string[] = [];
  let supportScore = 0;

  if (scores[element] <= config.lowScoreThreshold) {
    supportScore += config.scoreWeights.lowScore;
    parts.push(`${elementLabels[element]}得分较低`);
  } else if (scores[element] <= config.balancedLowScoreThreshold) {
    supportScore += config.scoreWeights.balancedLowScore;
    parts.push(`${elementLabels[element]}得分处在较低区间`);
  }

  if (structure.visibleStemCount[element] === 0) {
    supportScore += config.scoreWeights.noVisibleStem;
    parts.push("天干未透");
  }

  if (structure.hiddenStemCount[element] > 0 && structure.visibleStemCount[element] === 0) {
    supportScore += config.scoreWeights.hiddenButNotVisible;
    parts.push("藏干中有根但未透出");
  }

  if (structure.hiddenStemCount[element] <= 1) {
    supportScore += config.scoreWeights.weakHiddenRoot;
    parts.push("地支根气不多");
  }

  if (structure.monthElement !== element) {
    supportScore += config.scoreWeights.monthBranchDifferent;
  } else {
    supportScore += config.scoreWeights.monthBranchSamePenalty;
    parts.push("月令已有力量");
  }

  if (structure.visibleStemCount[element] > 0 && (structure.branchMainCount[element] > 0 || structure.hiddenStemCount[element] > 0)) {
    supportScore += config.scoreWeights.visibleAndRootedPenalty;
    parts.push("已见透干并有根");
  }

  if (scores[element] >= config.highScoreThreshold) {
    supportScore += config.scoreWeights.highScorePenalty;
    parts.push("分数已经较高");
  }

  return {
    supportScore,
    reason: parts.length > 0 ? parts.join("；") : "整体结构中可作为少量辅助参考"
  };
}

function pickAvoidElements(primaryElement: ElementKey, scores: ElementProfile, structure: ElementStructure) {
  const config = elementSupportRuleConfig;

  return elementOrder
    .filter((element) => element !== primaryElement)
    .map((element) => {
      const isVeryHigh = scores[element] >= config.veryHighScoreThreshold;
      const isHighWithMonth = scores[element] >= config.highScoreThreshold && structure.monthElement === element;
      const isHighAndRooted =
        scores[element] >= config.highScoreThreshold &&
        structure.visibleStemCount[element] > 0 &&
        (structure.branchMainCount[element] > 0 || structure.hiddenStemCount[element] > 1);

      if (!isVeryHigh && !isHighWithMonth && !isHighAndRooted) {
        return undefined;
      }

      const reasons = [
        `${elementLabels[element]}分数为 ${scores[element]}`,
        structure.monthElement === element ? "月令有力" : "",
        structure.visibleStemCount[element] > 0 ? "天干已透" : "",
        structure.hiddenStemCount[element] > 1 ? "藏干基础较多" : ""
      ].filter(Boolean);

      return {
        element,
        reason: reasons.join("；")
      } satisfies ElementDecision;
    })
    .filter((item): item is ElementDecision => Boolean(item))
    .sort((a, b) => scores[b.element] - scores[a.element])
    .slice(0, config.maxAvoidCount);
}

function pickSecondaryElements(primaryElement: ElementKey, scores: ElementProfile, structure: ElementStructure, avoidElements: ElementDecision[]) {
  const config = elementSupportRuleConfig;
  const avoidSet = new Set(avoidElements.map((item) => item.element));

  return elementOrder
    .filter((element) => element !== primaryElement && !avoidSet.has(element))
    .map((element) => {
      const result = getReasonParts(element, scores, structure);
      return {
        element,
        reason: result.reason,
        supportScore: result.supportScore
      } satisfies ElementDecision;
    })
    .filter((item) => (item.supportScore || 0) >= config.minSecondaryScore)
    .sort((a, b) => (b.supportScore || 0) - (a.supportScore || 0) || scores[a.element] - scores[b.element])
    .slice(0, config.maxSecondaryCount);
}

function labelList(elements: ElementKey[]) {
  return elements.map((element) => elementLabels[element]).join("、");
}

export function analyzeElementStrength(chart: BaziChartResult, options: StrengthOptions = {}) {
  const ruleWeightConfig = options.ruleWeightConfig || defaultRuleWeightConfig;
  const rawScores = createEmptyScores();
  const visibleStemElements = new Set<ElementKey>();

  chart.pillarList.forEach((pillar) => {
    rawScores[pillar.stemElement] += ruleWeightConfig.stem;
    rawScores[pillar.branchElement] += ruleWeightConfig.branchMain;
    visibleStemElements.add(pillar.stemElement);

    pillar.hiddenStems.forEach((hiddenStem, index) => {
      const weight =
        index === 0
          ? ruleWeightConfig.hiddenStemMain
          : index === 1
            ? ruleWeightConfig.hiddenStemSecondary
            : ruleWeightConfig.hiddenStemRest;
      rawScores[hiddenStem.element] += weight;
    });
  });

  rawScores[chart.pillars.month.branchElement] += ruleWeightConfig.branchMain * (ruleWeightConfig.monthBranchMultiplier - 1);

  visibleStemElements.forEach((element) => {
    rawScores[element] += ruleWeightConfig.visibleStemBonus;
  });

  const elementScores = normalizeScores(rawScores);
  const structure = collectStructure(chart);
  const strongestElement = elementOrder.reduce((strongest, current) => (elementScores[current] > elementScores[strongest] ? current : strongest));
  const weakestElement = elementOrder.reduce((weakest, current) => (elementScores[current] < elementScores[weakest] ? current : weakest));
  const primaryElement = options.manualOverrideRecommendedElement || weakestElement;
  const avoidElements = pickAvoidElements(primaryElement, elementScores, structure);
  const secondaryElements = pickSecondaryElements(primaryElement, elementScores, structure, avoidElements);
  const secondaryLabels = labelList(secondaryElements.map((item) => item.element));
  const avoidLabels = labelList(avoidElements.map((item) => item.element));

  const customerExplanation =
    secondaryElements.length > 0
      ? `本次建议以${elementLabels[primaryElement]}系珠宝为主，可以搭配少量${secondaryLabels}系珠宝，让整体选择更有层次。`
      : `本次建议以${elementLabels[primaryElement]}系珠宝为主，搭配上保持简洁统一即可。`;

  return {
    elementScores,
    scores: elementScores,
    rawScores,
    strongestElement,
    weakestElement,
    primaryElement,
    secondaryElements,
    avoidElements,
    recommendationReason: customerExplanation,
    customerExplanation,
    staffExplanation: `${customerExplanation}${avoidElements.length > 0 ? ` ${avoidLabels}系珠宝暂不作为优先推荐方向。` : ""}`,
    internalReasoning: [
      `月令五行：${elementLabels[structure.monthElement]}`,
      `五行分数：${elementOrder.map((element) => `${elementLabels[element]} ${elementScores[element]}`).join("；")}`,
      `主补：${elementLabels[primaryElement]}（沿用基础低分优先规则）`,
      `辅助候选：${secondaryElements.map((item) => `${elementLabels[item.element]} supportScore=${item.supportScore}；${item.reason}`).join("；") || "无"}`,
      `少用候选：${avoidElements.map((item) => `${elementLabels[item.element]}；${item.reason}`).join("；") || "无"}`,
      `透干统计：${elementOrder.map((element) => `${elementLabels[element]} ${structure.visibleStemCount[element]}`).join("；")}`,
      `藏干统计：${elementOrder.map((element) => `${elementLabels[element]} ${structure.hiddenStemCount[element]}`).join("；")}`
    ].join("\n"),
    strengthExplanation: `本次根据四柱、天干地支、藏干和月令做五行结构参考。珠宝建议以${elementLabels[primaryElement]}为主${secondaryElements.length > 0 ? `，搭配${secondaryLabels}` : ""}。`,
    ruleWeightConfig,
    manualOverrideRecommendedElement: options.manualOverrideRecommendedElement,
    adminEditableRules: options.adminEditableRules ?? true
  };
}

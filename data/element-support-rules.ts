import type { ElementKey } from "@/lib/types";

export type ElementSupportRuleConfig = {
  lowScoreThreshold: number;
  balancedLowScoreThreshold: number;
  highScoreThreshold: number;
  veryHighScoreThreshold: number;
  minSecondaryScore: number;
  maxSecondaryCount: number;
  maxAvoidCount: number;
  scoreWeights: {
    lowScore: number;
    balancedLowScore: number;
    noVisibleStem: number;
    hiddenButNotVisible: number;
    weakHiddenRoot: number;
    monthBranchDifferent: number;
    monthBranchSamePenalty: number;
    visibleAndRootedPenalty: number;
    highScorePenalty: number;
  };
};

export const elementSupportRuleConfig: ElementSupportRuleConfig = {
  lowScoreThreshold: 14,
  balancedLowScoreThreshold: 20,
  highScoreThreshold: 28,
  veryHighScoreThreshold: 34,
  minSecondaryScore: 4,
  maxSecondaryCount: 2,
  maxAvoidCount: 2,
  scoreWeights: {
    lowScore: 8,
    balancedLowScore: 4,
    noVisibleStem: 2,
    hiddenButNotVisible: 3,
    weakHiddenRoot: 2,
    monthBranchDifferent: 1,
    monthBranchSamePenalty: -5,
    visibleAndRootedPenalty: -3,
    highScorePenalty: -8
  }
};

export const elementToneForCustomer: Record<ElementKey, string> = {
  metal: "清透、干净、有品质感",
  wood: "自然、舒展、有生机",
  water: "柔和、沉静、有流动感",
  fire: "明亮、提气色、有表达力",
  earth: "温润、稳定、有亲和力"
};

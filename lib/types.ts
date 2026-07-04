export type ElementKey = "metal" | "wood" | "water" | "fire" | "earth";

export type ElementProfile = Record<ElementKey, number>;

export type ElementDecision = {
  element: ElementKey;
  reason: string;
  supportScore?: number;
};

export type CalendarType = "solar" | "lunar";
export type Gender = "female" | "male" | "unspecified";

export type StoreJewelry = {
  id: string;
  slug: string;
  name: string;
  element: ElementKey;
  material: string;
  gemstone: string;
  color: string;
  styleTags: string[];
  tryOnNote: string;
  recommendationReason: string;
  description: string;
  imageUrl: string;
  displayStatus: "available" | "limited" | "sample";
  featured: boolean;
};

export type BirthInput = {
  birthDate: string;
  birthTime?: string;
  birthCity: string;
  isBirthTimeUnknown?: boolean;
  calendarType?: CalendarType;
  gender?: Gender;
  useTrueSolarTime?: boolean;
  timezone?: string;
  longitude?: number;
  useLateZiHourNextDay?: boolean;
};

export type PillarKey = "year" | "month" | "day" | "hour";

export type HiddenStem = {
  stem: string;
  element: ElementKey;
  weight: number;
};

export type BaziPillar = {
  key: PillarKey;
  label: string;
  stem: string;
  branch: string;
  pillar: string;
  stemElement: ElementKey;
  branchElement: ElementKey;
  hiddenStems: HiddenStem[];
  tenGod?: string;
  nayin?: string;
};

export type BaziPillars = {
  year: BaziPillar;
  month: BaziPillar;
  day: BaziPillar;
  hour?: BaziPillar;
};

export type BaziChartResult = {
  resultCode: string;
  pillars: BaziPillars;
  pillarList: BaziPillar[];
  hasHourPillar: boolean;
  calendarType: CalendarType;
  gender: Gender;
  calculationNote: string;
  cityInfo: {
    city: string;
    timezone: string;
    longitude?: number;
    usesTrueSolarTime: boolean;
  };
  options: {
    useLateZiHourNextDay: boolean;
  };
};

export type ElementStrengthResult = {
  elementScores: ElementProfile;
  scores: ElementProfile;
  rawScores: ElementProfile;
  strongestElement: ElementKey;
  weakestElement: ElementKey;
  primaryElement: ElementKey;
  secondaryElements: ElementDecision[];
  avoidElements: ElementDecision[];
  recommendationReason: string;
  internalReasoning: string;
  customerExplanation: string;
  staffExplanation: string;
  strengthExplanation: string;
  ruleWeightConfig: RuleWeightConfig;
  manualOverrideRecommendedElement?: ElementKey;
  adminEditableRules: boolean;
};

export type RuleWeightConfig = {
  stem: number;
  branchMain: number;
  hiddenStemMain: number;
  hiddenStemSecondary: number;
  hiddenStemRest: number;
  monthBranchMultiplier: number;
  visibleStemBonus: number;
};

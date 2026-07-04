import { Lunar, Solar } from "lunar-javascript";
import type { BaziChartResult, BaziPillar, BirthInput, CalendarType, ElementKey, Gender, PillarKey } from "@/lib/types";
import { getBranchElement, getHiddenStems, getStemElement, splitPillar } from "@/lib/element-mapping";

const pillarLabels: Record<PillarKey, string> = {
  year: "年柱",
  month: "月柱",
  day: "日柱",
  hour: "时柱"
};

function parseBirthDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month, day };
}

function parseBirthTime(time?: string) {
  if (!time) {
    return { hour: 12, minute: 0 };
  }

  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
}

function toPillar(key: PillarKey, pillar: string): BaziPillar {
  const { stem, branch } = splitPillar(pillar);
  const stemElement = getStemElement(stem);
  const branchElement = getBranchElement(branch);

  return {
    key,
    label: pillarLabels[key],
    stem,
    branch,
    pillar,
    stemElement,
    branchElement,
    hiddenStems: getHiddenStems(branch)
  };
}

function createResultCode(input: BirthInput) {
  const seed = `${input.birthDate}${input.birthTime || "no-time"}${input.birthCity}${input.calendarType || "solar"}`;
  const hash = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return `BZ-${input.birthDate.replaceAll("-", "").slice(2)}-${String(hash % 997).padStart(3, "0")}`;
}

function createSolarFromInput(input: BirthInput) {
  const { year, month, day } = parseBirthDate(input.birthDate);
  const { hour, minute } = parseBirthTime(input.birthTime);

  if ((input.calendarType || "solar") === "lunar") {
    return Lunar.fromYmdHms(year, month, day, hour, minute, 0).getSolar();
  }

  return Solar.fromYmdHms(year, month, day, hour, minute, 0);
}

export function calculateBaziChart(input: BirthInput): BaziChartResult {
  const hasHourPillar = Boolean(input.birthTime && !input.isBirthTimeUnknown);
  const solar = createSolarFromInput(input);
  const lunar = solar.getLunar();

  const yearPillar = toPillar("year", lunar.getYearInGanZhi());
  const monthPillar = toPillar("month", lunar.getMonthInGanZhi());
  const dayPillar = toPillar("day", lunar.getDayInGanZhi());
  const hourPillar = hasHourPillar ? toPillar("hour", lunar.getTimeInGanZhi()) : undefined;
  const pillarList = [yearPillar, monthPillar, dayPillar, ...(hourPillar ? [hourPillar] : [])];
  const calendarType: CalendarType = input.calendarType || "solar";
  const gender: Gender = input.gender || "unspecified";

  return {
    resultCode: createResultCode(input),
    pillars: {
      year: yearPillar,
      month: monthPillar,
      day: dayPillar,
      ...(hourPillar ? { hour: hourPillar } : {})
    },
    pillarList,
    hasHourPillar,
    calendarType,
    gender,
    calculationNote: hasHourPillar
      ? "本结果使用历法库按输入日期与中国标准时间生成，作为八字五行参考。"
      : "因出生时间未填写，本结果为基础八字五行参考，只使用年柱、月柱、日柱生成。",
    cityInfo: {
      city: input.birthCity,
      timezone: input.timezone || "Asia/Shanghai",
      longitude: input.longitude,
      usesTrueSolarTime: false
    },
    options: {
      useLateZiHourNextDay: Boolean(input.useLateZiHourNextDay)
    }
  };
}

export function getElementFromStemOrBranch(value: string): ElementKey | undefined {
  return getStemElement(value) || getBranchElement(value);
}

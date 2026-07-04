import Link from "next/link";
import { Camera, MessageCircle, Store } from "lucide-react";
import { BaziChart } from "@/components/BaziChart";
import { FiveElementStrength } from "@/components/FiveElementStrength";
import { JewelryEnergyAdvice } from "@/components/JewelryEnergyAdvice";
import { calculateBaziChart } from "@/lib/bazi-calculator";
import { analyzeElementStrength } from "@/lib/element-strength";
import { elementLabels, elementOrder } from "@/lib/element-mapping";
import { getCombinedJewelryRecommendation } from "@/lib/jewelry-recommendation";
import { createPersonalityProfile } from "@/lib/personality-profile";
import type { BirthInput, CalendarType, Gender } from "@/lib/types";

type ResultPageProps = {
  searchParams: {
    birthDate?: string;
    birthTime?: string;
    birthCity?: string;
    timeUnknown?: string;
    timezone?: string;
    calendarType?: CalendarType;
    gender?: Gender;
  };
};

export default function ResultPage({ searchParams }: ResultPageProps) {
  const input: BirthInput = {
    birthDate: searchParams.birthDate || "",
    birthTime: searchParams.birthTime || undefined,
    birthCity: searchParams.birthCity || "",
    isBirthTimeUnknown: searchParams.timeUnknown === "true",
    calendarType: searchParams.calendarType || "solar",
    gender: searchParams.gender || "unspecified",
    timezone: searchParams.timezone || "Asia/Shanghai"
  };

  if (!input.birthDate || !input.birthCity || (!input.birthTime && !input.isBirthTimeUnknown)) {
    return (
      <main className="container-shell py-16">
        <div className="brand-card mx-auto max-w-xl p-8 text-center">
          <h1 className="font-title text-3xl text-ink">还缺少出生信息</h1>
          <p className="mt-4 text-sm leading-7 text-muted">请先填写出生日期、时间和城市，再查看你的五行珠宝建议。</p>
          <Link href="/test" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory shadow-jewel">
            返回填写
          </Link>
        </div>
      </main>
    );
  }

  const chart = calculateBaziChart(input);
  const strength = analyzeElementStrength(chart);
  const combinedAdvice = getCombinedJewelryRecommendation({
    primaryElement: strength.primaryElement,
    secondaryElements: strength.secondaryElements,
    avoidElements: strength.avoidElements
  });
  const profile = createPersonalityProfile({
    metalScore: strength.elementScores.metal,
    woodScore: strength.elementScores.wood,
    waterScore: strength.elementScores.water,
    fireScore: strength.elementScores.fire,
    earthScore: strength.elementScores.earth,
    strongestElement: strength.strongestElement,
    primaryElement: strength.primaryElement
  });

  return (
    <main className="container-shell py-8 sm:py-10">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-champagne/25 bg-ivory shadow-jewel">
        <div className="ink-gradient px-6 py-9 text-center text-ivory sm:px-8">
          <p className="text-xs tracking-[0.32em] text-champagne">BAZI WUXING JEWELRY GUIDE</p>
          <h1 className="mt-3 font-title text-4xl font-normal leading-tight sm:text-5xl">你的八字五行珠宝建议</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ivory/76">
            这是到店试戴参考，请让店员根据此结果为你推荐适合的珠宝。
          </p>
        </div>

        <div className="space-y-5 p-4 sm:p-6">
          <BaziChart chart={chart} />
          <FiveElementStrength strength={strength} />

          <section className="brand-card p-5 sm:p-6">
            <p className="text-xs tracking-[0.24em] text-oldgold">TEMPERAMENT</p>
            <h2 className="mt-2 font-title text-2xl text-ink">你的五行性格画像</h2>
            <h3 className="mt-5 font-title text-3xl font-normal leading-tight text-ink">{profile.personalityTitle}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.temperamentKeywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-champagne/20 bg-warmgray/60 px-3 py-1 text-xs text-lacquer">
                  {keyword}
                </span>
              ))}
            </div>
            <p className="mt-5 text-base leading-8 text-lacquer">{profile.personalityDescription}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SoftText label="你的情绪" value={profile.emotionalStyle} />
              <SoftText label="性格特点" value={profile.lifeAttitude} />
            </div>
            <div className="mt-4 rounded-2xl border border-champagne/15 bg-warmgray/45 p-4">
              <p className="text-xs text-muted">为什么推荐这种珠宝</p>
              <p className="mt-2 text-sm leading-7 text-lacquer">{profile.whyThisJewelry}</p>
            </div>
          </section>

          <JewelryEnergyAdvice
            primaryElement={strength.primaryElement}
            secondaryElements={strength.secondaryElements}
            avoidElements={strength.avoidElements}
          />

          <section className="rounded-3xl bg-ink p-5 text-ivory shadow-jewel sm:p-6">
            <div className="flex items-center gap-2 text-champagne">
              <MessageCircle size={18} />
              <h2 className="text-sm font-medium">给店员看的推荐提示</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-ivory/78">{combinedAdvice.staffTip}</p>
          </section>

          <details className="rounded-3xl border border-champagne/25 bg-warmgray/45 p-4">
            <summary className="cursor-pointer text-sm font-medium text-lacquer">命理师查看</summary>
            <div className="mt-4 space-y-3 text-xs leading-6 text-muted">
              <p>五行分数：{elementOrder.map((element) => `${elementLabels[element]} ${strength.elementScores[element]}`).join(" / ")}</p>
              <p>主要补充：{elementLabels[strength.primaryElement]}</p>
              <p>
                辅助搭配：
                {strength.secondaryElements.map((item) => `${elementLabels[item.element]}：${item.reason}，score ${item.supportScore}`).join(" / ") || "暂无"}
              </p>
              <p>建议少用：{strength.avoidElements.map((item) => `${elementLabels[item.element]}：${item.reason}`).join(" / ") || "暂无"}</p>
              <pre className="whitespace-pre-wrap rounded-2xl bg-ivory p-3 text-[11px] leading-5 text-lacquer">{strength.internalReasoning}</pre>
            </div>
          </details>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-4xl">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3 rounded-3xl border border-champagne/20 bg-ivory p-4 shadow-soft">
            <Store className="mt-1 shrink-0 text-oldgold" size={20} />
            <p className="text-sm leading-7 text-lacquer">{strength.customerExplanation}</p>
          </div>
          <div className="flex gap-3 rounded-3xl border border-champagne/20 bg-ivory p-4 shadow-soft">
            <Camera className="mt-1 shrink-0 text-oldgold" size={20} />
            <p className="text-sm leading-7 text-lacquer">建议截图保存此结果，方便店员为你对比颜色、宝石和试戴风格。</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function SoftText({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-champagne/15 bg-warmgray/45 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 text-sm leading-7 text-lacquer">{value}</p>
    </div>
  );
}

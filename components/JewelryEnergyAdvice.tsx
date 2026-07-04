import { elementLabels, getElementTheme } from "@/lib/element-mapping";
import { getCombinedJewelryRecommendation } from "@/lib/jewelry-recommendation";
import type { ElementDecision, ElementKey } from "@/lib/types";

type JewelryEnergyAdviceProps = {
  primaryElement: ElementKey;
  secondaryElements: ElementDecision[];
  avoidElements?: ElementDecision[];
};

export function JewelryEnergyAdvice({ primaryElement, secondaryElements, avoidElements = [] }: JewelryEnergyAdviceProps) {
  const advice = getCombinedJewelryRecommendation({ primaryElement, secondaryElements, avoidElements });
  const primaryTheme = getElementTheme(primaryElement);

  return (
    <section className="brand-card p-5 sm:p-6">
      <p className="text-xs tracking-[0.24em] text-oldgold">JEWELRY ADVICE</p>
      <h2 className="mt-2 font-title text-2xl text-ink">本次珠宝建议</h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <ElementPanel title="主要补充" elements={[primaryElement]} dark />
        <ElementPanel title="可以搭配" elements={secondaryElements.map((item) => item.element)} emptyText="暂不增加" />
        <ElementPanel title="建议少用" elements={avoidElements.map((item) => item.element)} emptyText="暂无" />
      </div>

      <div className="mt-5 rounded-3xl bg-ink p-5 text-ivory shadow-jewel">
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${primaryTheme.bg} ${primaryTheme.text} ${primaryTheme.border}`}>
          主推 {elementLabels[primaryElement]}
        </span>
        <p className="mt-4 text-base leading-8 text-ivory/82">{advice.customerAdvice}</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <AdviceItem label="适合颜色组合" value={advice.colorPalette.join(" / ")} />
        <AdviceItem label="适合宝石组合" value={advice.gemstoneOptions.join(" / ")} />
        <AdviceItem label="适合材质" value={advice.materialOptions.join(" / ")} />
        <AdviceItem label="适合佩戴风格" value={advice.wearingStyle} />
      </div>

      {avoidElements.length > 0 ? (
        <div className="mt-5 rounded-2xl bg-warmgray/60 p-4">
          <p className="text-xs text-muted">不作为优先方向</p>
          <p className="mt-2 text-sm leading-7 text-lacquer">
            {advice.avoidColors.join(" / ")} 色调，以及 {advice.avoidGemstones.join(" / ")} 可先不作为主推方向。
          </p>
        </div>
      ) : null}
    </section>
  );
}

function ElementPanel({ title, elements, dark = false, emptyText }: { title: string; elements: ElementKey[]; dark?: boolean; emptyText?: string }) {
  return (
    <div className={`rounded-2xl border p-4 ${dark ? "border-ink bg-ink text-ivory shadow-jewel" : "border-champagne/20 bg-ivory text-ink"}`}>
      <p className={dark ? "text-xs text-champagne" : "text-xs text-muted"}>{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {elements.length > 0 ? (
          elements.map((element) => {
            const theme = getElementTheme(element);
            return (
              <span key={element} className={`rounded-full border px-3 py-1 text-sm font-medium ${theme.bg} ${theme.text} ${theme.border}`}>
                {elementLabels[element]}
              </span>
            );
          })
        ) : (
          <span className="text-sm text-muted">{emptyText}</span>
        )}
      </div>
    </div>
  );
}

function AdviceItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-champagne/15 bg-warmgray/45 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 text-sm leading-7 text-ink">{value}</p>
    </div>
  );
}

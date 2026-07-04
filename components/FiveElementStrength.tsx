import { elementLabels, elementOrder, getElementTheme } from "@/lib/element-mapping";
import type { ElementKey, ElementStrengthResult } from "@/lib/types";

type FiveElementStrengthProps = {
  strength: ElementStrengthResult;
};

export function FiveElementStrength({ strength }: FiveElementStrengthProps) {
  const secondarySet = new Set(strength.secondaryElements.map((item) => item.element));

  return (
    <section className="brand-card p-5 sm:p-6">
      <p className="text-xs tracking-[0.24em] text-oldgold">FIVE ELEMENTS</p>
      <h2 className="mt-2 font-title text-2xl text-ink">五行能量分布</h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <SummaryItem label="气质较明显" element={strength.strongestElement} />
        <SummaryItem label="主要补充" element={strength.primaryElement} highlight />
        <SummaryItem label="辅助搭配" text={strength.secondaryElements.map((item) => elementLabels[item.element]).join("、") || "暂不增加"} />
      </div>

      <div className="mt-6 space-y-4">
        {elementOrder.map((element) => {
          const theme = getElementTheme(element);
          const isPrimary = element === strength.primaryElement;
          const isSecondary = secondarySet.has(element);

          return (
            <div key={element} className={isPrimary || isSecondary ? "rounded-2xl bg-warmgray/55 p-3" : "px-1"}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${theme.bg} ${theme.text} ${theme.border}`}>
                  {elementLabels[element]}
                </span>
                <span className="text-muted">{strength.elementScores[element]} 分</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-palegray/80">
                <div className={`h-full rounded-full ${theme.bar}`} style={{ width: `${Math.min(strength.elementScores[element], 100)}%` }} />
              </div>
              {isPrimary ? <p className="mt-2 text-xs text-lacquer">本次主要补充方向</p> : null}
              {isSecondary ? <p className="mt-2 text-xs text-muted">可作为辅助搭配</p> : null}
            </div>
          );
        })}
      </div>

      <p className="mt-5 rounded-2xl bg-warmgray/55 p-4 text-sm leading-7 text-lacquer">{strength.customerExplanation}</p>
    </section>
  );
}

function SummaryItem({ label, element, text, highlight = false }: { label: string; element?: ElementKey; text?: string; highlight?: boolean }) {
  const theme = element ? getElementTheme(element) : undefined;

  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "border-ink bg-ink text-ivory shadow-jewel" : "border-champagne/20 bg-ivory text-ink"}`}>
      <p className={highlight ? "text-xs text-champagne" : "text-xs text-muted"}>{label}</p>
      <p className={`mt-2 font-title text-3xl font-normal ${highlight ? "text-champagne" : theme?.text || "text-ink"}`}>
        {element ? elementLabels[element] : text}
      </p>
    </div>
  );
}

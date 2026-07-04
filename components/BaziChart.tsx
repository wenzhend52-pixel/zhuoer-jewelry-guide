import type React from "react";
import { elementLabels, getElementTheme } from "@/lib/element-mapping";
import type { BaziChartResult, BaziPillar, ElementKey, PillarKey } from "@/lib/types";

const pillarKeys: PillarKey[] = ["year", "month", "day", "hour"];

type BaziChartProps = {
  chart: BaziChartResult;
};

export function BaziChart({ chart }: BaziChartProps) {
  return (
    <section className="brand-card p-5 sm:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.24em] text-oldgold">BAZI CHART</p>
          <h2 className="mt-2 font-title text-2xl text-ink">四柱排盘</h2>
        </div>
        <p className="text-right text-xs leading-5 text-muted">{chart.calendarType === "lunar" ? "农历输入" : "阳历输入"}</p>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-champagne/20 bg-ivory/80">
        <table className="w-full min-w-[520px] border-separate border-spacing-0 text-center">
          <thead>
            <tr className="bg-warmgray/60">
              <th className="w-16 border-b border-champagne/15 px-3 py-3 text-left text-xs font-normal text-muted">项目</th>
              {pillarKeys.map((key) => (
                <th key={key} className="border-b border-champagne/15 px-3 py-3 text-sm font-medium text-lacquer">
                  {chart.pillars[key]?.label || "时柱"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <ChartRow label="天干" render={(pillar) => (pillar ? <StemBranchCell value={pillar.stem} element={pillar.stemElement} /> : <EmptyCell />)} chart={chart} />
            <ChartRow label="地支" render={(pillar) => (pillar ? <StemBranchCell value={pillar.branch} element={pillar.branchElement} /> : <EmptyCell />)} chart={chart} />
            <ChartRow
              label="五行"
              render={(pillar) =>
                pillar ? (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <ElementTag element={pillar.stemElement} prefix="干" />
                    <ElementTag element={pillar.branchElement} prefix="支" />
                  </div>
                ) : (
                  <EmptyCell />
                )
              }
              chart={chart}
            />
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-2xl bg-warmgray/60 p-4 text-xs leading-6 text-muted">{chart.calculationNote}</p>
    </section>
  );
}

function ChartRow({
  label,
  render,
  chart
}: {
  label: string;
  render: (pillar?: BaziPillar) => React.ReactNode;
  chart: BaziChartResult;
}) {
  return (
    <tr>
      <th className="border-b border-champagne/10 px-3 py-3 text-left text-xs font-normal text-muted">{label}</th>
      {pillarKeys.map((key) => (
        <td key={key} className="border-b border-champagne/10 px-2 align-middle">
          {render(chart.pillars[key])}
        </td>
      ))}
    </tr>
  );
}

function StemBranchCell({ value, element }: { value: string; element: ElementKey }) {
  const theme = getElementTheme(element);

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <span className="font-title text-4xl font-normal leading-none text-ink">{value}</span>
      <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${theme.bg} ${theme.text} ${theme.border}`}>
        {elementLabels[element]}
      </span>
    </div>
  );
}

function ElementTag({ element, prefix }: { element: ElementKey; prefix: string }) {
  const theme = getElementTheme(element);

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${theme.bg} ${theme.text} ${theme.border}`}>
      {prefix} {elementLabels[element]}
    </span>
  );
}

function EmptyCell() {
  return <span className="inline-flex py-5 text-xs text-muted">未填写</span>;
}

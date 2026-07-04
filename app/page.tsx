import Link from "next/link";
import { ArrowRight, ClipboardList, Gem, Store } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "输入出生信息", text: "填写出生日期、时间与城市，生成五行参考。" },
  { icon: Gem, title: "查看五行建议", text: "了解主要补充、辅助搭配和适合优先选择的珠宝方向。" },
  { icon: Store, title: "由店员推荐", text: "到店试戴时，让店员根据结果匹配实物珠宝。" }
];

export default function HomePage() {
  return (
    <main className="pb-14">
      <section className="container-shell pt-12 sm:pt-16">
        <div className="brand-card overflow-hidden">
          <div className="ink-gradient px-6 py-12 text-center text-ivory sm:px-10 sm:py-16">
            <p className="text-xs tracking-[0.32em] text-champagne">ZHUOER JEWELRY GUIDE</p>
            <h1 className="mx-auto mt-5 max-w-2xl font-title text-5xl font-normal leading-tight sm:text-6xl">
              八字五行珠宝建议
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-ivory/74">
              根据八字五行，为你找到更适合的珠宝能量方向，作为到店试戴与店员推荐的温和参考。
            </p>
            <div className="mt-8">
              <Link
                href="/test"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3 text-sm font-semibold text-ink shadow-jewel transition hover:bg-ivory"
              >
                开始五行分析 <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 bg-ivory p-5 sm:grid-cols-3 sm:p-7">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-champagne/20 bg-porcelain/70 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-champagne/18 text-oldgold">
                    <step.icon size={18} />
                  </span>
                  <span className="text-xs text-muted">0{index + 1}</span>
                </div>
                <h2 className="mt-4 font-title text-2xl font-normal text-ink">{step.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

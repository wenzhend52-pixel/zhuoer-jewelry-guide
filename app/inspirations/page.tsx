import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getElementOptions } from "@/lib/wuxing";

export default function InspirationsPage() {
  return (
    <main className="container-shell py-10">
      <section>
        <p className="text-sm tracking-[0.32em] text-oldgold">WUXING INSPIRATION</p>
        <h1 className="mt-4 font-title text-4xl font-normal leading-tight text-ink sm:text-5xl">五行珠宝灵感</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          这里展示每种五行适合的颜色、宝石、材质与到店搭配方向，帮助客户和店员更快进入试戴沟通。
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {getElementOptions().map((item) => (
          <article key={item.key} className="brand-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-title text-5xl font-normal text-ink">{item.label}</p>
                <h2 className="mt-2 font-title text-3xl font-normal text-lacquer">{item.title}</h2>
              </div>
              <Link href={`/jewelries?element=${item.key}`} className="rounded-full border border-champagne/30 bg-ivory p-3 text-lacquer transition hover:border-oldgold">
                <ArrowRight size={18} />
              </Link>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{item.mood}</p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-champagne/15 bg-warmgray/45 p-4">
                <p className="text-xs text-muted">适合颜色</p>
                <p className="mt-2 text-sm text-ink">{item.colors.join(" / ")}</p>
              </div>
              <div className="rounded-2xl border border-champagne/15 bg-warmgray/45 p-4">
                <p className="text-xs text-muted">适合宝石与材质</p>
                <p className="mt-2 text-sm leading-6 text-ink">
                  {item.gemstones.join(" / ")} · {item.materials.join(" / ")}
                </p>
              </div>
              <div className="rounded-2xl bg-ink p-4 text-ivory">
                <p className="text-xs text-champagne">到店搭配建议</p>
                <p className="mt-2 text-sm leading-7 text-ivory/76">{item.stylingAdvice}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

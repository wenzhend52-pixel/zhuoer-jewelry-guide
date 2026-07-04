import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getElementOptions } from "@/lib/wuxing";

const simpleDescriptions: Record<string, string> = {
  metal: "适合明亮、精致、有品质感的珠宝",
  wood: "适合自然、清透、有生命力的珠宝",
  water: "适合沉静、柔和、有内涵的珠宝",
  fire: "适合明亮、显气色、有存在感的珠宝",
  earth: "适合温润、稳重、有贵气感的珠宝"
};

export default function ElementsPage() {
  return (
    <main className="container-shell py-10">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm tracking-[0.32em] text-oldgold">FIVE ELEMENTS</p>
        <h1 className="mt-4 font-title text-4xl font-normal leading-tight text-ink sm:text-5xl">五行珠宝方向</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          每一种五行，都对应一种气质与珠宝语言。到店试戴时，可以根据结果优先选择相应颜色、宝石与材质。
        </p>
      </section>

      <section className="mx-auto mt-8 grid max-w-3xl gap-4">
        {getElementOptions().map((item) => (
          <article key={item.key} className="brand-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-title text-4xl font-normal text-ink">{item.label}</p>
                <h2 className="mt-1 font-title text-2xl font-normal text-lacquer">{item.title}</h2>
              </div>
              <Link href={`/jewelries?element=${item.key}`} className="rounded-full border border-champagne/30 bg-ivory p-3 text-lacquer transition hover:border-oldgold">
                <ArrowRight size={18} />
              </Link>
            </div>
            <p className="mt-4 text-base leading-8 text-lacquer">{simpleDescriptions[item.key]}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.colors.slice(0, 3).map((color) => (
                <span key={color} className="rounded-full border border-champagne/20 bg-warmgray/50 px-3 py-1 text-xs text-muted">
                  {color}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

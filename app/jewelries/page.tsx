import Link from "next/link";
import { JewelryCard } from "@/components/JewelryCard";
import { listJewelries } from "@/lib/db";
import type { ElementKey } from "@/lib/types";
import { elementMeta, getElementOptions } from "@/lib/wuxing";

type JewelriesPageProps = {
  searchParams: {
    element?: ElementKey;
  };
};

export default async function JewelriesPage({ searchParams }: JewelriesPageProps) {
  const selectedElement = searchParams.element;
  const allJewelries = await listJewelries();
  const filteredJewelries = selectedElement ? allJewelries.filter((jewelry) => jewelry.element === selectedElement) : allJewelries;

  return (
    <main className="container-shell py-10">
      <section>
        <p className="text-sm tracking-[0.32em] text-oldgold">IN-STORE JEWELRIES</p>
        <h1 className="mt-4 font-title text-4xl font-normal leading-tight text-ink sm:text-5xl">店内珠宝展示</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          这里展示店内可参考的珠宝样式。请根据五行建议咨询店员，并在现场试戴对比。
        </p>
      </section>

      <nav className="mt-8 flex gap-2 overflow-x-auto pb-2">
        <Link href="/jewelries" className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-sm ${!selectedElement ? "border-ink bg-ink text-ivory shadow-soft" : "border-champagne/30 bg-ivory text-lacquer"}`}>
          全部
        </Link>
        {getElementOptions().map((item) => (
          <Link key={item.key} href={`/jewelries?element=${item.key}`} className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-sm ${selectedElement === item.key ? "border-ink bg-ink text-ivory shadow-soft" : "border-champagne/30 bg-ivory text-lacquer"}`}>
            {item.label} · {elementMeta[item.key].gemstones[0]}
          </Link>
        ))}
      </nav>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJewelries.map((jewelry) => (
          <JewelryCard key={jewelry.id} jewelry={jewelry} />
        ))}
      </section>
    </main>
  );
}

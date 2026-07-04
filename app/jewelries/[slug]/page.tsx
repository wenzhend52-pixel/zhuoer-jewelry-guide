import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Store } from "lucide-react";
import { ElementBadge } from "@/components/ElementBadge";
import { jewelries } from "@/lib/jewelries";
import { elementMeta } from "@/lib/wuxing";

type JewelryDetailProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return jewelries.map((jewelry) => ({
    slug: jewelry.slug
  }));
}

export const dynamicParams = false;

export default function JewelryDetailPage({ params }: JewelryDetailProps) {
  const jewelry = jewelries.find((item) => item.slug === params.slug || item.id === params.slug);

  if (!jewelry) {
    notFound();
  }

  const meta = elementMeta[jewelry.element];

  return (
    <main className="container-shell py-10">
      <Link href="/jewelries" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink">
        <ArrowLeft size={16} /> 返回店内珠宝展示
      </Link>
      <section className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-warmgray shadow-soft">
          <Image src={jewelry.imageUrl} alt={jewelry.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
        </div>
        <div className="brand-card p-6 sm:p-8">
          <ElementBadge element={jewelry.element} />
          <h1 className="mt-5 font-title text-4xl font-normal leading-tight text-ink sm:text-5xl">{jewelry.name}</h1>
          <p className="mt-4 text-sm leading-8 text-muted">{jewelry.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {jewelry.styleTags.map((tag) => (
              <span key={tag} className="rounded-full border border-champagne/15 bg-warmgray/55 px-3 py-1 text-xs text-lacquer">
                {tag}
              </span>
            ))}
          </div>

          <div className="gold-line my-7" />

          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <InfoItem label="材质" value={jewelry.material} />
            <InfoItem label="宝石" value={jewelry.gemstone} />
            <InfoItem label="所属五行" value={`${meta.label} · ${meta.title}`} />
            <InfoItem label="展示状态" value="请咨询店员" />
          </dl>

          <div className="mt-6 rounded-3xl bg-ink p-5 text-ivory shadow-jewel">
            <div className="flex items-center gap-2 text-champagne">
              <Store size={18} />
              <p className="text-sm">到店试戴建议</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-ivory/76">{jewelry.tryOnNote}</p>
          </div>

          <div className="mt-4 rounded-3xl border border-champagne/20 bg-ivory p-5">
            <div className="flex items-center gap-2 text-lacquer">
              <MessageCircle size={18} />
              <p className="text-sm font-medium">推荐理由</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">{jewelry.recommendationReason}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-champagne/20 bg-ivory p-4">
      <dt className="text-muted">{label}</dt>
      <dd className="mt-2 text-lacquer">{value}</dd>
    </div>
  );
}

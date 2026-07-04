import Image from "next/image";
import Link from "next/link";
import { ElementBadge } from "@/components/ElementBadge";
import type { StoreJewelry } from "@/lib/types";

export function JewelryCard({ jewelry }: { jewelry: StoreJewelry }) {
  return (
    <Link
      href={`/jewelries/${jewelry.slug}`}
      className="group overflow-hidden rounded-[24px] border border-champagne/20 bg-ivory shadow-soft transition hover:-translate-y-1 hover:border-champagne/55 hover:shadow-jewel"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-warmgray">
        <Image
          src={jewelry.imageUrl}
          alt={jewelry.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-title text-xl font-normal text-ink">{jewelry.name}</h3>
          <p className="mt-1 text-sm text-muted">
            {jewelry.gemstone} · {jewelry.material}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {jewelry.styleTags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-champagne/15 bg-warmgray/55 px-3 py-1 text-xs text-lacquer">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 pt-1">
          <ElementBadge element={jewelry.element} />
          <span className="text-xs text-muted">请咨询店员</span>
        </div>
      </div>
    </Link>
  );
}

import { Suspense } from "react";
import { JewelriesClient } from "./JewelriesClient";

export default function JewelriesPage() {
  return (
    <Suspense
      fallback={
        <main className="container-shell py-10">
          <div className="brand-card p-6">
            <p className="text-sm leading-7 text-muted">正在整理店内珠宝展示。</p>
          </div>
        </main>
      }
    >
      <JewelriesClient />
    </Suspense>
  );
}

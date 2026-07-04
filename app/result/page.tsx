import { Suspense } from "react";
import { ResultClient } from "./ResultClient";

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="container-shell py-16">
          <div className="brand-card mx-auto max-w-xl p-8 text-center">
            <h1 className="font-title text-3xl text-ink">正在生成建议</h1>
            <p className="mt-4 text-sm leading-7 text-muted">请稍候，系统正在整理你的五行珠宝方向。</p>
          </div>
        </main>
      }
    >
      <ResultClient />
    </Suspense>
  );
}

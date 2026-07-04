import type React from "react";
import { Edit3, FileText, Gem, Plus } from "lucide-react";
import { jewelries } from "@/lib/jewelries";
import { getElementOptions } from "@/lib/wuxing";

export default function AdminPage() {
  return (
    <main className="container-shell py-10">
      <section>
        <p className="text-sm tracking-[0.32em] text-oldgold">STAFF ADMIN</p>
        <h1 className="mt-4 font-title text-4xl font-normal leading-tight text-ink sm:text-5xl">后台管理基础页</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          第一版使用 mock 数据展示管理结构。后续接入 Supabase 后，店员或店主可维护珠宝资料、五行标签和推荐话术。
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard icon={<Gem className="text-oldgold" size={24} />} value={String(jewelries.length)} label="店内珠宝资料" />
        <StatCard icon={<FileText className="text-oldgold" size={24} />} value={String(getElementOptions().length)} label="五行推荐模板" />
        <StatCard icon={<Edit3 className="text-oldgold" size={24} />} value="MVP" label="暂不启用登录权限" />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="brand-card p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-title text-3xl font-normal text-ink">珠宝资料管理</h2>
            <button className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm text-ivory shadow-soft">
              <Plus size={16} /> 添加珠宝
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {jewelries.map((jewelry) => (
              <div key={jewelry.id} className="rounded-2xl border border-champagne/20 bg-ivory p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{jewelry.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      {jewelry.gemstone} · {jewelry.material}
                    </p>
                  </div>
                  <span className="rounded-full border border-champagne/20 bg-warmgray/55 px-3 py-1 text-xs text-lacquer">编辑</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{jewelry.tryOnNote}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="brand-card p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-title text-3xl font-normal text-ink">推荐话术模板</h2>
            <button className="inline-flex items-center gap-2 rounded-full border border-champagne/35 bg-ivory px-4 py-2.5 text-sm text-lacquer">
              <Plus size={16} /> 添加模板
            </button>
          </div>
          <div className="mt-5 space-y-3">
            {getElementOptions().map((item) => (
              <div key={item.key} className="rounded-2xl border border-champagne/20 bg-ivory p-4">
                <p className="font-medium text-ink">
                  {item.label} · {item.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">{item.staffScript}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="brand-card p-5">
      {icon}
      <p className="mt-4 font-title text-3xl font-normal text-ink">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

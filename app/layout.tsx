import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "卓尔 | 八字五行珠宝建议",
  description: "高级珠宝门店里的私人五行珠宝顾问"
};

const navItems = [
  { href: "/", label: "首页" },
  { href: "/test", label: "分析" },
  { href: "/elements", label: "五行" },
  { href: "/jewelries", label: "珠宝" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="sticky top-0 z-40 border-b border-champagne/20 bg-ivory/88 backdrop-blur-xl">
          <nav className="container-shell flex h-16 items-center justify-between gap-3">
            <Link href="/" className="shrink-0">
              <span className="font-title text-2xl font-normal tracking-[0.08em] text-ink">卓尔</span>
            </Link>
            <div className="flex max-w-[74vw] items-center gap-1 overflow-x-auto rounded-full border border-champagne/25 bg-ivory/70 p-1 text-sm shadow-soft">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-3.5 py-2 text-lacquer transition hover:bg-champagne/12 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        {children}
        <footer className="mt-16 border-t border-champagne/20 bg-lacquer text-ivory">
          <div className="container-shell py-9">
            <p className="font-title text-3xl font-normal tracking-[0.08em]">卓尔</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-ivory/68">
              八字五行珠宝建议工具。结果仅作为到店试戴参考，请由店员结合实物、肤色与佩戴场景进行推荐。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

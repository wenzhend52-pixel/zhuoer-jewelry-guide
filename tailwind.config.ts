import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "#F7F1E8",
        ivory: "#FFFBF3",
        ink: "#17130F",
        lacquer: "#342A22",
        muted: "#857B70",
        champagne: "#C9A45D",
        oldgold: "#A47B3B",
        palegray: "#E8DFD2",
        warmgray: "#EFE9DF",
        jade: "#7FA58D"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(44, 34, 24, 0.08)",
        jewel: "0 14px 40px rgba(76, 54, 31, 0.10)"
      },
      fontFamily: {
        title: ["var(--font-title)", "Noto Serif SC", "Songti SC", "SimSun", "serif"],
        body: ["var(--font-body)", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "sans-serif"],
        serif: ["var(--font-title)", "Noto Serif SC", "Songti SC", "SimSun", "serif"],
        sans: ["var(--font-body)", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

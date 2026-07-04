"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock3, MapPin, UserRound } from "lucide-react";
import type { CalendarType, Gender } from "@/lib/types";

export default function TestPage() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthCity, setBirthCity] = useState("");
  const [calendarType, setCalendarType] = useState<CalendarType>("solar");
  const [gender, setGender] = useState<Gender>("unspecified");
  const [isBirthTimeUnknown, setIsBirthTimeUnknown] = useState(false);

  function submitTest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({
      birthDate,
      birthCity,
      calendarType,
      gender,
      timeUnknown: String(isBirthTimeUnknown),
      timezone: "Asia/Shanghai"
    });

    if (!isBirthTimeUnknown && birthTime) {
      params.set("birthTime", birthTime);
    }

    router.push(`/result?${params.toString()}`);
  }

  return (
    <main className="container-shell py-10">
      <section className="mx-auto max-w-xl">
        <p className="text-sm tracking-[0.32em] text-oldgold">BAZI WUXING GUIDE</p>
        <h1 className="mt-4 font-title text-4xl font-normal leading-tight text-ink sm:text-5xl">八字五行珠宝分析</h1>
        <p className="mt-4 text-base leading-8 text-muted">
          请填写出生信息。系统会生成八字五行参考，并给出适合到店试戴的颜色、宝石、材质与气质方向。
        </p>

        <form onSubmit={submitTest} className="brand-card mt-8 space-y-6 p-5 sm:p-7">
          <div>
            <span className="mb-3 block text-sm font-medium text-lacquer">日期类型</span>
            <div className="grid grid-cols-2 gap-3">
              <ChoiceButton active={calendarType === "solar"} onClick={() => setCalendarType("solar")} label="阳历" />
              <ChoiceButton active={calendarType === "lunar"} onClick={() => setCalendarType("lunar")} label="农历" />
            </div>
          </div>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-lacquer">
              <CalendarDays size={17} /> 出生日期
            </span>
            <input
              required
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="w-full rounded-2xl border border-champagne/35 bg-ivory px-4 py-4 text-base text-ink outline-none transition focus:border-oldgold focus:ring-2 focus:ring-champagne/25"
            />
          </label>

          <div>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-lacquer">
                <Clock3 size={17} /> 出生时间
              </span>
              <input
                required={!isBirthTimeUnknown}
                disabled={isBirthTimeUnknown}
                type="time"
                value={birthTime}
                onChange={(event) => setBirthTime(event.target.value)}
                className="w-full rounded-2xl border border-champagne/35 bg-ivory px-4 py-4 text-base text-ink outline-none transition focus:border-oldgold focus:ring-2 focus:ring-champagne/25 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>
            <label className="mt-3 flex items-center gap-3 text-sm text-lacquer">
              <input
                type="checkbox"
                checked={isBirthTimeUnknown}
                onChange={(event) => {
                  setIsBirthTimeUnknown(event.target.checked);
                  if (event.target.checked) {
                    setBirthTime("");
                  }
                }}
                className="h-4 w-4 rounded border-champagne/40 text-ink"
              />
              不确定出生时间
            </label>
          </div>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-lacquer">
              <MapPin size={17} /> 出生城市
            </span>
            <input
              required
              value={birthCity}
              onChange={(event) => setBirthCity(event.target.value)}
              placeholder="例如：杭州"
              className="w-full rounded-2xl border border-champagne/35 bg-ivory px-4 py-4 text-base text-ink outline-none transition placeholder:text-muted/55 focus:border-oldgold focus:ring-2 focus:ring-champagne/25"
            />
          </label>

          <div>
            <span className="mb-3 flex items-center gap-2 text-sm font-medium text-lacquer">
              <UserRound size={17} /> 性别
            </span>
            <div className="grid grid-cols-3 gap-3">
              <ChoiceButton active={gender === "female"} onClick={() => setGender("female")} label="女" />
              <ChoiceButton active={gender === "male"} onClick={() => setGender("male")} label="男" />
              <ChoiceButton active={gender === "unspecified"} onClick={() => setGender("unspecified")} label="不填写" />
            </div>
          </div>

          <button type="submit" className="w-full rounded-full bg-ink px-6 py-4 text-base font-medium text-ivory shadow-jewel transition hover:bg-lacquer">
            生成我的八字五行珠宝建议
          </button>
        </form>
      </section>
    </main>
  );
}

function ChoiceButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3.5 text-sm font-medium transition ${
        active ? "border-ink bg-ink text-ivory shadow-soft" : "border-champagne/30 bg-ivory text-lacquer hover:border-oldgold"
      }`}
    >
      {label}
    </button>
  );
}

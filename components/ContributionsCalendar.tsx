"use client";

import { useEffect, useMemo, useState } from "react";

type Day = { date: string; count: number; level: number };
type ApiResponse = { total: Record<string, number>; contributions: Day[] };

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LEVEL_BG = [
  "bg-[var(--level-0)]",
  "bg-[var(--level-1)]",
  "bg-[var(--level-2)]",
  "bg-[var(--level-3)]",
  "bg-[var(--level-4)]",
];

function formatDay(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

const placeholderClass = "font-sans text-[0.8125rem] text-muted";

export default function ContributionsCalendar({ username }: { username: string }) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json();
      })
      .then((json: ApiResponse) => {
        setData(json);
        const years = Object.keys(json.total).sort();
        setYear(years[years.length - 1]);
      })
      .catch(() => setFailed(true));
  }, [username]);

  const cells = useMemo(() => {
    if (!data || !year) return null;
    const yearDays = data.contributions.filter((d) => d.date.startsWith(year));
    if (yearDays.length === 0) return null;

    const firstWeekday = new Date(`${year}-01-01T00:00:00Z`).getUTCDay();
    const padded: (Day | null)[] = [...Array(firstWeekday).fill(null), ...yearDays];
    while (padded.length % 7 !== 0) padded.push(null);

    const weeks: (Day | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      weeks.push(padded.slice(i, i + 7));
    }

    let lastMonth = -1;
    const items: { key: string; type: "label" | "day" | "pad"; day?: Day; label?: string }[] = [];
    weeks.forEach((week, weekIndex) => {
      const firstReal = week.find((d) => d !== null);
      let label = "";
      if (firstReal) {
        const month = new Date(`${firstReal.date}T00:00:00Z`).getUTCMonth();
        if (month !== lastMonth) {
          label = MONTHS[month];
          lastMonth = month;
        }
      }
      items.push({ key: `label-${weekIndex}`, type: "label", label });
      week.forEach((day, dayIndex) => {
        if (day) {
          items.push({ key: `${weekIndex}-${dayIndex}`, type: "day", day });
        } else {
          items.push({ key: `${weekIndex}-${dayIndex}`, type: "pad" });
        }
      });
    });
    return items;
  }, [data, year]);

  if (failed) {
    return (
      <p className={placeholderClass}>
        Could not load contribution data from{" "}
        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    );
  }

  if (!data || !year || !cells) {
    return <p className={placeholderClass}>Loading contributions...</p>;
  }

  const years = Object.keys(data.total).sort();
  const count = data.total[year] ?? 0;

  return (
    <div>
      <div className="flex items-baseline justify-between flex-wrap gap-x-4 gap-y-2 mb-3.5">
        <p className="font-sans text-[0.8125rem] text-muted">
          {count} contribution{count === 1 ? "" : "s"} in {year}
        </p>
        <div className="flex gap-1" role="group" aria-label="Select year">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className={`font-sans text-[0.75rem] font-medium px-[9px] py-[3px] border bg-transparent cursor-pointer hover:border-current ${
                y === year ? "text-fg border-fg" : "text-muted border-border"
              }`}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto p-0.5">
        <div className="inline-grid grid-flow-col [grid-template-rows:14px_repeat(7,10px)] gap-[3px] items-start">
          {cells.map((item) => {
            if (item.type === "label") {
              return (
                <span
                  key={item.key}
                  className="font-sans text-[0.6875rem] text-muted whitespace-nowrap leading-none"
                >
                  {item.label}
                </span>
              );
            }
            if (item.type === "pad") {
              return <span key={item.key} className="block w-[10px] h-[10px] bg-transparent" />;
            }
            const day = item.day!;
            return (
              <span key={item.key} className="group relative">
                <span className={`block w-[10px] h-[10px] ${LEVEL_BG[day.level] ?? LEVEL_BG[0]}`} />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 -translate-x-1/2 whitespace-nowrap bg-fg px-1.5 py-1 font-sans text-[0.625rem] leading-none text-surface opacity-0 transition-opacity duration-100 ease-in-out group-hover:opacity-100">
                  {day.count} contribution{day.count === 1 ? "" : "s"} on {formatDay(day.date)}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

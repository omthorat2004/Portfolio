"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ContributionsCalendar.module.css";

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
      <p className={styles.placeholder}>
        Could not load contribution data from{" "}
        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    );
  }

  if (!data || !year || !cells) {
    return <p className={styles.placeholder}>Loading contributions...</p>;
  }

  const years = Object.keys(data.total).sort();
  const count = data.total[year] ?? 0;

  return (
    <div>
      <div className={styles.head}>
        <p className={styles.count}>
          {count} contribution{count === 1 ? "" : "s"} in {year}
        </p>
        <div className={styles.years} role="group" aria-label="Select year">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className={y === year ? styles.yearButtonActive : styles.yearButton}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.scrollArea}>
        <div className={styles.calendarGrid}>
          {cells.map((item) => {
            if (item.type === "label") {
              return (
                <span key={item.key} className={styles.monthLabel}>
                  {item.label}
                </span>
              );
            }
            if (item.type === "pad") {
              return <span key={item.key} className={`${styles.day} ${styles.pad}`} />;
            }
            const day = item.day!;
            return (
              <span
                key={item.key}
                className={`${styles.day} ${styles[`level${day.level}` as keyof typeof styles] ?? ""}`}
                title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

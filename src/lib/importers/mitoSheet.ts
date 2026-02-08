import { parse } from "csv-parse/sync";

type DoseEvent = {
  med: string;
  date: string;
  amount: number | null;
  unit: "mg" | "IU";
};

const vitaminDMatcher = /^vitamin d$/i;

function parseValue(value: string | undefined): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === "na" || trimmed.toLowerCase() === "n/a") {
    return null;
  }
  const normalized = trimmed.replace(/,/g, "");
  const parsed = Number(normalized);
  if (Number.isNaN(parsed)) return null;
  if (parsed === 0) return null;
  return parsed;
}

export function parseMitoSheet(csvText: string) {
  const rows = parse(csvText, { relax_column_count: true });
  if (!rows.length) {
    return { events: [] as DoseEvent[], summary: [] as string[] };
  }

  const header = rows[0] as string[];
  const rawDates = header.slice(1);

  const parsedDates: Array<Date | null> = rawDates.map((raw) => {
    const value = (raw ?? "").trim();
    if (!value) return null;
    const parts = value.split("/");
    if (parts.length !== 3) return null;
    const [m, d, y] = parts;
    const month = Number(m);
    const day = Number(d);
    const year = Number(y);
    if (!month || !day || !year) return null;
    return new Date(year, month - 1, day);
  });

  const indexByDate = new Map<number, number[]>();
  parsedDates.forEach((date, idx) => {
    if (!date) return;
    const key = date.getTime();
    const list = indexByDate.get(key) ?? [];
    list.push(idx);
    indexByDate.set(key, list);
  });

  const events: DoseEvent[] = [];
  const summary: string[] = [];

  for (const row of rows.slice(1)) {
    const med = String(row[0] ?? "").trim();
    if (!med) continue;
    const unit: DoseEvent["unit"] = vitaminDMatcher.test(med) ? "IU" : "mg";

    const dateValues = new Map<number, number | null>();
    indexByDate.forEach((indices, key) => {
      const lastIndex = indices[indices.length - 1];
      const cellValue = row[lastIndex + 1];
      dateValues.set(key, parseValue(cellValue));
    });

    let prev: number | null | "__unset__" = "__unset__";
    const sortedDates = Array.from(dateValues.keys()).sort((a, b) => a - b);

    for (const key of sortedDates) {
      const value = dateValues.get(key) ?? null;
      if (value !== prev) {
        const date = new Date(key);
        const isoDate = date.toISOString().slice(0, 10);
        events.push({ med, date: isoDate, amount: value, unit });
        prev = value;
      }
    }

    summary.push(med);
  }

  return { events, summary };
}

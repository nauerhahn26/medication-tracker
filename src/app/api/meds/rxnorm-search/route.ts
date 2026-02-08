import { NextResponse } from "next/server";

type RxTermsResponse = [
  number,
  string[],
  Record<string, string[]>,
  string[][],
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query")?.trim() ?? "";
  if (!query) {
    return NextResponse.json({ meds: [] });
  }

  const apiUrl = new URL(
    "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search",
  );
  apiUrl.searchParams.set("terms", query);
  apiUrl.searchParams.set("df", "DISPLAY_NAME");
  apiUrl.searchParams.set("ef", "SXDG_RXCUI");
  apiUrl.searchParams.set("maxList", "10");

  const res = await fetch(apiUrl.toString(), { cache: "no-store" });
  if (!res.ok) {
    return NextResponse.json({ meds: [] });
  }

  const data = (await res.json()) as RxTermsResponse;
  const displayList = data[3] ?? [];
  const extras = data[2] ?? {};
  const rxcuiList = extras.SXDG_RXCUI ?? [];

  const meds = displayList.map((display, index) => {
    const name = display?.[0] ?? "";
    const rxcui = rxcuiList?.[index]?.[0] ?? null;
    return { name, rxcui };
  });

  return NextResponse.json({ meds });
}

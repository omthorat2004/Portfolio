import { createHash } from "node:crypto";

// Counts page views (every hit) and unique visitors (distinct hashed IPs) in
// Upstash Redis via its REST API. Env vars come from the Vercel Upstash
// integration (KV_REST_API_*) or a manual Upstash setup (UPSTASH_REDIS_REST_*).
const URL_ = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

type Command = (string | number)[];

async function pipeline(commands: Command[]): Promise<number[] | null> {
  if (!URL_ || !TOKEN) return null;
  try {
    const res = await fetch(`${URL_}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: number }[];
    return json.map((r) => Number(r.result ?? 0));
  } catch {
    return null;
  }
}

function respond(result: number[] | null, viewsAt: number, visitorsAt: number) {
  return Response.json(
    result
      ? { views: result[viewsAt], visitors: result[visitorsAt] }
      : { views: null, visitors: null },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET() {
  const result = await pipeline([["GET", "views"], ["SCARD", "visitors"]]);
  return respond(result, 0, 1);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  // Store only a salted hash, never the raw IP.
  const hash = createHash("sha256").update(`om-thorat:${ip}`).digest("hex").slice(0, 32);
  const result = await pipeline([
    ["INCR", "views"],
    ["SADD", "visitors", hash],
    ["SCARD", "visitors"],
  ]);
  return respond(result, 0, 2);
}

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Important: this endpoint must NEVER be statically cached.
// Otherwise a desktop browser can receive an older snapshot while another device
// has already written newer leads to the local store.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const file = path.join(process.cwd(), "data", "leads.json");

type Lead = {
  id: string;
  email: string;
  whatsapp: string;
  name: string;
  dominant: string;
  secondary: string;
  readingTitle: string;
  recommendedCrystals: string[];
  source: string;
  utmSource: string;
  utmCampaign: string;
  testCompletedAt: string;
  updatedAt: string;
  status: string;
};

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  // Atomic replace reduces the chance of a half-written JSON file during refresh.
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(leads, null, 2), "utf8");
  await fs.rename(tmp, file);
}

function noStore(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      ...(init?.headers || {}),
    },
  });
}

export async function GET() {
  const leads = await readLeads();
  return noStore({ leads, count: leads.length, serverTime: new Date().toISOString() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const whatsapp = String(body.whatsapp || "").trim();

    if (!email && !whatsapp) {
      return noStore({ error: "Email or WhatsApp is required" }, { status: 400 });
    }

    const leads = await readLeads();
    const now = new Date().toISOString();
    const existing = leads.find(
      (x) => (email && x.email === email) || (whatsapp && x.whatsapp === whatsapp)
    );

    const record: Lead = {
      id: existing?.id || crypto.randomUUID(),
      email: email || existing?.email || "",
      whatsapp: whatsapp || existing?.whatsapp || "",
      name: String(body.name || existing?.name || ""),
      dominant: String(body.dominant || existing?.dominant || ""),
      secondary: String(body.secondary || existing?.secondary || ""),
      readingTitle: String(body.readingTitle || existing?.readingTitle || ""),
      recommendedCrystals: Array.isArray(body.recommendedCrystals)
        ? body.recommendedCrystals
        : existing?.recommendedCrystals || [],
      source: String(body.source || existing?.source || "direct"),
      utmSource: String(body.utmSource || existing?.utmSource || ""),
      utmCampaign: String(body.utmCampaign || existing?.utmCampaign || ""),
      testCompletedAt: String(body.testCompletedAt || existing?.testCompletedAt || now),
      updatedAt: now,
      status: existing?.status || "lead",
    };

    const next = existing
      ? leads.map((x) => (x.id === existing.id ? record : x))
      : [record, ...leads];

    await writeLeads(next);
    return noStore({ ok: true, lead: record, count: next.length });
  } catch (error) {
    console.error("[LUNARA] Unable to save lead", error);
    return noStore({ error: "Unable to save lead" }, { status: 500 });
  }
}

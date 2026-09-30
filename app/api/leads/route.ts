import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/leads/delivery";
import { leadTypes, validateLead, type LeadPayload, type LeadType } from "@/lib/leads/schema";
import { checkSpam } from "@/lib/leads/spam";

const MAX_BODY = 20_000;

function clip(v: unknown, n = 300) {
  return typeof v === "string" ? v.slice(0, n) : undefined;
}

export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > MAX_BODY) return NextResponse.json({ ok: false, error: "too-large" }, { status: 413 });

  let body: Partial<LeadPayload>;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  if (!body.type || !leadTypes.includes(body.type as LeadType)) {
    return NextResponse.json({ ok: false, error: "bad-type" }, { status: 400 });
  }

  const spam = await checkSpam({
    hp: typeof body.hp === "string" ? body.hp : "",
    startedAt: Number(body.startedAt) || 0,
    turnstileToken: clip(body.turnstileToken, 4000),
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
  });
  if (!spam.ok) {
    if (spam.reason === "turnstile") {
      return NextResponse.json({ ok: false, error: "verification" }, { status: 400 });
    }
    // Pretend success so bots get no signal.
    return NextResponse.json({ ok: true, delivered: true });
  }

  const { values, errors, valid } = validateLead(body.type as LeadType, body.fields ?? {});
  if (!valid) return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });

  const meta = body.meta ?? {};
  try {
    const delivered = await deliverLead({
      type: body.type as LeadType,
      fields: values,
      meta: {
        itemId: clip(meta.itemId, 50),
        itemSku: clip(meta.itemSku, 50),
        itemTitle: clip(meta.itemTitle, 200),
        pagePath: clip(meta.pagePath, 300),
        lang: clip(meta.lang, 5),
      },
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, delivered });
  } catch {
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }
}

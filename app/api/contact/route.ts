import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || "";

export async function POST(req: NextRequest) {
  if (!WEBHOOK_URL) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await req.json();

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

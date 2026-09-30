import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EMAIL_RE } from "@/lib/waitlist";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "obliviox@zohomail.in";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "obliviox@zohomail.in";
const CC_EMAIL =
  process.env.CONTACT_CC_EMAIL ?? "yashrajmeen@gmail.com";

const SMTP_HOST = process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.in";
const SMTP_PORT = Number(process.env.ZOHO_SMTP_PORT ?? "465");
const SMTP_USER = process.env.ZOHO_SMTP_USER ?? "obliviox@zohomail.in";
const SMTP_PASS = process.env.ZOHO_SMTP_PASS ?? "";

const MAX_NAME = 80;
const MAX_EMAIL = 120;
const MAX_CRAFT = 40;
const MAX_SOURCE = 40;

const hits = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now >= entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

type Body = {
  name?: unknown;
  email?: unknown;
  craft?: unknown;
  source?: unknown;
  company?: unknown;
};

function asTrimmedString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "too many requests, try again shortly" },
      { status: 429 },
    );
  }

  if (!SMTP_PASS) {
    return NextResponse.json(
      { ok: false, error: "waitlist is not configured" },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid payload" },
      { status: 400 },
    );
  }

  const name = asTrimmedString(body.name, MAX_NAME);
  const email = asTrimmedString(body.email, MAX_EMAIL);
  const craft = asTrimmedString(body.craft, MAX_CRAFT);
  const source = asTrimmedString(body.source, MAX_SOURCE);
  const honeypot = asTrimmedString(body.company, MAX_NAME);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "valid email required", field: "email" },
      { status: 400 },
    );
  }

  const who = name || email;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      cc: CC_EMAIL,
      replyTo: email,
      subject: `[EditTrack] waitlist from ${who}`,
      text: [
        name ? `Name: ${name}` : null,
        `Email: ${email}`,
        craft ? `Craft: ${craft}` : null,
        source ? `Source: ${source}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[waitlist] Zoho SMTP error:", detail);
    return NextResponse.json(
      { ok: false, error: "transmission failed" },
      { status: 502 },
    );
  }
}

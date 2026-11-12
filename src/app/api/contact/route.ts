import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { allow, clientIp } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";

// Until SMTP is configured here, requests are passed to the mailer the old site used,
// so no call request is lost during the switch-over.
const LEGACY_MAILER = "https://cs-tutoring-mfiz.vercel.app/api/emailer";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  if (!allow(`contact:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot field: real visitors never fill it in.
  if (clean(data.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(data.name, 120);
  const business = clean(data.business, 160);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 40);
  const bestTime = clean(data.bestTime, 60);
  const message = clean(data.message, 2000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const subject = `Call request: ${name}${business ? ` (${business})` : ""}`.replace(/[\r\n]+/g, " ");
  const text = [
    `Name: ${name}`,
    `Business: ${business || "-"}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Best time to call: ${bestTime || "Any time, Mon-Fri"}`,
    "",
    message,
  ].join("\n");

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  try {
    if (user && pass) {
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT || 465),
        secure: (process.env.SMTP_PORT || "465") === "465",
        auth: { user, pass },
      });
      await transport.sendMail({
        from: `"${site.name} website" <${user}>`,
        to: process.env.CONTACT_TO || user,
        replyTo: email,
        subject,
        text,
      });
    } else {
      const res = await fetch(LEGACY_MAILER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: JSON.stringify({ name, email, subject, message: text }) }),
      });
      if (!res.ok) throw new Error(`Legacy mailer responded ${res.status}`);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form failed:", err);
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
}

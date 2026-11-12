import { NextResponse } from "next/server";
import { allow, clientIp } from "@/lib/rate-limit";
import { priceNote, services, site } from "@/lib/site";

export const runtime = "nodejs";

// The front-counter helper is off unless OPENAI_API_KEY is set.
const apiKey = () => process.env.OPENAI_API_KEY;
const model = () => process.env.OPENAI_MODEL || "gpt-4.1-mini";

const MAX_MESSAGES = 16;
const MAX_CHARS = 500;

const catalogue = services
  .map(
    (s) =>
      `${s.title}:\n` +
      s.items.map((i) => `- ${i.name}: ${i.plain} Typical range ${i.range}${i.unit ? ` ${i.unit}` : ""}.`).join("\n")
  )
  .join("\n\n");

const systemPrompt = `You are the front-counter helper on the website of ${site.name}, an owner-led tech shop in ${site.city} serving ${site.area}.

You talk with small-business owners who are not technical. Rules:
- Plain, friendly, direct English. No jargon and no buzzwords. If a technical term is unavoidable, explain it in a few words.
- Keep answers short: 2 to 5 sentences. No markdown, no bullet symbols, no headings.
- Ask at most one question at a time to understand their business.
- Only describe services from the list below. If something isn't on it, say you're not sure and that it's worth asking on a call.
- Prices: you may quote the typical ranges below, always as ranges. Never give an exact quote, discount, deadline or guarantee. ${priceNote}
- Be honest when AI is not the right tool for a problem.
- You cannot book appointments, take payments or see any customer records. To go further, point them to the "Book a call" page (/contact) or the phone number ${site.phone}.
- Never claim to be a person. Don't ask for sensitive personal or payment details.
- Stay on the subject of this business and how technology could help the visitor's business. Politely decline anything else.

Services and typical ranges:
${catalogue}`;

export async function GET() {
  return NextResponse.json({ enabled: Boolean(apiKey()) });
}

export async function POST(req: Request) {
  const key = apiKey();
  if (!key) return NextResponse.json({ error: "Not enabled" }, { status: 503 });

  if (!allow(`counter:${clientIp(req)}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages)
    ? body.messages
        .filter(
          (m): m is { role: "user" | "assistant"; content: string } =>
            Boolean(m) && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
        )
        .slice(-MAX_MESSAGES)
        .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === "user" ? MAX_CHARS : 2000) }))
    : [];

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: model(),
        max_completion_tokens: 400,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });
    if (!res.ok) throw new Error(`OpenAI responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error("Empty reply");
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Counter helper failed:", err);
    return NextResponse.json({ error: "Unavailable" }, { status: 502 });
  }
}

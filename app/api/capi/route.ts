import { NextRequest, NextResponse } from "next/server";
import { sendToMetaCapi } from "@/app/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate payload
    if (!body || !body.event_name) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Capture IP and User-Agent
    // Note: Next.js edge/node gets IP from headers like x-forwarded-for if behind proxy/vercel
    const forwardedFor = req.headers.get("x-forwarded-for");
    let ip = "127.0.0.1";
    if (forwardedFor) {
      ip = forwardedFor.split(",")[0].trim();
    }
    const userAgent = req.headers.get("user-agent") || "";

    // Send async (we don't strictly need to await it to return 200 fast, but Vercel serverless might kill it if we don't await)
    await sendToMetaCapi(body, { ip, userAgent });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CAPI API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

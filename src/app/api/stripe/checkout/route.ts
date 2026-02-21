import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getEnv } from "@/lib/env";

export async function POST() {
  const session = await stripe().checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: getEnv("STRIPE_PRICE_ID"), quantity: 1 }],
    success_url: `${getEnv("NEXT_PUBLIC_SITE_URL")}/welcome`,
    cancel_url: `${getEnv("NEXT_PUBLIC_SITE_URL")}/`,
    allow_promotion_codes: true
  });

  return NextResponse.json({ url: session.url });
}

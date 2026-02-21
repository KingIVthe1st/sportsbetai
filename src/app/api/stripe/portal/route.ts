import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";
import { getUserFromAuthHeader } from "@/lib/auth";
import { getEnv } from "@/lib/env";

export async function POST(req: Request) {
  const auth = await getUserFromAuthHeader(req.headers.get("authorization"));
  if (!auth?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("stripe_customer_id")
    .eq("email", auth.user.email)
    .maybeSingle();

  if (!subscriber?.stripe_customer_id) {
    return NextResponse.json({ error: "No stripe customer found" }, { status: 404 });
  }

  const session = await stripe().billingPortal.sessions.create({
    customer: subscriber.stripe_customer_id,
    return_url: `${getEnv("NEXT_PUBLIC_SITE_URL")}/portal`
  });

  return NextResponse.json({ url: session.url });
}

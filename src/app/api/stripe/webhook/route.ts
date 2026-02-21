import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { getEnv } from "@/lib/env";
import { resend } from "@/lib/resend";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, signature, getEnv("STRIPE_WEBHOOK_SECRET"));
  } catch (error) {
    return NextResponse.json({ error: `Webhook Error: ${(error as Error).message}` }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string | null;
    const subscriptionId = session.subscription as string | null;
    const email = session.customer_details?.email;

    if (email) {
      await supabase.from("subscribers").upsert(
        {
          email,
          status: "active",
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          updated_at: new Date().toISOString()
        },
        { onConflict: "email" }
      );

      await resend().emails.send({
        from: getEnv("FROM_EMAIL"),
        to: email,
        subject: "Welcome to AI Sports Betting Pro",
        html: "<p>You're in. Picks arrive daily at 3pm ET.</p>"
      });
    }
  }

  if (event.type === "customer.subscription.created") {
    const sub = event.data.object as Stripe.Subscription;
    await supabase
      .from("subscribers")
      .update({ status: "active", stripe_subscription_id: sub.id, updated_at: new Date().toISOString() })
      .eq("stripe_customer_id", sub.customer as string);
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    await supabase
      .from("subscribers")
      .update({ status: "canceled", updated_at: new Date().toISOString() })
      .eq("stripe_customer_id", sub.customer as string);
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    await supabase
      .from("subscribers")
      .update({ status: "past_due", updated_at: new Date().toISOString() })
      .eq("stripe_customer_id", invoice.customer as string);
  }

  return NextResponse.json({ received: true });
}

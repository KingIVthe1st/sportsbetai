import Stripe from "stripe";
import { getEnv } from "@/lib/env";

let stripeClient: Stripe | null = null;

export function stripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(getEnv("STRIPE_SECRET_KEY"), {
      apiVersion: "2025-02-24.acacia"
    });
  }
  return stripeClient;
}

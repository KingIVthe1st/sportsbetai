"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CheckoutButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button className={className} size="lg" onClick={handleCheckout} disabled={loading}>
      {loading ? "Redirecting..." : "Join Today's Picks - $250/mo"}
    </Button>
  );
}

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4">
      <Card className="w-full p-10 text-center">
        <h1 className="text-4xl font-bold">You're in.</h1>
        <p className="mt-4 text-lg text-text-muted">Picks arrive daily at 3pm ET.</p>
        <p className="mt-2 text-sm text-text-muted">Add our sender to your contacts to improve deliverability.</p>
        <Button asChild className="mt-8">
          <Link href="/portal">Go to Portal</Link>
        </Button>
      </Card>
    </div>
  );
}

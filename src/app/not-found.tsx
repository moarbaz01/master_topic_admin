// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="max-w-md text-center shadow-lg p-6">
        <CardContent>
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

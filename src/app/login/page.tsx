"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSendLink() {
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setLoading(false);
    setStatus(error ? error.message : "Lien envoyé. Check tes emails.");
  }

  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="ton@email.ch"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-full" onClick={onSendLink} disabled={!email || loading}>
            {loading ? "Envoi..." : "Recevoir un lien de connexion"}
          </Button>
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </CardContent>
      </Card>
    </main>
  );
}

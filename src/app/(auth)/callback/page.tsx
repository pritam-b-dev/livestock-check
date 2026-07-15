"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { storeSessionToken } from "@/lib/actions/auth-session";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  useEffect(() => {
    const finalize = async () => {
      const { data } = await authClient.token();
      if (data?.token) {
        await storeSessionToken(data.token);
      }
      window.location.href = "/dashboard";
    };
    finalize();
  }, []);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-6 h-6 animate-spin text-moss" />
      <p className="text-sm text-zinc-500">Signing you in...</p>
    </div>
  );
}

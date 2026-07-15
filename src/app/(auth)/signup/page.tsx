"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa6";
import { ArrowRight, Loader2, User, Mail, Lock } from "lucide-react";
import { authClient, signIn } from "@/lib/auth-client";
import { storeSessionToken } from "@/lib/actions/auth-session";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to create account.");
      } else {
        const { data } = await authClient.token();
        if (data?.token) {
          await storeSessionToken(data.token);
        }
        toast.success("Account created successfully!");
        window.location.href = "/dashboard";
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "An error occurred during sign up.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/callback`,
      });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Google authentication failed.";
      toast.error(msg);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-default border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm space-y-6 shadow-xl">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sprout/30 bg-sprout/10 text-sprout text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-sprout animate-pulse" />
          Get Started
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground">
          Create an Account
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Join LiveStock-Check to manage and track your livestock seamlessly
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-default border border-zinc-300 dark:border-zinc-800 bg-background focus:outline-none focus:ring-2 focus:ring-moss/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-default border border-zinc-300 dark:border-zinc-800 bg-background focus:outline-none focus:ring-2 focus:ring-moss/50 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-default border border-zinc-300 dark:border-zinc-800 bg-background focus:outline-none focus:ring-2 focus:ring-moss/50 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-default bg-moss hover:bg-sprout text-zinc-950 font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
        <span className="bg-background px-3 text-[10px] uppercase text-zinc-500 font-medium absolute">
          Or
        </span>
      </div>

      {/* Google Auth */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full py-2.5 px-4 rounded-default border border-zinc-300 dark:border-zinc-800 bg-background hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-foreground font-medium text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <FaGoogle className="w-3.5 h-3.5 text-red-500" />
            Continue with Google
          </>
        )}
      </button>

      {/* Redirect Link */}
      <p className="text-center text-xs text-zinc-500">
        Already have an account?{" "}
        <Link href="/signin" className="text-moss font-medium hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}

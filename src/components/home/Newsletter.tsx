"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-20 bg-zinc-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
            Ready to streamline your farm inventory?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Subscribe to our newsletter for product updates, best practices on
            stock tracking, and early feature access.
          </p>
        </div>

        {/* Form or Success Toast */}
        <div className="max-w-md mx-auto">
          {submitted ? (
            <div className="p-4 rounded-xl bg-moss/20 border border-moss/40 text-moss flex items-center justify-center gap-2 text-sm font-medium animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Thanks for subscribing! Check your inbox soon.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-moss hover:bg-moss/90 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shrink-0 shadow-lg shadow-moss/20"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        <p className="text-xs text-zinc-500">
          No spam ever. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

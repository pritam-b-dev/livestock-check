"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Package, ShieldCheck } from "lucide-react";

// Preview mock items for hero visualization
const SAMPLE_PREVIEW_ITEMS = [
  {
    id: "1",
    name: "Premium Dairy Feed 25kg",
    sku: "FD-2024-001",
    category: "Feed & Nutrition",
    price: "$34.50",
    status: "In Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Automated Water Trough",
    sku: "EQ-2024-089",
    category: "Equipment",
    price: "$180.00",
    status: "In Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=300&auto=format&fit=crop",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[65vh] lg:min-h-[70vh] flex flex-col justify-between overflow-hidden bg-white dark:bg-zinc-950 pt-12 pb-6">
      {/* Ambient Pulsing Glow Motif (Moss & Harbor soft radial blur) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] sm:w-[700px] sm:h-[450px] rounded-full bg-gradient-to-tr from-moss/20 via-harbor/15 to-transparent blur-[120px] opacity-60 animate-pulse"
        style={{ animationDuration: "6s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tagline / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-moss/20 bg-moss/5 text-moss text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Real-Time Livestock & Inventory Management</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-heading leading-[1.15]">
              Track every item your business owns,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-moss via-emerald-600 to-harbor">
                in one workspace
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl">
              Effortlessly monitor feeds, equipment, healthcare supplies, and
              livestock records. Keep your entire team synced with clear,
              actionable inventory insights.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-moss hover:bg-moss/90 text-white font-semibold text-sm transition-all shadow-md shadow-moss/15 hover:shadow-lg hover:shadow-moss/25 active:scale-[0.98]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/items"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-semibold text-sm transition-all active:scale-[0.98]"
              >
                <Package className="w-4 h-4 text-zinc-500" />
                <span>Explore Items</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Subtle Item Cards Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative hidden sm:block"
          >
            <div className="relative space-y-4 max-w-md mx-auto lg:max-w-none">
              {SAMPLE_PREVIEW_ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-zinc-900/5 transition-transform duration-300 hover:-translate-y-0.5 ${
                    index === 1 ? "ml-6 sm:ml-8" : ""
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/50 dark:border-zinc-700/50">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {item.name}
                      </h4>
                      <span className="text-xs font-bold font-mono text-moss">
                        {item.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                      <span>{item.category}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Cue Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8">
        <a
          href="#features"
          className="group flex flex-col items-center gap-1 text-xs font-medium text-zinc-400 hover:text-moss transition-colors"
          aria-label="Scroll to features"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-zinc-400 group-hover:text-moss" />
        </a>
      </div>
    </section>
  );
}

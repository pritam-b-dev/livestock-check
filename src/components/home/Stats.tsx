"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  description: string;
}

const STATS: StatItemProps[] = [
  {
    value: 500,
    suffix: "+",
    label: "Businesses",
    description: "Trusted by livestock management teams and farm enterprises",
  },
  {
    value: 50000,
    suffix: "+",
    label: "Items Tracked",
    description: "Active livestock, supplies & farm equipment recorded",
  },
  {
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Uptime",
    description: "Reliable real-time stock sync with guaranteed stability",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support",
    description: "Dedicated technical support around the clock for your farm",
  },
];

function StatCard({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  description,
}: StatItemProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const node = ref.current;
      if (!node) return;

      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (decimals === 0) {
            node.textContent = Math.floor(latest).toLocaleString();
          } else {
            node.textContent = latest.toFixed(decimals);
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, hasAnimated, decimals]);

  return (
    <div
      ref={containerRef}
      className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-sm"
    >
      <div className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100 flex items-center">
        <span>{prefix}</span>
        <span ref={ref}>0</span>
        <span>{suffix}</span>
      </div>
      <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
        {label}
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
        {description}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-moss uppercase">
            Proven Impact
          </h2>
          <p className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
            Empowering agricultural teams with data-driven results
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

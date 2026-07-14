import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl flex flex-col justify-between p-8 transition-all duration-200 ${
        plan.popular
          ? "bg-white dark:bg-zinc-900 border-2 border-moss shadow-xl shadow-moss/10 lg:-translate-y-2"
          : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-moss/40"
      }`}
    >
      {/* Most Popular Badge for Middle Tier */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-moss text-white text-xs font-semibold shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Most Popular</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
            {plan.name}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 min-h-[36px] leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {plan.period}
            </span>
          )}
        </div>

        {/* Features List */}
        <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            What&apos;s Included
          </div>
          <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-moss shrink-0 stroke-[2.5]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button (Wired in F22) */}
      <div className="pt-8">
        <Link
          href={`/signup?plan=${plan.id}`}
          className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center transition-all ${
            plan.popular
              ? "bg-moss hover:bg-moss/90 text-white shadow-md shadow-moss/20"
              : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
          }`}
        >
          {plan.buttonText}
        </Link>
      </div>
    </div>
  );
}

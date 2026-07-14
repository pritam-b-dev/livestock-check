import { getUserSession } from "@/lib/core/session";
import { PricingCard, PricingPlan } from "@/components/pricing/PricingCard";

export const metadata = {
  title: "Pricing Plans | LiveStock-Check",
  description:
    "Choose the right inventory tracking plan for your farm or business operations.",
};

const PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Livestock-Check-Free",
    price: "$0",
    description:
      "Ideal for small farms getting started with basic stock tracking.",
    features: [
      "Track up to 20 items",
      "Single user workspace",
      "Public shareable item links",
      "Standard email support",
      "Basic inventory search",
    ],
    buttonText: "Start Free",
  },
  {
    id: "growth",
    name: "Livestock-Check-Growth",
    price: "$19.99 USD",
    period: "/ month",
    description:
      "Perfect for growing teams requiring multi-user access & stock insights.",
    popular: true,
    features: [
      "Track up to 500 items",
      "Up to 5 team members",
      "Real-time stock alerts",
      "Shareable item pages with analytics",
      "Priority email & chat support",
      "CSV export & import",
    ],
    buttonText: "Get Started with Growth",
  },
  {
    id: "business",
    name: "Livestock-Check-Business",
    price: "$29.99 USD",
    period: "/ month",
    description:
      "Built for large livestock operations with unlimited scaling requirements.",
    features: [
      "Unlimited items tracking",
      "Unlimited team seats",
      "Advanced analytics dashboard",
      "Custom item categories & tags",
      "24/7 Dedicated technical support",
      "Custom integration options",
    ],
    buttonText: "Get Started with Business",
  },
];

export default async function PricingPage() {
  const session = await getUserSession();
  const isLoggedIn = Boolean(session?.user);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-moss uppercase">
            Transparent Pricing
          </h2>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-zinc-900 dark:text-zinc-50">
            Simple plans for every farm size
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Start free and upgrade as your inventory grows. No hidden fees or
            surprise contracts.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isLoggedIn={isLoggedIn} />
          ))}
        </div>

        {/* Note */}
        <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 pt-6">
          Need custom enterprise features or invoice billing?{" "}
          <a href="/contact" className="text-moss underline font-semibold">
            Contact our sales team
          </a>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  Boxes,
  Target,
  ShieldCheck,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Us | LiveStock-Check",
  description:
    "Learn about LiveStock-Check's mission to simplify farm and livestock inventory tracking for businesses worldwide.",
};

const VALUES = [
  {
    icon: Target,
    title: "Clarity & Simplicity",
    description:
      "We replace messy spreadsheets and complex enterprise software with intuitive, clean interfaces that anyone on your farm can master in minutes.",
  },
  {
    icon: ShieldCheck,
    title: "Data Integrity & Trust",
    description:
      "Your livestock numbers and supply records are critical assets. We ensure maximum reliability, enterprise-grade encryption, and uptime.",
  },
  {
    icon: Zap,
    title: "Real-Time Actionability",
    description:
      "Inventory data shouldn't sit dormant. We provide immediate alerts on low feed, medical supplies, and stock levels so you can act before shortages occur.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Farm management is a collective effort. Our platform empowers managers, field workers, and buyers to stay on the same page effortlessly.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Hero Header */}
      <section className="relative py-20 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moss/10 text-moss text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Purpose</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-zinc-900 dark:text-zinc-50 max-w-3xl mx-auto leading-tight">
            Empowering modern farms with effortless inventory clarity
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            LiveStock-Check was built to eliminate spreadsheet chaos and bring
            real-time, shareable, and reliable stock tracking to growing
            agricultural businesses.
          </p>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-xs font-semibold tracking-wider text-moss uppercase">
                Our Story
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
                Born out of real farm management challenges
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Managing livestock, feed stocks, equipment, and medical supplies
                across multiple fields used to mean scattered paper logs,
                outdated Excel sheets, and missed reorder deadlines.
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We started LiveStock-Check with a simple goal: build a
                centralized workspace where small and medium-sized farm
                operations could record, track, and share inventory instantly
                without needing technical expertise.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-moss/10 text-moss">
                <Boxes className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Our Mission
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                To bridge the gap between traditional farm management and modern
                digital efficiency—helping business owners save time, reduce
                waste, and scale operations with confidence.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-xs font-semibold tracking-wider text-moss uppercase">
                Core Principles
              </h2>
              <p className="text-2xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
                What drives our platform
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm hover:border-moss/40 transition-all duration-200"
                  >
                    <div className="p-2.5 w-fit rounded-lg bg-zinc-100 dark:bg-zinc-800 text-moss">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                      {val.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-zinc-900 text-white border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            Ready to take control of your farm inventory?
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Join hundreds of farm managers who have simplified their stock
            tracking today.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-moss hover:bg-moss/90 text-white font-semibold text-sm transition-all shadow-md shadow-moss/20"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

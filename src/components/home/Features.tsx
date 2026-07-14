import { Boxes, Share2, LayoutDashboard, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: Boxes,
    title: "Real-Time Stock Tracking",
    description:
      "Monitor livestock inventory, feed supplies, and equipment in real-time with automatic low-stock notifications.",
  },
  {
    icon: Share2,
    title: "Shareable Item Pages",
    description:
      "Generate clean, accessible public links for your items to quickly share details with team members or buyers.",
  },
  {
    icon: LayoutDashboard,
    title: "Team-Ready Dashboard",
    description:
      "Centralized workspace designed for farm managers and team members to collaborate on inventory updates effortlessly.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description:
      "Get actionable insights into stock consumption trends, total value, and reorder patterns with built-in analytics.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-20 bg-zinc-50/50 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-moss uppercase">
            Everything You Need
          </h2>
          <p className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
            Smart inventory management built for modern livestock farms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm hover:border-moss/40 hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 w-fit rounded-xl bg-moss/10 text-moss">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

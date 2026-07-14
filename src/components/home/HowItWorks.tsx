import { UserPlus, PackagePlus, Share2 } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: UserPlus,
    title: "Sign Up & Set Up",
    description:
      "Create your free workspace in under 2 minutes and invite team members to collaborate effortlessly.",
  },
  {
    step: "02",
    icon: PackagePlus,
    title: "Add Your Inventory",
    description:
      "Record livestock, feeds, machinery, and healthcare supplies with details, SKUs, and images.",
  },
  {
    step: "03",
    icon: Share2,
    title: "Track & Share",
    description:
      "Monitor stock movements in real-time and generate clean, shareable item links for clients or buyers.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-moss uppercase">
            Simple 3-Step Process
          </h2>
          <p className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
            How LiveStock-Check Works
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 space-y-4 shadow-sm hover:border-moss/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-moss/10 text-moss">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-zinc-300 dark:text-zinc-700">
                    {step.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.description}
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

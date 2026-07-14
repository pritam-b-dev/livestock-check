import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "LiveStock-Check cut our monthly stock-take time in half.",
    name: "Farhana Akter",
    role: "Operations Manager, BrightRetail Ltd.",
  },
  {
    quote: "Finally, an inventory tool our whole team actually likes using.",
    name: "Tanvir Ahmed",
    role: "Founder, UrbanCraft Furniture",
  },
  {
    quote:
      "The shareable item links make coordinating with vendors so much easier.",
    name: "Nusrat Jahan",
    role: "Warehouse Lead, GreenLeaf Electronics",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-moss uppercase">
            User Testimonials
          </h2>
          <p className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 dark:text-zinc-100">
            Trusted by teams everywhere
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm hover:border-moss/40 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-500 stroke-none"
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-moss/20" />
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {item.name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

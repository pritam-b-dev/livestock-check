import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { Stats } from "@/components/home/Stats";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <FeaturedItems />
      <HowItWorks />
      <Testimonials />
      <Stats />
    </main>
  );
}

import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { Stats } from "@/components/home/Stats";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <FeaturedItems />
      <Stats />
    </main>
  );
}

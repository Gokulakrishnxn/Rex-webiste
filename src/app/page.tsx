import { Hero } from "@/components/hero";
import { About } from "@/components/about";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center">
        <Hero />
        <About />
      </main>
    </div>
  );
}

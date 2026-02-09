import { About } from "@/components/about";
import { Download } from "@/components/download";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center">
        <Hero />
        <About />
        <Download />
      </main>
    </div>
  );
}

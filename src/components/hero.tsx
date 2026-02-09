
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import { DownloadModal } from "@/components/download-modal";

export function Hero() {
    return (
        <section className="container flex flex-col items-center justify-center py-24 text-center md:py-32">
            <div className="flex flex-col items-center justify-center mb-6 gap-2">
                <Activity className="h-8 w-8 text-primary" />
                <span className="px-3 py-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase bg-muted/50 rounded-full">
                    Rex.ai
                </span>
            </div>

            <h1 className="text-4xl font-serif font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto">
                Professional<br />
                Medical Class AI
            </h1>

            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-10 mx-auto">
                Capture every word, keep every context, consult, assess and Medical data. Intelligent guidance for every health decision.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <DownloadModal>
                    <Button size="lg" className="h-12 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all">
                        Try it
                    </Button>
                </DownloadModal>
                <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-border/60 hover:bg-muted/50 transition-all">
                    Talk to us
                </Button>
            </div>
        </section>
    );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Activity } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container relative flex h-16 max-w-screen-2xl items-center justify-between mx-auto px-4 sm:px-8">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Activity className="h-6 w-6 text-primary" />
                        <span className="font-bold text-xl tracking-tighter">Rex Healthify</span>
                    </Link>
                </div>
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium text-muted-foreground/80">
                    <Link href="#" className="hover:text-foreground transition-colors">
                        About
                    </Link>
                    <Link href="#" className="hover:text-foreground transition-colors">
                        Features
                    </Link>

                    <Link href="#" className="hover:text-foreground transition-colors">
                        FAQ
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                        <Link href="#">Sign in</Link>
                    </Button>
                    <Button size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                        <Link href="#">Sign up</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}


import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "@/components/logo";
import { DownloadModal } from "@/components/download-modal";

export function Footer() {
    return (
        <footer className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-12">
            <div className="max-w-6xl mx-auto bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 text-zinc-900 dark:text-zinc-50 flex flex-col gap-12">
                <div className="grid gap-16 lg:grid-cols-3">

                    {/* Brand & Description */}
                    <div className="space-y-4 max-w-sm lg:col-span-1">
                        <Logo href="/" size="sm" />
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                            Transforming clinical documentation with ambient AI. Recover time, improve care, and reduce burnout.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row lg:col-span-2 gap-12 lg:justify-end">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400">Product</h4>
                            <ul className="space-y-2 text-sm font-medium">
                                <li><Link href="#" className="text-zinc-700 dark:text-zinc-300 hover:text-primary transition-colors">About</Link></li>
                                <li><Link href="#" className="text-zinc-700 dark:text-zinc-300 hover:text-primary transition-colors">Features</Link></li>
                                <li><Link href="#" className="text-zinc-700 dark:text-zinc-300 hover:text-primary transition-colors">Demo</Link></li>

                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400">Get the App</h4>
                            <DownloadModal>
                                <Button className="w-full sm:w-auto rounded-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download App
                                </Button>
                            </DownloadModal>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        &copy; {new Date().getFullYear()} Rex. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <ModeToggle className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 border-0 bg-transparent" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

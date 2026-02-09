
import Link from "next/link";
import { Activity, Download } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export function Footer() {
    return (
        <footer className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-12">
            <div className="max-w-6xl mx-auto bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 text-zinc-900 dark:text-zinc-50 flex flex-col gap-12">
                <div className="grid gap-16 lg:grid-cols-3">

                    {/* Brand & Description */}
                    <div className="space-y-4 max-w-sm lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <Activity className="h-6 w-6 text-zinc-900 dark:text-zinc-50" />
                            <span className="font-bold text-xl tracking-tighter">Rex</span>
                        </Link>
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
                            <Button className="w-full sm:w-auto rounded-full">
                                <Download className="mr-2 h-4 w-4" />
                                Download App
                            </Button>
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
                        <Button variant="ghost" size="icon" className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 rounded-full">
                            <span className="sr-only">Twitter</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 rounded-full">
                            <span className="sr-only">LinkedIn</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}


import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone } from "lucide-react"

export function Download() {
    return (
        <section className="container py-8 md:py-12">
            <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground px-6 py-6 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 shadow-xl">
                {/* Background Details */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-black opacity-100 pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl translate-x-12 -translate-y-12"></div>
                <div className="absolute bottom-0 left-0 p-24 bg-white/5 rounded-full blur-2xl -translate-x-8 translate-y-8"></div>

                {/* Left Content */}
                <div className="relative z-10 flex flex-col items-start gap-5 max-w-lg text-left">
                    <div className="space-y-3">
                        <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-white px-3 py-1 text-xs font-medium text-zinc-900 dark:text-black shadow-sm">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                            Available now
                        </div>
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-serif text-zinc-900 dark:text-white">
                            Bring ambient AI to your practice.
                        </h2>
                        <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-sm">
                            Experience the ease of Rex on your mobile device. Capture patient encounters securely and generate clinical notes in seconds.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button size="lg" className="h-12 px-6 rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold text-sm">
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Download App
                        </Button>
                    </div>
                </div>

                {/* Right Content - Phone Visual */}
                <div className="relative z-10 w-full max-w-[220px] md:max-w-[260px] aspect-[9/19] translate-y-6 md:translate-y-12">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl scale-110"></div>
                    <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[2rem] border-[5px] border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden relative rotate-[-6deg] hover:rotate-0 transition-transform duration-700">
                        {/* StatusBar */}
                        <div className="absolute top-0 w-full h-6 flex justify-between items-center px-4 z-20">
                            <div className="w-8 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mx-auto mt-1.5"></div>
                        </div>

                        {/* App Screen Content */}
                        <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900 flex flex-col pt-12 p-4 gap-4">
                            {/* Header */}
                            <div className="flex items-center justify-between px-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Smartphone className="h-4 w-4 text-primary" />
                                </div>
                                <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                            </div>

                            {/* Content Cards */}
                            <div className="mt-4 space-y-3">
                                <div className="h-32 w-full bg-zinc-200/50 dark:bg-zinc-800/50 rounded-2xl p-4 flex flex-col gap-2">
                                    <div className="h-2 w-1/3 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                                    <div className="h-2 w-3/4 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-full mt-2"></div>
                                    <div className="h-2 w-1/2 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-full"></div>
                                </div>
                                <div className="h-24 w-full bg-zinc-200/30 dark:bg-zinc-800/30 rounded-2xl p-4 flex flex-col gap-2">
                                    <div className="h-2 w-1/4 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                                    <div className="flex gap-2 mt-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                                        <div className="h-8 w-full bg-zinc-300/30 dark:bg-zinc-700/30 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="h-32 w-full bg-zinc-200/30 dark:bg-zinc-800/30 rounded-2xl p-4 opacity-50"></div>
                            </div>

                            {/* FAB */}
                            <div className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center">
                                <ArrowRight className="h-5 w-5 text-primary-foreground" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

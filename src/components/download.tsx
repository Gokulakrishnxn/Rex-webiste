
import { Button } from "@/components/ui/button"
import { DownloadModal } from "@/components/download-modal"
import { ArrowRight, Bell, Scan, Sparkles, Home, FileText, Pill, User } from "lucide-react"

export function Download() {
    return (
        <section className="container py-8 md:py-12">
            <div className="relative rounded-3xl overflow-visible bg-primary text-primary-foreground px-6 py-8 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 shadow-xl min-h-[500px]">
                {/* Background Details */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-black opacity-100 pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl translate-x-12 -translate-y-12"></div>
                <div className="absolute bottom-0 left-0 p-24 bg-white/5 rounded-full blur-2xl -translate-x-8 translate-y-8"></div>

                {/* Left Content */}
                <div className="relative z-10 flex flex-col items-center md:items-start gap-5 max-w-lg text-center md:text-left flex-1">
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
                        <DownloadModal>
                            <Button size="lg" className="h-12 px-6 rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold text-sm">
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Download App
                            </Button>
                        </DownloadModal>
                    </div>
                </div>

                {/* Right Content - Phone Visual */}
                <div className="relative z-10 w-full max-w-[240px] md:max-w-[280px] aspect-[9/19] flex-shrink-0">
                    <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[2.5rem] border-[6px] border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden relative rotate-[-3deg] hover:rotate-0 transition-transform duration-700">
                        {/* StatusBar */}
                        <div className="absolute top-0 w-full h-11 flex justify-between items-center px-6 z-20 bg-white dark:bg-zinc-950">
                            <div className="text-[10px] font-semibold text-zinc-900 dark:text-white">9:41</div>
                            <div className="w-20 h-5 bg-black rounded-full"></div>
                            <div className="flex gap-1 items-center">
                                <div className="w-4 h-3 border border-zinc-900 dark:border-white rounded-sm relative">
                                    <div className="absolute inset-0.5 bg-zinc-900 dark:bg-white rounded-[1px]"></div>
                                </div>
                            </div>
                        </div>

                        {/* App Screen Content */}
                        <div className="w-full h-full bg-white dark:bg-zinc-950 flex flex-col pt-11 overflow-hidden">
                            {/* Header */}
                            <div className="px-4 pt-3 pb-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                                            <img
                                                src="/avatar-cartoon.png"
                                                alt="User Avatar"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">Welcome back,</p>
                                            <p className="text-xs font-semibold text-zinc-900 dark:text-white">fairoz</p>
                                        </div>
                                    </div>
                                    <Bell className="h-5 w-5 text-zinc-900 dark:text-white" />
                                </div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-0.5">Good Afternoon, fairoz</h3>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Here's your medication plan for today.</p>
                            </div>

                            {/* Quick Actions */}
                            <div className="px-4 mb-3">
                                <h4 className="text-[10px] font-semibold text-zinc-900 dark:text-white mb-2">Quick Actions</h4>
                                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Scan className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-semibold text-zinc-900 dark:text-white">Scan New Prescription</p>
                                                <p className="text-[8px] text-zinc-500 dark:text-zinc-400">Use AI analysis to auto-fill details</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
                                    </div>
                                </div>
                            </div>

                            {/* AI Health Insights */}
                            <div className="px-4 mb-3 flex-1 overflow-hidden">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                                    <h4 className="text-[10px] font-semibold text-zinc-900 dark:text-white">AI Health Insights</h4>
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800 mb-2">
                                    <div className="flex gap-3 mb-3">
                                        <div>
                                            <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mb-1">Weekly Adherence</p>
                                            <div className="flex gap-0.5">
                                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                                    <div key={i} className="flex flex-col items-center">
                                                        <div className={`w-3 h-8 rounded-sm ${i === 3 || i === 4 ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
                                                        <span className="text-[7px] text-zinc-400 mt-0.5">{day}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-[9px] text-zinc-500 dark:text-zinc-400 mb-1">Daily Adherence</p>
                                            <div className="relative h-12 w-12">
                                                <div className="absolute inset-0 rounded-full border-4 border-zinc-200 dark:border-zinc-800"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-xs font-bold text-zinc-900 dark:text-white">0%</span>
                                                </div>
                                            </div>
                                            <span className="text-[8px] text-zinc-400 mt-1">0/1 Days</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Medications */}
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-[10px] font-semibold text-zinc-900 dark:text-white">Active Medications</h4>
                                    <span className="text-[9px] text-primary">See All</span>
                                </div>
                                <div className="text-center py-4">
                                    <p className="text-[10px] text-zinc-400">No medications for today</p>
                                </div>
                            </div>

                            {/* Bottom Navigation */}
                            <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center justify-around bg-white dark:bg-zinc-950">
                                <div className="flex flex-col items-center gap-0.5">
                                    <Home className="h-4 w-4 text-primary" />
                                    <span className="text-[8px] text-primary font-medium">Home</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <FileText className="h-4 w-4 text-zinc-400" />
                                    <span className="text-[8px] text-zinc-400">Records</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <Pill className="h-4 w-4 text-zinc-400" />
                                    <span className="text-[8px] text-zinc-400">RexAI</span>
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                    <User className="h-4 w-4 text-zinc-400" />
                                    <span className="text-[8px] text-zinc-400">Profile</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

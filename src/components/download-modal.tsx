
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRight, Smartphone, Download } from "lucide-react"

interface DownloadModalProps {
    children: React.ReactNode
}

// Simple internal SVG components for logos to avoid external dependencies
const AppleLogo = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg"><title>Apple</title><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>
)

const AndroidLogo = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg"><title>Android</title><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5682.1527l-2.0225 3.503c-1.6736-.7634-3.5845-1.1894-5.5977-1.1894s-3.9241.426-5.5977 1.1894L3.818 5.4478a.4173.4173 0 00-.166-.1652.416.416 0 00-.4028.0125.416.416 0 00-.1521.5676l1.9973 3.4592C2.6883 11.1867.3432 14.6589.3432 18.5746c0 4.102 3.8295 8.0822 11.6568 8.0822s11.6568-3.9802 11.6568-8.0822c0-3.9157-2.3451-7.3879-4.7573-9.2532" /></svg>
)

export function DownloadModal({ children }: DownloadModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden border-none shadow-2xl">
                <div className="flex flex-col md:flex-row h-full md:min-h-[320px]">
                    {/* Left Side: Brand & Info */}
                    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 p-8 md:p-10 flex flex-col justify-center items-start gap-6 relative overflow-hidden">
                        {/* Decorative */}
                        <div className="absolute top-0 right-0 p-24 bg-primary/5 rounded-full blur-3xl translate-x-8 -translate-y-8 pointer-events-none"></div>

                        <div className="h-14 w-14 rounded-2xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 flex items-center justify-center z-10 shadow-lg">
                            <Smartphone className="h-7 w-7" />
                        </div>

                        <div className="space-y-3 z-10 text-left">
                            <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-900 dark:text-zinc-100 shadow-sm">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                                Available now
                            </div>
                            <DialogTitle className="text-3xl font-serif font-bold tracking-tight">Get the App</DialogTitle>
                            <DialogDescription className="text-base text-muted-foreground max-w-sm text-left leading-relaxed">
                                Experience the future of clinical documentation. Capture encounters securely on your device.
                            </DialogDescription>
                        </div>
                    </div>

                    {/* Right Side: Actions */}
                    <div className="flex-1 bg-white dark:bg-zinc-900 p-8 md:p-10 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800">
                        <Button className="w-full h-14 rounded-xl text-base font-semibold justify-between pl-6 pr-4 shadow-sm group" size="lg">
                            <div className="flex items-center gap-3">
                                <AppleLogo className="h-5 w-5 mb-0.5" />
                                <span>Download for iOS</span>
                            </div>
                            <ArrowRight className="h-5 w-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="outline" className="w-full h-14 rounded-xl text-base font-semibold justify-between pl-6 pr-4 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 group" size="lg">
                            <div className="flex items-center gap-3">
                                <AndroidLogo className="h-5 w-5 text-green-600 dark:text-green-500" />
                                <span>Download for Android</span>
                            </div>
                            <Download className="h-5 w-5 opacity-50 group-hover:scale-110 transition-transform" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

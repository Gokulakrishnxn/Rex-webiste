
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex bg-muted/10">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 w-1/3">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search patients, reports..."
                                className="pl-9 h-9 bg-muted/40 border-none focus-visible:bg-background focus-visible:ring-1 transition-all rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="rounded-full relative">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-background"></span>
                        </Button>
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

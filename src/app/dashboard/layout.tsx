import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { NotificationDropdown } from "@/components/dashboard/notification-dropdown"
import { UserAvatar } from "@/components/dashboard/user-avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search } from "lucide-react"
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
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <NotificationDropdown />
                        <div className="h-8 w-px bg-border/60" />
                        <UserAvatar />
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

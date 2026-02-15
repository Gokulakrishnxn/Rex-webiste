"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { LayoutDashboard, Users, Calendar, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { getFirebaseAuth } from "@/lib/firebase"

const sidebarItems = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "Patients", href: "/dashboard/patients", icon: Users },
    { title: "Schedule", href: "/dashboard/schedule", icon: Calendar },
    { title: "Reports", href: "/dashboard/reports", icon: FileText },
]

export function DashboardSidebar() {
    const pathname = usePathname()
    const [hospitalName, setHospitalName] = useState<string>("Hospital")
    const [userEmail, setUserEmail] = useState<string>("")
    const [initials, setInitials] = useState<string>("H")

    useEffect(() => {
        // Get hospital name from localStorage
        const storedName = localStorage.getItem("hospitalName")
        if (storedName) {
            setHospitalName(storedName)
            // Generate initials from hospital name
            const nameInitials = storedName
                .split(" ")
                .map(word => word[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            setInitials(nameInitials)
        }

        // Get user email from Firebase
        const auth = getFirebaseAuth()
        const user = auth.currentUser
        if (user?.email) {
            setUserEmail(user.email)
            // If no hospital name, use email initials
            if (!storedName) {
                const emailInitials = user.email
                    .split("@")[0]
                    .slice(0, 2)
                    .toUpperCase()
                setInitials(emailInitials)
            }
        }
    }, [])

    return (
        <aside className="w-64 border-r border-border/40 bg-background hidden md:flex flex-col h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-border/40">
                <Logo href="/" size="sm" />
            </div>

            <div className="flex-1 py-6 px-4 space-y-1">
                <div className="mb-6 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Menu
                </div>
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-border/40">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-sm">
                        <span className="font-bold text-primary-foreground text-sm">{initials}</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{hospitalName}</p>
                        <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

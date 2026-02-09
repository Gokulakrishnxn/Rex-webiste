"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, Users, Calendar, MessageSquare, Activity, FileText, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "Patients", href: "/dashboard/patients", icon: Users },
    { title: "Schedule", href: "/dashboard/schedule", icon: Calendar },
    { title: "Reports", href: "/dashboard/reports", icon: FileText },
]

export function DashboardSidebar() {
    const pathname = usePathname()
    const [hospitalName, setHospitalName] = useState("Rex Portal")

    useEffect(() => {
        const storedName = localStorage.getItem("hospitalName")
        if (storedName) {
            setHospitalName(storedName)
        }
    }, [])

    return (
        <aside className="w-64 border-r border-border/40 bg-background hidden md:flex flex-col h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-border/40">
                <Link href="/" className="flex items-center space-x-2">
                    <Activity className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl tracking-tighter truncate" title={hospitalName}>{hospitalName}</span>
                </Link>
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
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-primary">DR</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">Dr. Richardson</p>
                        <p className="text-xs text-muted-foreground truncate">Cardiology</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

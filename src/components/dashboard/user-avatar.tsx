"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Settings, User, Building2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getFirebaseAuth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

export function UserAvatar() {
    const router = useRouter()
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

    const handleSignOut = async () => {
        try {
            const auth = getFirebaseAuth()
            await signOut(auth)
            localStorage.removeItem("hospitalName")
            router.push("/")
        } catch (error) {
            console.error("Sign out error:", error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-muted/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <Avatar className="h-9 w-9 border-2 border-primary/20 shadow-sm">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold text-sm">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2">
                <DropdownMenuLabel className="p-3">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-bold text-base">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate">{hospitalName}</p>
                            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-lg">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-lg">
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>Hospital Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2.5 px-3 rounded-lg">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="cursor-pointer py-2.5 px-3 rounded-lg text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

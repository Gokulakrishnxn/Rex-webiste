"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { User, Building2, ArrowLeft } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface AuthModalProps {
    children: React.ReactNode;
    defaultTab?: "login" | "signup";
}

export function AuthModal({ children, defaultTab = "login" }: AuthModalProps) {
    const [step, setStep] = useState<"role-selection" | "form">("role-selection");
    const [role, setRole] = useState<"patient" | "hospital" | null>(null);

    const handleRoleSelect = (selectedRole: "patient" | "hospital") => {
        setRole(selectedRole);
        setStep("form");
    };

    const handleBack = () => {
        setStep("role-selection");
        setRole(null);
    };

    // Reset state when modal closes (optional, but good UX if we could hook into onOpenChange)
    // For now, simpler implementation.

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden gap-0">
                <DialogHeader className="p-8 pb-2">
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                        {step === "role-selection"
                            ? "Welcome"
                            : role === 'patient'
                                ? "Get the Rex App"
                                : "Hospital Authentication"}
                    </DialogTitle>
                    <DialogDescription className="text-base text-zinc-500 dark:text-zinc-400 mt-2">
                        {step === "role-selection"
                            ? "Choose your account type to proceed."
                            : role === 'patient'
                                ? "Your health, in your hands."
                                : "Sign in to your account or create a new one."}
                    </DialogDescription>
                </DialogHeader>

                {step === "role-selection" ? (
                    <div className="grid grid-cols-2 gap-6 p-8 pt-4">
                        <Button
                            variant="outline"
                            className="h-40 flex flex-col items-center justify-center gap-4 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-2xl"
                            onClick={() => handleRoleSelect("patient")}
                        >
                            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                                <User className="h-7 w-7" />
                            </div>
                            <span className="font-semibold text-lg">Patient</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-40 flex flex-col items-center justify-center gap-4 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-2xl"
                            onClick={() => handleRoleSelect("hospital")}
                        >
                            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                                <Building2 className="h-7 w-7" />
                            </div>
                            <span className="font-semibold text-lg">Hospital</span>
                        </Button>
                    </div>
                ) : (
                    <div className="p-8 pt-0">
                        <div className="mb-6">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBack}
                                className="-ml-3 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Selection
                            </Button>
                        </div>

                        {role === 'patient' ? (
                            <div className="flex flex-col items-center text-center space-y-8 py-2">
                                <div className="relative">
                                    <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-4 shadow-xl shadow-primary/10">
                                        <User className="h-12 w-12" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-md border border-border">
                                        <div className="bg-green-500 h-4 w-4 rounded-full animate-pulse" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                                        Patient portal access is available exclusively via our mobile app. Monitor your health, view records, and communicate with your provider securely.
                                    </p>
                                </div>
                                <Button size="lg" className="w-full h-14 rounded-xl text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    Download App
                                </Button>
                            </div>
                        ) : (
                            <Tabs defaultValue={defaultTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6 h-12 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl">
                                    <TabsTrigger value="login" className="h-10 rounded-lg data-[state=active]:shadow-sm">Login</TabsTrigger>
                                    <TabsTrigger value="signup" className="h-10 rounded-lg data-[state=active]:shadow-sm">Sign Up</TabsTrigger>
                                </TabsList>
                                <TabsContent value="login" className="mt-0">
                                    <Card className="border-0 shadow-none bg-transparent">
                                        <CardContent className="space-y-4 px-0 pb-0">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="admin@hospital.com"
                                                    className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                />
                                            </div>
                                            <Button className="w-full h-12 text-base font-semibold mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                                                Login
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="signup" className="mt-0">
                                    <Card className="border-0 shadow-none bg-transparent">
                                        <CardContent className="space-y-4 px-0 pb-0">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-sm font-medium">Hospital Name</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="General Hospital"
                                                    className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                                                <Input
                                                    id="signup-email"
                                                    type="email"
                                                    placeholder="admin@hospital.com"
                                                    className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                                                <Input
                                                    id="signup-password"
                                                    type="password"
                                                    className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                />
                                            </div>
                                            <Button
                                                className="w-full h-12 text-base font-semibold mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                                                onClick={() => {
                                                    const nameInput = document.getElementById("name") as HTMLInputElement;
                                                    if (nameInput && nameInput.value) {
                                                        localStorage.setItem("hospitalName", nameInput.value);
                                                    }
                                                    window.location.href = "/dashboard";
                                                }}
                                            >
                                                Create Account
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

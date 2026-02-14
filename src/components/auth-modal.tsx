"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Building2, ArrowLeft, Loader2 } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
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
import { getFirebaseAuth } from "@/lib/firebase"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth"

interface AuthModalProps {
    children: React.ReactNode;
    defaultTab?: "login" | "signup";
}

const FIREBASE_NOT_CONFIGURED_MSG =
    "Sign-in is not configured. Add NEXT_PUBLIC_FIREBASE_API_KEY (and other web app config) to .env.local, then restart the dev server."

export function AuthModal({ children, defaultTab = "login" }: AuthModalProps) {
    const router = useRouter()
    const [step, setStep] = useState<"role-selection" | "form">("role-selection");
    const [role, setRole] = useState<"patient" | "hospital" | null>(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const handleRoleSelect = (selectedRole: "patient" | "hospital") => {
        setRole(selectedRole);
        setStep("form");
        setAuthError(null);
    };

    const handleBack = () => {
        setStep("role-selection");
        setRole(null);
        setAuthError(null);
    };

    const verifyAndRedirect = async (idToken: string, hospitalName?: string) => {
        const res = await fetch("/api/auth/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Verification failed");
        }
        if (hospitalName) localStorage.setItem("hospitalName", hospitalName);
        router.push("/dashboard");
    };

    const handleHospitalLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError(null);
        setAuthLoading(true);
        const email = (document.getElementById("email") as HTMLInputElement)?.value?.trim();
        const password = (document.getElementById("password") as HTMLInputElement)?.value;
        if (!email || !password) {
            setAuthError("Please enter email and password");
            setAuthLoading(false);
            return;
        }
        try {
            const auth = getFirebaseAuth();
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await user.getIdToken();
            await verifyAndRedirect(idToken);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Login failed";
            if (message.includes("Firebase client config missing") || message.includes("missing"))
                setAuthError(FIREBASE_NOT_CONFIGURED_MSG);
            else
                setAuthError(message.replace("Firebase: ", ""));
        } finally {
            setAuthLoading(false);
        }
    };

    const handleHospitalSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError(null);
        setAuthLoading(true);
        const name = (document.getElementById("name") as HTMLInputElement)?.value?.trim();
        const email = (document.getElementById("signup-email") as HTMLInputElement)?.value?.trim();
        const password = (document.getElementById("signup-password") as HTMLInputElement)?.value;
        if (!email || !password) {
            setAuthError("Please enter email and password");
            setAuthLoading(false);
            return;
        }
        try {
            const auth = getFirebaseAuth();
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await user.getIdToken();
            await verifyAndRedirect(idToken, name || undefined);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Sign up failed";
            if (message.includes("Firebase client config missing") || message.includes("missing"))
                setAuthError(FIREBASE_NOT_CONFIGURED_MSG);
            else
                setAuthError(message.replace("Firebase: ", ""));
        } finally {
            setAuthLoading(false);
        }
    };

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
                                            {authError && (
                                                <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
                                                    {authError}
                                                </p>
                                            )}
                                            <form onSubmit={handleHospitalLogin} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="admin@hospital.com"
                                                        className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                        disabled={authLoading}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                        disabled={authLoading}
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    className="w-full h-12 text-base font-semibold mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                                                    disabled={authLoading}
                                                >
                                                    {authLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="signup" className="mt-0">
                                    <Card className="border-0 shadow-none bg-transparent">
                                        <CardContent className="space-y-4 px-0 pb-0">
                                            {authError && (
                                                <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
                                                    {authError}
                                                </p>
                                            )}
                                            <form onSubmit={handleHospitalSignup} className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name" className="text-sm font-medium">Hospital Name</Label>
                                                    <Input
                                                        id="name"
                                                        placeholder="General Hospital"
                                                        className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                        disabled={authLoading}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                                                    <Input
                                                        id="signup-email"
                                                        type="email"
                                                        placeholder="admin@hospital.com"
                                                        className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                        disabled={authLoading}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                                                    <Input
                                                        id="signup-password"
                                                        type="password"
                                                        className="h-12 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 transition-all font-medium"
                                                        disabled={authLoading}
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    className="w-full h-12 text-base font-semibold mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                                                    disabled={authLoading}
                                                >
                                                    {authLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
                                                </Button>
                                            </form>
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

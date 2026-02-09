import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Activity, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthModal } from "@/components/auth-modal";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container relative flex h-16 max-w-screen-2xl items-center justify-between mx-auto px-4 sm:px-8">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Activity className="h-6 w-6 text-primary" />
                        <span className="font-bold text-xl tracking-tighter">Rex</span>
                    </Link>
                </div>
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium text-muted-foreground/80">
                    <Link href="#our-mission" className="hover:text-foreground transition-colors">
                        About
                    </Link>
                    <Link href="#" className="hover:text-foreground transition-colors">
                        Features
                    </Link>


                </nav>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <ModeToggle />
                        <AuthModal defaultTab="login">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                Sign in
                            </Button>
                        </AuthModal>
                        <AuthModal defaultTab="signup">
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                                Sign up
                            </Button>
                        </AuthModal>
                    </div>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                            <div className="flex flex-col gap-6 mt-6">
                                <Link href="/" className="flex items-center space-x-2">
                                    <Activity className="h-6 w-6 text-primary" />
                                    <span className="font-bold text-xl tracking-tighter">Rex</span>
                                </Link>
                                <nav className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
                                    <Link href="#our-mission" className="hover:text-foreground transition-colors px-2 py-1">
                                        About
                                    </Link>
                                    <Link href="#" className="hover:text-foreground transition-colors px-2 py-1">
                                        Features
                                    </Link>

                                </nav>
                                <div className="flex flex-col gap-2 mt-4">
                                    <AuthModal defaultTab="login">
                                        <Button variant="outline" className="w-full">
                                            Sign in
                                        </Button>
                                    </AuthModal>
                                    <AuthModal defaultTab="signup">
                                        <Button className="w-full bg-primary">
                                            Sign up
                                        </Button>
                                    </AuthModal>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}


"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Phone, Mail, MapPin, Activity, FileText, Pill, Clock, AlertCircle } from "lucide-react"

interface Patient {
    id: string
    name: string
    email: string
    age: number
    gender: string
    lastVisit: string
    status: string
    image: string
}

interface PatientProfileModalProps {
    patient: Patient | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function PatientProfileModal({ patient, open, onOpenChange }: PatientProfileModalProps) {
    if (!patient) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden rounded-3xl">
                <div className="flex h-full">
                    {/* Left Column: Profile */}
                    <div className="w-[35%] bg-muted/30 border-r border-border/40 p-6 flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-lg mb-4">
                                <AvatarImage src={patient.image} />
                                <AvatarFallback className="text-2xl">{patient.name[0]}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-serif font-bold">{patient.name}</h2>
                            <p className="text-sm text-muted-foreground mb-2">{patient.id}</p>
                            <Badge variant="outline" className={`rounded-full px-3 py-1 
                                ${patient.status === 'Active' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                                    patient.status === 'Critical' ? 'bg-red-500/10 text-red-700 dark:text-red-400' :
                                        'bg-zinc-500/10 text-zinc-700 dark:text-zinc-400'}`}>
                                {patient.status}
                            </Badge>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Contact Info</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <span className="truncate">{patient.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <span>123 Main St, Springfield</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Vitals</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-background rounded-xl border border-border/50">
                                    <span className="text-xs text-muted-foreground">Blood Type</span>
                                    <p className="font-semibold mt-1">O+</p>
                                </div>
                                <div className="p-3 bg-background rounded-xl border border-border/50">
                                    <span className="text-xs text-muted-foreground">Height</span>
                                    <p className="font-semibold mt-1">175 cm</p>
                                </div>
                                <div className="p-3 bg-background rounded-xl border border-border/50">
                                    <span className="text-xs text-muted-foreground">Weight</span>
                                    <p className="font-semibold mt-1">70 kg</p>
                                </div>
                                <div className="p-3 bg-background rounded-xl border border-border/50">
                                    <span className="text-xs text-muted-foreground">Age</span>
                                    <p className="font-semibold mt-1">{patient.age} yrs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Clinical Data */}
                    <div className="flex-1 flex flex-col min-w-0">
                        <div className="p-6 border-b border-border/40">
                            <h3 className="text-lg font-semibold">Medical Records</h3>
                        </div>
                        <Tabs defaultValue="reports" className="flex-1 flex flex-col">
                            <div className="px-6 pt-4">
                                <TabsList className="bg-muted/50 p-1 rounded-xl w-full justify-start">
                                    <TabsTrigger value="reports" className="rounded-lg flex-1">Medical Reports</TabsTrigger>
                                    <TabsTrigger value="prescriptions" className="rounded-lg flex-1">Prescriptions</TabsTrigger>
                                    <TabsTrigger value="history" className="rounded-lg flex-1">Visit History</TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="flex-1 overflow-hidden p-6">
                                <ScrollArea className="h-full pr-4">
                                    <TabsContent value="reports" className="m-0 space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:bg-muted/30 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Blood Work Analysis</p>
                                                        <p className="text-xs text-muted-foreground">Oct 24, 2024 • Lab Report</p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" className="rounded-lg">View</Button>
                                            </div>
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="prescriptions" className="m-0 space-y-4">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-orange-500/5 hover:bg-orange-500/10 transition-colors">
                                                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 mt-1">
                                                    <Pill className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <p className="font-medium">Amoxicillin</p>
                                                        <Badge variant="outline" className="bg-background">Active</Badge>
                                                    </div>
                                                    <p className="text-sm mt-1">500mg • 3 times daily</p>
                                                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                                        <Clock className="h-3 w-3" /> Next dose in 2 hours
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="history" className="m-0 space-y-6 pl-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="relative pl-6 border-l-2 border-muted pb-6 last:pb-0">
                                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-primary" />
                                                <div className="space-y-1">
                                                    <span className="text-xs text-muted-foreground">Oct {25 - i}, 2024</span>
                                                    <h4 className="font-semibold">General Checkup</h4>
                                                    <p className="text-sm text-muted-foreground">Routine follow-up for blood pressure monitoring.</p>
                                                    <div className="flex gap-2 mt-2">
                                                        <Badge variant="secondary" className="text-[10px]">Dr. Richardson</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </TabsContent>
                                </ScrollArea>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

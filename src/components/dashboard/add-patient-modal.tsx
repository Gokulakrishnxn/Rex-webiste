
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Scan, Keyboard, Loader2, CheckCircle2 } from "lucide-react"

export function AddPatientModal({ children }: { children: React.ReactNode }) {
    const [isScanning, setIsScanning] = useState(false)
    const [scanSuccess, setScanSuccess] = useState(false)
    const [manualId, setManualId] = useState("")

    const handleSimulateScan = () => {
        setIsScanning(true)
        setTimeout(() => {
            setIsScanning(false)
            setScanSuccess(true)
            // Reset after success
            setTimeout(() => setScanSuccess(false), 3000)
        }, 2000)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">Add Patient</DialogTitle>
                    <DialogDescription>
                        Add a new patient by scanning their QR code or entering their ID manually.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="scan" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2 rounded-xl mb-6">
                        <TabsTrigger value="scan" className="rounded-lg">
                            <Scan className="w-4 h-4 mr-2" />
                            Scan QR
                        </TabsTrigger>
                        <TabsTrigger value="manual" className="rounded-lg">
                            <Keyboard className="w-4 h-4 mr-2" />
                            Enter ID
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="scan" className="space-y-4">
                        <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center relative overflow-hidden group">
                            {scanSuccess ? (
                                <div className="flex flex-col items-center text-green-600 animate-in fade-in zoom-in duration-300">
                                    <CheckCircle2 className="w-16 h-16 mb-2" />
                                    <span className="font-semibold">Patient Found!</span>
                                    <span className="text-sm text-muted-foreground">Redirecting...</span>
                                </div>
                            ) : isScanning ? (
                                <div className="flex flex-col items-center text-primary">
                                    <Loader2 className="w-12 h-12 animate-spin mb-2" />
                                    <span className="font-medium animate-pulse">Scanning...</span>
                                </div>
                            ) : (
                                <>
                                    <Scan className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-muted-foreground">Place QR code in frame</span>
                                </>
                            )}

                            {/* Scan Line Animation */}
                            {!scanSuccess && !isScanning && (
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_8px_rgba(var(--primary),0.8)] animate-[scan_2.5s_ease-in-out_infinite]" />
                            )}
                        </div>
                        <Button
                            className="w-full rounded-xl h-12"
                            onClick={handleSimulateScan}
                            disabled={isScanning || scanSuccess}
                        >
                            {isScanning ? "Scanning..." : scanSuccess ? "Success" : "Simulate Scan"}
                        </Button>
                    </TabsContent>

                    <TabsContent value="manual" className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label htmlFor="patient-id">Patient ID</Label>
                            <Input
                                id="patient-id"
                                placeholder="MX-XXXX"
                                value={manualId}
                                onChange={(e) => setManualId(e.target.value)}
                                className="h-12 rounded-xl"
                            />
                            <p className="text-xs text-muted-foreground">
                                Enter the unique 6-character ID found on the patient's card.
                            </p>
                        </div>
                        <Button className="w-full rounded-xl h-12 mt-4">
                            Find Patient
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

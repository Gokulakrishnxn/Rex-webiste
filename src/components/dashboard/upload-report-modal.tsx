
"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown, UploadCloud, X, File, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock patients data - in a real app this would come from an API or prop
const patients = [
    { value: "sarah connor", label: "Sarah Connor" },
    { value: "john smith", label: "John Smith" },
    { value: "michael brown", label: "Michael Brown" },
    { value: "emily davis", label: "Emily Davis" },
    { value: "jessica wilson", label: "Jessica Wilson" },
    { value: "david miller", label: "David Miller" },
]

interface UploadReportModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    defaultPatient?: string
}

export function UploadReportModal({ open, onOpenChange, defaultPatient }: UploadReportModalProps) {
    const [selectedPatient, setSelectedPatient] = useState(defaultPatient || "")
    const [openCombobox, setOpenCombobox] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [reportName, setReportName] = useState("")
    const [reportType, setReportType] = useState("")
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<{
        type: "success" | "error" | null
        message: string
    }>({ type: null, message: "" })

    // Update internal state when defaultPatient prop changes
    useEffect(() => {
        if (defaultPatient) {
            setSelectedPatient(defaultPatient)
        }
    }, [defaultPatient])

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async () => {
        if (!file || !selectedPatient || !reportType) {
            setUploadStatus({
                type: "error",
                message: "Please fill in all required fields."
            })
            return
        }

        setUploading(true)
        setUploadStatus({ type: null, message: "" })

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('patientId', selectedPatient)
            formData.append('documentType', reportType)
            if (reportName) {
                formData.append('reportName', reportName)
            }

            const response = await fetch('/api/upload-document', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (response.ok) {
                setUploadStatus({
                    type: "success",
                    message: "Report uploaded successfully!"
                })
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    setFile(null)
                    setReportName("")
                    setReportType("")
                    if (!defaultPatient) {
                        setSelectedPatient("")
                    }
                    setUploadStatus({ type: null, message: "" })
                    onOpenChange(false)
                }, 2000)
            } else {
                throw new Error(data.error || 'Upload failed')
            }
        } catch (error) {
            setUploadStatus({
                type: "error",
                message: error instanceof Error ? error.message : "Upload failed. Please try again."
            })
        } finally {
            setUploading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle>Upload Report</DialogTitle>
                    <DialogDescription>
                        Add a new medical report to a patient's record.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {/* Patient Selection */}
                    <div className="grid gap-2">
                        <Label>Patient</Label>
                        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openCombobox}
                                    className="w-full justify-between rounded-xl h-11"
                                >
                                    {selectedPatient
                                        ? patients.find((patient) => patient.value === selectedPatient)?.label
                                        : "Select patient..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[450px] p-0 rounded-xl" align="start">
                                <Command>
                                    <CommandInput placeholder="Search patient..." />
                                    <CommandList>
                                        <CommandEmpty>No patient found.</CommandEmpty>
                                        <CommandGroup>
                                            {patients.map((patient) => (
                                                <CommandItem
                                                    key={patient.value}
                                                    value={patient.value}
                                                    onSelect={(currentValue) => {
                                                        setSelectedPatient(currentValue === selectedPatient ? "" : currentValue)
                                                        setOpenCombobox(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedPatient === patient.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {patient.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Report Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Report Name</Label>
                            <Input 
                                id="name" 
                                placeholder="e.g. Blood Test" 
                                className="rounded-xl h-11"
                                value={reportName}
                                onChange={(e) => setReportName(e.target.value)}
                                disabled={uploading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Type *</Label>
                            <Select value={reportType} onValueChange={setReportType} disabled={uploading}>
                                <SelectTrigger className="rounded-xl h-11">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="lab_report">Lab Report</SelectItem>
                                    <SelectItem value="medical_imaging">Medical Imaging</SelectItem>
                                    <SelectItem value="consultation_note">Consultation Note</SelectItem>
                                    <SelectItem value="prescription">Prescription</SelectItem>
                                    <SelectItem value="discharge_summary">Discharge Summary</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* File Dropzone */}
                    <div className="grid gap-2">
                        <Label>Report File</Label>
                        <div
                            className={cn(
                                "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
                                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                                file ? "bg-primary/5 border-primary/50" : ""
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            {file ? (
                                <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <File className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 text-red-500 hover:text-red-600 hover:bg-red-500/10 mt-2"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setFile(null)
                                        }}
                                    >
                                        Remove File
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <UploadCloud className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <p className="font-medium text-sm">Click to upload or drag and drop</p>
                                    <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 10MB</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Status Messages */}
                    {uploadStatus.type && (
                        <div
                            className={cn(
                                "flex items-center gap-2 p-3 rounded-lg",
                                uploadStatus.type === "success"
                                    ? "bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-100"
                                    : "bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100"
                            )}
                        >
                            {uploadStatus.type === "success" ? (
                                <CheckCircle2 className="h-4 w-4" />
                            ) : (
                                <AlertCircle className="h-4 w-4" />
                            )}
                            <span className="text-sm">{uploadStatus.message}</span>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button 
                        variant="ghost" 
                        onClick={() => onOpenChange(false)} 
                        className="rounded-xl"
                        disabled={uploading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        className="rounded-xl" 
                        disabled={!selectedPatient || !file || !reportType || uploading}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            "Upload Report"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

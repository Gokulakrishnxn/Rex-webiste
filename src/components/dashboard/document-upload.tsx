"use client"

import { useState } from "react"
import { Upload, X, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DocumentUploadProps {
    children?: React.ReactNode
}

export function DocumentUpload({ children }: DocumentUploadProps) {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [patientId, setPatientId] = useState("")
    const [documentType, setDocumentType] = useState("")
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<{
        type: "success" | "error" | null
        message: string
    }>({ type: null, message: "" })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            // Validate file type (PDF, images, docs)
            const validTypes = [
                'application/pdf',
                'image/jpeg',
                'image/png',
                'image/jpg',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ]
            
            if (validTypes.includes(selectedFile.type)) {
                setFile(selectedFile)
                setUploadStatus({ type: null, message: "" })
            } else {
                setUploadStatus({
                    type: "error",
                    message: "Invalid file type. Please upload PDF, images, or Word documents."
                })
            }
        }
    }

    const handleUpload = async () => {
        if (!file || !patientId || !documentType) {
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
            formData.append('patientId', patientId)
            formData.append('documentType', documentType)

            const response = await fetch('/api/upload-document', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (response.ok) {
                setUploadStatus({
                    type: "success",
                    message: "Document uploaded successfully!"
                })
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    setFile(null)
                    setPatientId("")
                    setDocumentType("")
                    setUploadStatus({ type: null, message: "" })
                    setOpen(false)
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

    const removeFile = () => {
        setFile(null)
        setUploadStatus({ type: null, message: "" })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Document
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Upload Patient Document</DialogTitle>
                    <DialogDescription>
                        Upload medical reports, prescriptions, or other patient documents.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Patient ID Input */}
                    <div className="space-y-2">
                        <Label htmlFor="patientId">Patient ID *</Label>
                        <Input
                            id="patientId"
                            placeholder="Enter patient ID"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            disabled={uploading}
                        />
                    </div>

                    {/* Document Type Select */}
                    <div className="space-y-2">
                        <Label htmlFor="documentType">Document Type *</Label>
                        <Select value={documentType} onValueChange={setDocumentType} disabled={uploading}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="lab_report">Lab Report</SelectItem>
                                <SelectItem value="prescription">Prescription</SelectItem>
                                <SelectItem value="medical_imaging">Medical Imaging</SelectItem>
                                <SelectItem value="discharge_summary">Discharge Summary</SelectItem>
                                <SelectItem value="consultation_note">Consultation Note</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <Label>Document File *</Label>
                        {!file ? (
                            <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary/50 transition-colors">
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                    disabled={uploading}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center cursor-pointer"
                                >
                                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                    <span className="text-sm font-medium">Click to upload</span>
                                    <span className="text-xs text-muted-foreground mt-1">
                                        PDF, JPG, PNG, DOC (Max 10MB)
                                    </span>
                                </label>
                            </div>
                        ) : (
                            <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-8 w-8 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={removeFile}
                                    disabled={uploading}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Status Messages */}
                    {uploadStatus.type && (
                        <div
                            className={`flex items-center gap-2 p-3 rounded-lg ${
                                uploadStatus.type === "success"
                                    ? "bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-100"
                                    : "bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100"
                            }`}
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

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={uploading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpload}
                        disabled={!file || !patientId || !documentType || uploading}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

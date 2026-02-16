import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

// Helper function to extract text from PDF (simplified version)
async function extractTextFromDocument(file: File): Promise<string> {
    // For now, return a placeholder
    // In production, you'd use a library like pdf-parse for PDFs
    // or tesseract.js for images
    return `Extracted text from ${file.name}`
}

// Helper function to chunk text for embedding
function chunkText(text: string, chunkSize: number = 500): string[] {
    const chunks: string[] = []
    const words = text.split(' ')
    
    for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize).join(' '))
    }
    
    return chunks
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const patientId = formData.get('patientId') as string
        const documentType = formData.get('documentType') as string

        if (!file || !patientId || !documentType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'File size exceeds 10MB limit' },
                { status: 400 }
            )
        }

        // Get hospital ID from session/auth (placeholder for now)
        const hospitalId = 'hospital_' + uuidv4()
        const userId = 'user_' + uuidv4() // Get from authentication

        // Generate unique file name
        const fileExt = file.name.split('.').pop()
        const fileName = `${uuidv4()}.${fileExt}`
        const filePath = `documents/${hospitalId}/${patientId}/${fileName}`

        // Convert File to ArrayBuffer then to Uint8Array
        const arrayBuffer = await file.arrayBuffer()
        const uint8Array = new Uint8Array(arrayBuffer)

        // Upload file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('patient-documents')
            .upload(filePath, uint8Array, {
                contentType: file.type,
                upsert: false,
            })

        if (uploadError) {
            console.error('Upload error:', uploadError)
            return NextResponse.json(
                { error: 'Failed to upload file to storage' },
                { status: 500 }
            )
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('patient-documents')
            .getPublicUrl(filePath)

        // Create document record
        const documentId = uuidv4()
        const { error: docError } = await supabase
            .from('documents')
            .insert({
                id: documentId,
                patient_id: patientId,
                hospital_id: hospitalId,
                file_name: file.name,
                file_path: filePath,
                file_type: file.type,
                file_size: file.size,
                document_type: documentType,
                uploaded_by: userId,
                public_url: urlData.publicUrl,
                uploaded_at: new Date().toISOString(),
            })

        if (docError) {
            console.error('Document insert error:', docError)
            // Clean up uploaded file
            await supabase.storage
                .from('patient-documents')
                .remove([filePath])
            
            return NextResponse.json(
                { error: 'Failed to create document record' },
                { status: 500 }
            )
        }

        // Extract text and create chunks (for AI processing)
        try {
            const extractedText = await extractTextFromDocument(file)
            const chunks = chunkText(extractedText)

            // Insert chunks into document_chunks table
            const chunksData = chunks.map((chunk, index) => ({
                id: uuidv4(),
                document_id: documentId,
                chunk_text: chunk,
                chunk_index: index,
                created_at: new Date().toISOString(),
            }))

            const { error: chunksError } = await supabase
                .from('document_chunks')
                .insert(chunksData)

            if (chunksError) {
                console.error('Chunks insert error:', chunksError)
                // Don't fail the whole upload, just log the error
            }
        } catch (textError) {
            console.error('Text extraction error:', textError)
            // Don't fail the upload if text extraction fails
        }

        return NextResponse.json({
            success: true,
            documentId,
            fileName: file.name,
            publicUrl: urlData.publicUrl,
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

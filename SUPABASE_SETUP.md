# Supabase Setup Guide

This guide will help you set up Supabase for document storage and management.

## Prerequisites

- Supabase account (already configured with the credentials in `.env.local`)
- Supabase project URL: `https://fdyvdfzoduflveibcwlp.supabase.co`

## Database Tables Setup

### 1. Create `documents` Table

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT NOT NULL,
  hospital_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  document_type TEXT NOT NULL,
  uploaded_by TEXT NOT NULL,
  public_url TEXT,
  metadata JSONB,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_documents_patient_id ON documents(patient_id);
CREATE INDEX idx_documents_hospital_id ON documents(hospital_id);
CREATE INDEX idx_documents_document_type ON documents(document_type);
CREATE INDEX idx_documents_uploaded_at ON documents(uploaded_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth requirements)
CREATE POLICY "Enable read access for authenticated users" ON documents
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON documents
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### 2. Create `document_chunks` Table

Run this SQL for document chunking (used for AI/RAG processing):

```sql
CREATE TABLE document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_text TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  embedding VECTOR(1536), -- For OpenAI embeddings (optional)
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_document_chunks_document_id ON document_chunks(document_id);
CREATE INDEX idx_document_chunks_chunk_index ON document_chunks(chunk_index);

-- If using pgvector for embeddings, create index:
-- CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops);

-- Enable Row Level Security (RLS)
ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON document_chunks
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON document_chunks
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## Storage Bucket Setup

### 1. Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **New Bucket**
3. Name it: `patient-documents`
4. Make it **Public** (or configure RLS policies as needed)
5. Click **Create Bucket**

### 2. Configure Storage Policies

Run this SQL to set up storage policies:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'patient-documents');

-- Allow authenticated users to read files
CREATE POLICY "Allow authenticated reads"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'patient-documents');

-- Allow authenticated users to delete their files (optional)
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'patient-documents');
```

## Environment Variables

The following environment variables are already configured in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://fdyvdfzoduflveibcwlp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

## Features Implemented

### Document Upload
- Upload documents from the hospital dashboard
- Supported file types: PDF, JPG, PNG, DOC, DOCX
- Max file size: 10MB
- Automatic file type validation

### Database Storage
- Documents metadata stored in `documents` table
- Includes: patient ID, hospital ID, file info, upload details
- Full audit trail with timestamps

### Document Chunking
- Automatic text extraction from documents
- Text split into chunks for AI processing
- Stored in `document_chunks` table
- Ready for embedding generation and vector search

## Usage

### Upload Document in Dashboard

1. Navigate to **Dashboard > Reports**
2. Click **Upload Report**
3. Select patient
4. Choose document type
5. Upload file
6. Document is stored in Supabase

### API Endpoint

```typescript
POST /api/upload-document
Content-Type: multipart/form-data

Body:
- file: File
- patientId: string
- documentType: string
- reportName: string (optional)
```

## Future Enhancements

### Recommended Additions

1. **Vector Embeddings**
   - Install pgvector extension in Supabase
   - Generate embeddings for document chunks
   - Enable semantic search

2. **File Processing**
   - Add PDF text extraction (pdf-parse)
   - Add OCR for images (tesseract.js)
   - Add document preview generation

3. **Advanced Features**
   - Document versioning
   - Document sharing permissions
   - Document expiration/archival
   - Full-text search
   - Document annotations

## Troubleshooting

### Common Issues

1. **Upload fails**: Check storage bucket permissions
2. **Database insert fails**: Verify table schemas match
3. **RLS errors**: Review and adjust RLS policies
4. **Large files fail**: Check storage size limits in Supabase dashboard

## Security Notes

- Never commit `.env.local` to git
- Always use RLS policies for data security
- Validate file types on both client and server
- Scan uploaded files for malware in production
- Implement proper authentication before production use

## Contact

For issues or questions, check the Supabase documentation:
- https://supabase.com/docs
- https://supabase.com/docs/guides/storage

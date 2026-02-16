-- =============================================
-- Supabase Database Schema
-- Fix for error 42p07 (table already exists)
-- =============================================

-- Option 1: Drop existing tables and recreate (WARNING: This will delete all data!)
-- Uncomment these lines if you want to start fresh:

-- DROP TABLE IF EXISTS document_chunks CASCADE;
-- DROP TABLE IF EXISTS documents CASCADE;


-- Option 2: Create tables only if they don't exist (RECOMMENDED)
-- =============================================

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
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

-- Create document_chunks table
CREATE TABLE IF NOT EXISTS document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_text TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  embedding VECTOR(1536), -- Optional: for OpenAI embeddings
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes (will be ignored if they already exist)
DO $$ 
BEGIN
    -- Indexes for documents table
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_documents_patient_id') THEN
        CREATE INDEX idx_documents_patient_id ON documents(patient_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_documents_hospital_id') THEN
        CREATE INDEX idx_documents_hospital_id ON documents(hospital_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_documents_document_type') THEN
        CREATE INDEX idx_documents_document_type ON documents(document_type);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_documents_uploaded_at') THEN
        CREATE INDEX idx_documents_uploaded_at ON documents(uploaded_at DESC);
    END IF;
    
    -- Indexes for document_chunks table
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_document_chunks_document_id') THEN
        CREATE INDEX idx_document_chunks_document_id ON document_chunks(document_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_document_chunks_chunk_index') THEN
        CREATE INDEX idx_document_chunks_chunk_index ON document_chunks(chunk_index);
    END IF;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DO $$ 
BEGIN
    -- Policies for documents table
    DROP POLICY IF EXISTS "Enable read access for authenticated users" ON documents;
    CREATE POLICY "Enable read access for authenticated users" ON documents
        FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
    
    DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON documents;
    CREATE POLICY "Enable insert access for authenticated users" ON documents
        FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');
    
    DROP POLICY IF EXISTS "Enable update access for authenticated users" ON documents;
    CREATE POLICY "Enable update access for authenticated users" ON documents
        FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
    
    -- Policies for document_chunks table
    DROP POLICY IF EXISTS "Enable read access for authenticated users" ON document_chunks;
    CREATE POLICY "Enable read access for authenticated users" ON document_chunks
        FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
    
    DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON document_chunks;
    CREATE POLICY "Enable insert access for authenticated users" ON document_chunks
        FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');
END $$;

-- Verify tables were created
SELECT 
    tablename,
    schemaname
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('documents', 'document_chunks');

-- Show table structure
\d documents
\d document_chunks

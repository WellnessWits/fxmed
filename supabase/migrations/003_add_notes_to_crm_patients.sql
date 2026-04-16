-- Add notes column to crm_patients table
-- Using jsonb to store array of notes with text and timestamp

ALTER TABLE crm_patients 
ADD COLUMN IF NOT EXISTS notes jsonb DEFAULT '[]'::jsonb;

-- Create index for better query performance on notes
CREATE INDEX IF NOT EXISTS idx_crm_patients_notes ON crm_patients USING gin(notes);

-- Add comment explaining the structure
COMMENT ON COLUMN crm_patients.notes IS 'Array of note objects with text and timestamp: [{"text": "...", "timestamp": "..."}]';

-- Create an enum for reminder types
CREATE TYPE reminder_type AS ENUM ('post', 'event', 'memory');

-- Create reminders table
CREATE TABLE reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type reminder_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  original_date TIMESTAMP WITH TIME ZONE,
  media_urls TEXT[],
  location TEXT,
  source_file TEXT,  -- Name of the JSON file this came from
  source_id TEXT,    -- Original Facebook ID if available
  metadata JSONB,    -- Store additional data we might want later
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  author TEXT
);

-- Add indexes
CREATE INDEX idx_reminders_user_id ON reminders(user_id);
CREATE INDEX idx_reminders_type ON reminders(type);
CREATE INDEX idx_reminders_original_date ON reminders(original_date);
CREATE INDEX idx_reminders_author ON reminders(author);

-- Add RLS policies
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own reminders"
  ON reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reminders"
  ON reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Update the existing table structure if needed
ALTER TABLE reminders 
ALTER COLUMN type TYPE TEXT,  -- To allow 'comment' type
ALTER COLUMN people SET DATA TYPE TEXT[] USING ARRAY[]::TEXT[],  -- For storing arrays of people
ALTER COLUMN media_urls SET DEFAULT ARRAY[]::TEXT[];  -- Default empty array for media_urls 
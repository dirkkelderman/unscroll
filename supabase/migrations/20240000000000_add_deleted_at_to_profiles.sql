-- Add deleted_at column to profiles table
ALTER TABLE profiles 
ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;

-- Add an index to improve query performance when filtering deleted records
CREATE INDEX idx_profiles_deleted_at ON profiles(deleted_at); 
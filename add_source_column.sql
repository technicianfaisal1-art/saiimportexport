-- Add source column to enquiries table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/zztjtewhxpckqgmqimtq/sql/new

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS source TEXT DEFAULT NULL;

-- Update existing enquiries that don't have a source
UPDATE enquiries SET source = '📋 Contact Form' WHERE source IS NULL;

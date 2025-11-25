/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Contact's name
      - `email` (text) - Contact's email address
      - `business` (text) - Contact's business name
      - `list_size` (text) - Approximate list size
      - `message` (text) - Contact's message
      - `created_at` (timestamptz) - Timestamp of submission
      - `read` (boolean) - Whether the submission has been read
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - No public access policies (admin only access via dashboard)
    - Data is write-only from edge function using service role
  
  3. Notes
    - This table stores all contact form submissions
    - You can view submissions in the Supabase dashboard
    - The `read` column helps track which submissions you've reviewed
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  business text NOT NULL,
  list_size text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create index for faster queries on created_at
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);

-- Create index for filtering read/unread submissions
CREATE INDEX IF NOT EXISTS contact_submissions_read_idx ON contact_submissions(read);
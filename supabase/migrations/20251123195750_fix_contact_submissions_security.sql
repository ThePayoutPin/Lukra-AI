/*
  # Fix Contact Submissions Security Issues

  1. Security Improvements
    - Remove unused index `contact_submissions_read_idx`
    - Add RLS policy to allow service role to insert submissions
    - This ensures the edge function can write but no public access exists

  2. Changes
    - Drop unused read index
    - Add policy for service role INSERT operations
    - Maintains secure, write-only access pattern from edge functions
*/

-- Remove unused index
DROP INDEX IF EXISTS contact_submissions_read_idx;

-- Add policy to allow service role to insert contact submissions
-- This policy allows the edge function (using service role key) to insert submissions
CREATE POLICY "Service role can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);
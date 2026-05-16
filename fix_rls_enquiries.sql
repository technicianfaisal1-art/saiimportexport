-- Run these in Supabase SQL Editor
-- https://supabase.com/dashboard/project/zztjtewhxpckqgmqimtq/sql/new

-- Allow anonymous users to INSERT enquiries (for website forms + chatbot)
CREATE POLICY "Allow anonymous inserts" ON enquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anonymous users to SELECT their own enquiries (needed for admin panel when logged in)
-- The admin panel uses authenticated session, so this should already work
-- But let's ensure anon can at least insert

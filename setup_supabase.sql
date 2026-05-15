-- Run this in your Supabase SQL Editor to create the products table

CREATE TABLE products (
  id text PRIMARY KEY,
  name text NOT NULL,
  tag text,
  short_desc text,
  desc text,
  img text,
  specs jsonb
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products (so your website can display them)
CREATE POLICY "Public profiles are viewable by everyone."
  ON products FOR SELECT
  USING ( true );

-- Allow authenticated admins to insert/update/delete
CREATE POLICY "Users can insert products if logged in."
  ON products FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Users can update their products."
  ON products FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Users can delete products."
  ON products FOR DELETE
  USING ( auth.role() = 'authenticated' );

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if any
DROP POLICY IF EXISTS "storage_public_read" ON storage.objects;
DROP POLICY IF EXISTS "storage_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "storage_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "storage_auth_delete" ON storage.objects;

-- Allow public read access
CREATE POLICY "storage_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload
CREATE POLICY "storage_auth_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "storage_auth_update" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "storage_auth_delete" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

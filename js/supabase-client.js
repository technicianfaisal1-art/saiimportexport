// Initialize Supabase Client
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// Ensure the Supabase CDN is loaded in HTML files before this script
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to check if user is logged in
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

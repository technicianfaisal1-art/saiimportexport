export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Supabase Configuration
  const SUPABASE_URL = 'https://zztjtewhxpckqgmqimtq.supabase.co';
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    return res.status(500).json({ error: 'Server configuration error: Database access key missing' });
  }

  try {
    // 1. Fetch Gemini API Key securely from Supabase
    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?key=eq.gemini&select=value`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    if (!dbRes.ok) {
      throw new Error(`Failed to fetch settings from Supabase: ${dbRes.status}`);
    }

    const settingsData = await dbRes.json();
    if (!settingsData || settingsData.length === 0 || !settingsData[0].value || !settingsData[0].value.apikey) {
      return res.status(500).json({ error: 'Gemini API key is not configured in the Admin Panel.' });
    }

    const apiKey = settingsData[0].value.apikey;
    const { system_instruction, contents } = req.body;

    // 2. Call the Google Gemini API securely from the backend
    const model = "gemini-1.5-flash-latest";
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction,
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
          topP: 0.9
        }
      })
    });

    const data = await geminiRes.json();
    
    if (!geminiRes.ok) {
      console.error('Gemini API Error details:', data);
      return res.status(geminiRes.status).json({ error: 'Gemini API failed', details: data });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ error: 'Failed to communicate with AI service' });
  }
}

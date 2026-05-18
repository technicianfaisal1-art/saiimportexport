export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const SUPABASE_URL = 'https://zztjtewhxpckqgmqimtq.supabase.co';
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Server configuration error: missing key' });
  }

  try {
    // 1. Fetch Gemini API key from Supabase
    const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?key=eq.gemini&select=value`, {
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    const settingsData = await dbRes.json();
    if (!settingsData?.length || !settingsData[0]?.value?.apikey) {
      return res.status(500).json({ error: 'Gemini API key not configured in Admin Panel.' });
    }
    const apiKey = settingsData[0].value.apikey;

    // 2. Fetch live USD/INR exchange rate (free, no key needed)
    let usdInrRate = 84.5;
    try {
      const fxRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD', { signal: AbortSignal.timeout(3000) });
      if (fxRes.ok) {
        const fx = await fxRes.json();
        usdInrRate = fx.rates?.INR || 84.5;
      }
    } catch (_) {}

    const { origin, destination, product, quantity, packaging } = req.body;
    if (!origin || !destination || !product || !quantity) {
      return res.status(400).json({ error: 'Missing required fields: origin, destination, product, quantity' });
    }

    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const totalMt = parseFloat(quantity);
    const containers20 = Math.ceil(totalMt / 25);
    const containers40 = Math.ceil(totalMt / 27);

    // 3. Build the Gemini prompt — ask for real-time grounded data
    const systemPrompt = `You are a senior rice export market analyst and freight specialist at a top Indian commodity trading firm. 
Today's date is ${today}. Current USD/INR rate: ₹${usdInrRate.toFixed(2)}.
Use your knowledge of recent global market trends to provide an estimate.
Always respond with ONLY a valid JSON object matching the requested schema exactly.`;

    const userPrompt = `Search for current market data and analyze this rice export shipment:

SHIPMENT DETAILS:
- Product: ${product}
- Quantity: ${totalMt} Metric Tonnes (MT)
- Origin Port: ${origin}, India  
- Destination Port: ${destination}
- Packaging: ${packaging || 'PP Bags 25/50 kg'}
- Container estimate: ${containers20}x 20FCL or ${containers40}x 40HC

SEARCH FOR AND ANALYZE:
1. Current FOB export price for ${product} from Indian ports (APEDA data, NCDEX, trade publications)
2. Current sea freight rates from ${origin} to ${destination} (Freightos, Drewry, SCFI index)
3. Recent Indian rice export policy (government MSP, export restrictions if any)
4. Current market demand scenario for ${product} in destination region
5. Estimated port handling + documentation costs

Return ONLY this JSON structure (fill in real numbers based on current market research):
{
  "fob_price": { "min": 0, "max": 0, "currency": "USD", "unit": "per MT" },
  "freight_cost": { "min": 0, "max": 0, "currency": "USD", "unit": "per MT" },
  "handling_docs": { "min": 0, "max": 0, "currency": "USD", "unit": "per MT" },
  "cif_per_mt": { "min": 0, "max": 0, "currency": "USD", "unit": "per MT" },
  "cif_total": { "min": 0, "max": 0, "currency": "USD" },
  "inr_total": { "min": 0, "max": 0, "currency": "INR" },
  "containers": "Nxx 20FCL or Nxx 40HC",
  "lead_time": { "min": 0, "max": 0, "unit": "days" },
  "market_scenario": "bullish|neutral|bearish",
  "market_summary": "2-3 sentence current market overview with specific data points",
  "risk_factors": ["risk1", "risk2", "risk3"],
  "payment_recommendation": "Recommended payment terms for this buyer-seller route",
  "port_note": "Specific note about ${origin} to ${destination} route reliability and frequency",
  "best_container": "Recommendation between 20FCL or 40HC for this quantity",
  "exchange_rate_used": ${usdInrRate.toFixed(2)},
  "data_sources": ["source1", "source2"],
  "disclaimer": "AI estimates grounded in current web data. Contact SAI Import Export Agro for exact binding quote."
}`;

    // 4. Call AI with JSON response type enabled
    const MODELS = [
      'gemini-2.5-pro',
      'gemini-1.5-pro',
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite'
    ];

    let lastError = null;

    for (const model of MODELS) {
      try {
        const body = {
          contents: [
            { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2000,
            topP: 0.9,
            responseMimeType: "application/json"
          }
        };

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          }
        );

        const data = await geminiRes.json();

        if (geminiRes.ok && data.candidates?.[0]) {
          let rawText = data.candidates[0].content?.parts?.[0]?.text || '';

          // Extract JSON from response (strip any markdown formatting)
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              const estimate = JSON.parse(jsonMatch[0]);

              // Post-process: calculate totals if model didn't fill them correctly
              if (!estimate.cif_total?.min && estimate.cif_per_mt?.min) {
                estimate.cif_total = {
                  min: Math.round(estimate.cif_per_mt.min * totalMt),
                  max: Math.round(estimate.cif_per_mt.max * totalMt),
                  currency: 'USD'
                };
              }
              if (!estimate.inr_total?.min && estimate.cif_total?.min) {
                estimate.inr_total = {
                  min: Math.round(estimate.cif_total.min * usdInrRate),
                  max: Math.round(estimate.cif_total.max * usdInrRate),
                  currency: 'INR'
                };
              }

              return res.status(200).json({
                success: true,
                estimate,
                model,
                grounded: false,
                exchange_rate: usdInrRate,
                quantity: totalMt
              });
            } catch (parseErr) {
              // JSON parse failed, return raw text for debugging
              lastError = { rawText, parseError: parseErr.message };
            }
          } else {
            lastError = { rawText, error: 'No JSON found in response' };
          }
        } else {
          lastError = data;
        }

      } catch (fetchErr) {
        lastError = { error: fetchErr.message };
      }
    }

    return res.status(502).json({ error: 'All AI models failed', details: lastError });

  } catch (error) {
    console.error('Calculator API error:', error);
    return res.status(500).json({ error: 'Calculator service error', details: error.message });
  }
}

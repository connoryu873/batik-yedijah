export async function POST(req) {
  try {
    const { prompt, image } = await req.json()

    if (!prompt) {
      return Response.json({ error: 'Prompt required' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 })
    }

    const content = image
      ? [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: prompt },
        ]
      : prompt

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        messages: [{ role: 'user', content }],
      }),
    })

    const data = await response.json()

    // Pass through Anthropic errors so we can see them
    if (data.type === 'error') {
      return Response.json({ error: data.error?.message || 'Anthropic API error' }, { status: 400 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
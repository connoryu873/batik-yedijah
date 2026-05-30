export async function POST(req) {
  try {
    const { prompt, image } = await req.json()

    if (!prompt) {
      return Response.json({ error: 'Prompt required' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // If image is provided (base64), build a vision message; otherwise plain text
    const content = image
      ? [
          {
            type: 'image',
            source: { type: 'base64', media_type: 'image/jpeg', data: image },
          },
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
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content }],
      }),
    })

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

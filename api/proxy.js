export default async function handler(req, res) {
 const headers = {'content-type': 'application/json' ,'X-goog-api-key': `${process.env.GOOGLE_GEMINI_API_KEY}`};
  const content = [{parts: [{text: 'Give 4 random colors pattern with hex code, just the hex code, make it an array'}]}];

  const response = await fetch(
    `${process.env.GOOGLE_GEMINI_API_URL}`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        contents: content,
      }),
    });

    const data = await response.json();
    //Comment to checking
    if(!data.ok) return res.status(500).json({ error: 'Failed to fetch colors' });

    return res.status(200).json({ colors: data.candidates[0].content.parts[0].text });
}
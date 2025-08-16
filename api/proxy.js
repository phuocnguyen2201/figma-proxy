export const handler = async (event) => {
  const headers = {'content-type': 'application/json' ,
    'X-goog-api-key': `${process.env.GOOGLE_GEMINI_API_KEY}`, 
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type, Authorization'};
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
    //Example response:
    //{"colors":"```\n[\"#A8D5BA\", \"#F4B393\", \"#D6D2C4\", \"#3F72AF\"]\n```\n"}
    return {colors: data.candidates[0].content.parts[0].text };
};

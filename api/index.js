export const handler = async (event) => {
    const headers = {'content-type': 'application/json' ,'X-goog-api-key': `${process.env.GOOGLE_GEMINI_API_KEY}`};
    const content = [{parts: [{text: 'Give 4 random colors pattern with hex code, just the hex code, make it an array'}]}];
    
    // res.setHeader("Access-Control-Allow-Origin", "*"); // or restrict to specific origin
    // res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
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
      return data.status == 200?{ colors: data.candidates[0].content.parts[0].text }:{ status: data.status};
  };
  
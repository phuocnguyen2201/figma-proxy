export const handler = async (event) => {
    // Handle CORS preflight request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-goog-api-key',
                'Access-Control-Max-Age': '86400',
            },
            body: ''
        };
    }

    const headers = {'content-type': 'application/json' ,'X-goog-api-key': `${process.env.GOOGLE_GEMINI_API_KEY}`};
    const content = [{parts: [{text: 'Give 4 random colors pattern with hex code, just the hex code, make it an array'}]}];
    
    try {
        const response = await fetch(
            `${process.env.GOOGLE_GEMINI_API_URL}`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    contents: content,
                }),
            }
        );

        const data = await response.json();
        //Example response:
        //{"colors":"```\n[\"#A8D5BA\", \"#F4B393\", \"#D6D2C4\", \"#3F72AF\"]\n```\n"}
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-goog-api-key',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ colors: data.candidates[0].content.parts[0].text })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-goog-api-key',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
  
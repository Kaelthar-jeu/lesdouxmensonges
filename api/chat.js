export const config = { runtime: 'edge' };

export default async function handler(req) {
  const body = await req.json();
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'messages-2023-12-15'
    },
    body: JSON.stringify({ ...body, stream: true })
  });
  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

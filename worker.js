export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;
    const body = ['POST', 'PUT'].includes(method) ? await request.text() : null;

    const targetUrl = 'https://api.jsonbin.io/v3' + url.pathname;

    const response = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': env.JSONBIN_KEY,
      },
      body,
    });

    return new Response(await response.text(), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

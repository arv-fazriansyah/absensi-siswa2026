export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Proxy API katalog buku untuk menghindari CORS jika dibutuhkan, atau handle routing
    if (url.pathname.startsWith('/api/buku')) {
      const apiRes = await fetch('https://api.buku.cloudapp.web.id/api/catalogue/getPenggerakTextBooks?limit=1000');
      const data = await apiRes.json();
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Default static response atau fallback ke Cloudflare Pages asset handler
    return new Response('Absensi Siswa & Buku Worker Ready', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};

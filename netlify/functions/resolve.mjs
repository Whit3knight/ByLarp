// Resolve any http(s) URL to its final destination by following redirects server-side.
export default async (req) => {
  const q = new URL(req.url).searchParams;
  const target = q.get("url");
  if (!target) return Response.json({ error: "missing url" }, { status: 400 });

  let parsed;
  try { parsed = new URL(target); }
  catch { return Response.json({ error: "invalid url" }, { status: 400 }); }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return Response.json({ error: "only http(s) supported" }, { status: 400 });
  }

  try {
    const r = await fetch(target, {
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; ByLarp/1.0)",
        "accept": "*/*",
      },
    });
    return Response.json({ finalUrl: r.url, status: r.status });
  } catch (e) {
    return Response.json({ error: String(e && e.message || e) }, { status: 502 });
  }
};

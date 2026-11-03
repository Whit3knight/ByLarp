# ByLarp (generic link resolver)

Rebuild of `valxz.netlify.app` rebranded as **ByLarp**: paste any http(s) URL
and it follows redirects server-side to the final destination. Blue premium UI,
no API key.

## Deploy (Netlify)

1. Push this folder to a repo, or drag it into app.netlify.com (New site from Git / Drag & drop).
2. Build command: empty. Publish directory: `.` (root).
3. Netlify auto-detects `netlify.toml`; the function is exposed as `/api/resolve`.

## Local test

```sh
netlify dev        # requires netlify-cli
# or, without netlify-cli, test the resolver logic directly:
node -e 'fetch("https://httpbin.org/redirect-to?url=https://example.com",{redirect:"follow"}).then(r=>console.log(r.url))'
```

## How it works

- `index.html` — blue premium UI, `CONFIG.endpoint = "/api/resolve"`, `resultPath = "finalUrl"`.
- `netlify/functions/resolve.mjs` — serverless function that `fetch`es the URL with `redirect: "follow"` and returns `{ finalUrl, status }`.

## Limits (shortcut)

Follows plain HTTP 3xx redirects only (bit.ly, tinyurl, t.co, etc.). Link
protectors that use JavaScript or `<meta http-equiv="refresh">` instead of a 3xx
status need a headless-browser resolver — upgrade to Playwright/Puppeteer in the
function when that's needed.

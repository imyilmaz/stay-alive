import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = process.argv.indexOf('--origin');
const origin = new URL(arg >= 0 ? process.argv[arg + 1] : 'https://failsurvive.com');
if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.search || origin.hash || origin.username || origin.password || /localhost|127\.0\.0\.1|YOUR_/i.test(origin.hostname)) throw new Error('Gerçek, HTTPS kök site adresi gerekli.');
const base = origin.origin;
const output = path.join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const files = ['index.html', 'styles.css', 'script.js', 'site.config.js', 'characters.js', 'splash.jpg', 'well_done2.jpg', 'favicon.png', 'privacy.html', 'kvkk.html', 'app-ads.txt', 'assets'];
for (const file of files) await cp(path.join(root, file), path.join(output, file), { recursive: true });
for (const file of ['index.html', 'privacy.html', 'kvkk.html']) {
  const url = base + (file === 'index.html' ? '/' : '/' + file);
  const source = await readFile(path.join(output, file), 'utf8');
  const meta = `<link rel="canonical" href="${url}">\n<meta property="og:url" content="${url}">\n` + (file === 'index.html' ? `<meta property="og:image" content="${base}/splash.jpg">\n<meta name="twitter:card" content="summary_large_image">\n` : '');
  await writeFile(path.join(output, file), source.replace('</head>', meta + '</head>'));
}
await writeFile(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
const urls = ['/', '/privacy.html', '/kvkk.html'];
await writeFile(path.join(output, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map(url => `<url><loc>${base}${url}</loc></url>`).join('') + '</urlset>\n');
const csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'";
await writeFile(path.join(output, 'web.config'), `<?xml version="1.0" encoding="UTF-8"?>\n<configuration><system.webServer><directoryBrowse enabled="false"/><httpProtocol><customHeaders><remove name="X-Powered-By"/><remove name="Content-Security-Policy"/><add name="Content-Security-Policy" value="${csp}"/><remove name="X-Content-Type-Options"/><add name="X-Content-Type-Options" value="nosniff"/><remove name="Referrer-Policy"/><add name="Referrer-Policy" value="strict-origin-when-cross-origin"/><remove name="X-Frame-Options"/><add name="X-Frame-Options" value="DENY"/><remove name="Permissions-Policy"/><add name="Permissions-Policy" value="camera=(), microphone=(), geolocation=()"/></customHeaders></httpProtocol></system.webServer></configuration>\n`);
console.log(`Yayın dosyaları hazır: ${output}\nSite adresi: ${base}\nYüklemeden önce YAYIN_ONCESI.md kontrol edilmeli.`);

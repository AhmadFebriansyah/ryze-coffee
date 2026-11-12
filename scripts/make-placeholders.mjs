// Generates uniform placeholder images until the real (AI) photos are ready.
// Run: npm run placeholders
import { mkdir, readFile } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const menu = JSON.parse(await readFile(new URL("data/menu.json", root), "utf8"));

const DRINK_COLORS = {
  signature: ["#c79a6b", "#4a2a17"],
  classic: ["#d9b98f", "#3b2213"],
  "non-coffee": ["#a8c49a", "#5f7f4f"],
};
const OVERRIDES = {
  "matcha-cloud": ["#e8f0dc", "#6f9a4f"],
  "chocolate-velvet": ["#a77b5a", "#3a2116"],
  "red-velvet-latte": ["#f1c9c6", "#a33a3f"],
  "lychee-tea": ["#f6e6c8", "#c98b3a"],
  espresso: ["#c58a4a", "#2a160b"],
  americano: ["#6b4026", "#1f110a"],
};

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function cupSvg(item) {
  const [top, bottom] = OVERRIDES[item.id] ?? DRINK_COLORS[item.category];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="drink" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/>
    </linearGradient>
    <radialGradient id="bg" cx="0.5" cy="0.45" r="0.7">
      <stop offset="0" stop-color="#f7eddd"/><stop offset="1" stop-color="#e6d4bb"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <ellipse cx="400" cy="660" rx="150" ry="18" fill="#000" opacity="0.08"/>
  <rect x="268" y="150" width="264" height="22" rx="8" fill="#ffffff" opacity="0.9"/>
  <path d="M282 172 L518 172 L494 650 Q492 662 480 662 L320 662 Q308 662 306 650 Z" fill="#ffffff" opacity="0.35" stroke="#ffffff" stroke-width="4"/>
  <path d="M290 250 L510 250 L494 646 Q492 656 482 656 L318 656 Q308 656 306 646 Z" fill="url(#drink)"/>
  <rect x="330" y="300" width="56" height="56" rx="10" fill="#fff" opacity="0.45" transform="rotate(12 358 328)"/>
  <rect x="410" y="350" width="50" height="50" rx="10" fill="#fff" opacity="0.4" transform="rotate(-10 435 375)"/>
  <circle cx="400" cy="470" r="62" fill="#1f4d3a"/>
  <text x="400" y="478" text-anchor="middle" font-family="Georgia, serif" font-size="30" font-weight="700" fill="#efe2cf">RYZE</text>
  <text x="400" y="740" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#4a2a17">${escape(item.name)}</text>
</svg>`;
}

function posterSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="960" viewBox="0 0 720 960">
  <defs>
    <radialGradient id="g" cx="0.5" cy="0.65" r="0.75">
      <stop offset="0" stop-color="#6a4429"/><stop offset="1" stop-color="#1c100a"/>
    </radialGradient>
  </defs>
  <rect width="720" height="960" fill="url(#g)"/>
</svg>`;
}

await mkdir(new URL("public/menu/", root), { recursive: true });
await mkdir(new URL("public/video/", root), { recursive: true });

for (const item of menu) {
  const out = new URL(`public/menu/${item.id}.webp`, root);
  await sharp(Buffer.from(cupSvg(item))).webp({ quality: 82 }).toFile(out.pathname.replace(/^\/([A-Za-z]:)/, "$1"));
}
await sharp(Buffer.from(posterSvg()))
  .webp({ quality: 80 })
  .toFile(new URL("public/video/hero-poster.webp", root).pathname.replace(/^\/([A-Za-z]:)/, "$1"));

console.log(`Generated ${menu.length} menu placeholders + hero poster.`);

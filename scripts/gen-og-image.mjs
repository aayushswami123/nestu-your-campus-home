import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#0E0F0C"/>

  <!-- Left panel subtle -->
  <rect x="0" y="0" width="460" height="630" fill="#141210"/>

  <!-- Logo rounded square -->
  <rect x="80" y="195" width="220" height="220" rx="50" fill="#C75A38"/>
  <!-- U glyph: left stem -->
  <rect x="114" y="224" width="46" height="137" fill="#F2ECE2"/>
  <!-- U glyph: right stem -->
  <rect x="240" y="224" width="46" height="137" fill="#F2ECE2"/>
  <!-- U glyph: bottom bar -->
  <rect x="114" y="319" width="172" height="42" fill="#F2ECE2"/>
  <!-- U glyph: ellipse dot -->
  <ellipse cx="200" cy="361" rx="28" ry="20" fill="#F2ECE2"/>

  <!-- Brand name -->
  <text x="80" y="492"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-weight="800"
    font-size="76"
    letter-spacing="-4"
    fill="#F2ECE2">NestU</text>

  <!-- Divider line -->
  <rect x="460" y="0" width="1" height="630" fill="#2A2825" opacity="0.8"/>

  <!-- Right side headline -->
  <text x="520" y="254"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-weight="700"
    font-size="54"
    letter-spacing="-1.5"
    fill="#FAFAF7">Campus housing</text>
  <text x="520" y="320"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-weight="700"
    font-size="54"
    letter-spacing="-1.5"
    fill="#FAFAF7">that doesn't scam you.</text>

  <!-- Accent underline -->
  <rect x="520" y="342" width="100" height="4" rx="2" fill="#C75A38"/>

  <!-- Subtext -->
  <text x="520" y="404"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-weight="400"
    font-size="26"
    fill="#FAFAF7"
    opacity="0.5">Verified listings. AI roommate matching.</text>
  <text x="520" y="440"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-weight="400"
    font-size="26"
    fill="#FAFAF7"
    opacity="0.5">No broker fees. Launching Fall 2026.</text>

  <!-- Bottom bar -->
  <rect x="0" y="614" width="1200" height="16" fill="#C75A38" opacity="0.35"/>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

const outPath = resolve(__dirname, '../public/og-image.png');
writeFileSync(outPath, pngBuffer);
console.log('✓ Generated public/og-image.png');

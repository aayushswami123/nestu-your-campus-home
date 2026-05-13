import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

try {
  const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'));
  const appHtml = render();

  const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8');
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  writeFileSync(resolve(root, 'dist/index.html'), html);
  console.log('✓ Pre-rendered index.html with above-the-fold content');
} catch (err) {
  console.warn('⚠ Prerender failed, using empty shell:', err.message);
}

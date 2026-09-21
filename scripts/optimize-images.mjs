// Compress the generated cards and captured screenshots in place.
// OG cards must stay PNG (some scrapers reject progressive JPEG), but they are
// flat gradients, so palette reduction is nearly lossless and cuts ~85%.
// Evidence screenshots are photographic enough to be better served as JPEG.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const jobs = [];

for (const f of await fs.readdir('public/og')) {
  if (!f.endsWith('.png')) continue;
  jobs.push({ file: path.join('public/og', f), mode: 'png' });
}
for (const f of await fs.readdir('public/img/evidence')) {
  if (!f.endsWith('.png')) continue;
  jobs.push({ file: path.join('public/img/evidence', f), mode: 'png' });
}

let before = 0;
let after = 0;

for (const { file, mode } of jobs) {
  const src = await fs.readFile(file);
  before += src.length;
  const out =
    mode === 'png'
      ? await sharp(src).png({ quality: 82, compressionLevel: 9, palette: true, effort: 9 }).toBuffer()
      : await sharp(src).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  if (out.length < src.length) {
    await fs.writeFile(file, out);
    after += out.length;
    console.log(`${(src.length / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB  ${file}`);
  } else {
    after += src.length;
  }
}

console.log(`\ntotal ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB`);

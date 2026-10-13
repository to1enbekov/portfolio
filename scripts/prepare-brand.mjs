import sharp from 'sharp';
import { mkdir, copyFile, readdir } from 'node:fs/promises';
import path from 'node:path';

// Deterministic export of the supplied raster. No redrawing or generated contours.
const input = process.argv[2] || '../logo/Symbol_Brand_Mark.png';
await mkdir('public/assets/brand', { recursive: true });
await mkdir('artifacts/brand', { recursive: true });
const { data, info } = await sharp(input)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
let left = info.width,
  right = 0,
  top = info.height,
  bottom = 0;
for (let y = 0; y < info.height; y++)
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    if (Math.max(data[i], data[i + 1], data[i + 2]) < 128) {
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }
const width = right - left + 1,
  height = bottom - top + 1;
const rgba = Buffer.alloc(width * height * 4);
for (let y = 0; y < height; y++)
  for (let x = 0; x < width; x++) {
    const i = ((y + top) * info.width + x + left) * info.channels;
    const luminance = (data[i] + data[i + 1] + data[i + 2]) / 3;
    // Suppress paper noise. Preserve antialiasing on the original edges.
    rgba[(y * width + x) * 4 + 3] = Math.round(
      Math.max(0, 255 - (luminance * 255) / 245),
    );
  }
const original = await sharp(rgba, { raw: { width, height, channels: 4 } })
  .png()
  .toBuffer();
await sharp(original)
  .resize({ height: 640 })
  .png()
  .toFile('public/assets/brand/ns-mark.png');
const white = Buffer.from(rgba);
for (let i = 0; i < white.length; i += 4)
  white[i] = white[i + 1] = white[i + 2] = 255;
await sharp(white, { raw: { width, height, channels: 4 } })
  .resize({ height: 640 })
  .png()
  .toFile('public/assets/brand/ns-mark-white.png');
for (const size of [32, 180, 512]) {
  const mark = await sharp(original)
    .resize({
      width: Math.round(size * 0.65),
      height: Math.round(size * 0.65),
      fit: 'inside',
    })
    .png()
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: '#ffffff' },
  })
    .composite([{ input: mark, gravity: 'centre' }])
    .png()
    .toFile(`public/assets/brand/icon-${size}.png`);
}
const mark = await sharp(original).resize({ height: 340 }).png().toBuffer();
const label = Buffer.from(
  '<svg width="1200" height="630"><rect width="1200" height="630" fill="#F5F5F7"/><text x="515" y="355" font-family="Arial, sans-serif" font-size="112" font-weight="400" fill="#111111">NS Dev</text><text x="519" y="411" font-family="Arial, sans-serif" font-size="24" fill="#6E6E73">Web · Mobile · Automation · AI</text></svg>',
);
await sharp(label)
  .composite([{ input: mark, left: 145, top: 145 }])
  .png()
  .toFile('public/assets/brand/og.png');
await sharp(original)
  .resize({ height: 256 })
  .flatten({ background: '#F5F5F7' })
  .png()
  .toFile('artifacts/brand/light.png');
await sharp(white, { raw: { width, height, channels: 4 } })
  .resize({ height: 256 })
  .flatten({ background: '#111111' })
  .png()
  .toFile('artifacts/brand/dark.png');
console.log(
  JSON.stringify({
    source: input,
    sourceSize: [info.width, info.height],
    crop: { left, top, width, height },
  }),
);
// Inventory contact sheet for visual review of all supplied variants.
const logoDir = path.dirname(input);
const files = (await readdir(logoDir)).filter((file) => file.endsWith('.png'));
const tiles = [];
for (let i = 0; i < files.length; i++) {
  const tile = await sharp(path.join(logoDir, files[i]))
    .resize(320, 320, { fit: 'contain', background: '#ffffff' })
    .png()
    .toBuffer();
  tiles.push({
    input: tile,
    left: (i % 4) * 320,
    top: Math.floor(i / 4) * 320,
  });
}
await sharp({
  create: { width: 1280, height: 640, channels: 3, background: '#ffffff' },
})
  .composite(tiles)
  .png()
  .toFile('artifacts/brand/source-inventory.png');
if (
  path.resolve(input) !== path.resolve('docs/legacy/NS-original-symbol.png')
) {
  await copyFile(input, 'docs/legacy/NS-original-symbol.png');
}

import { constants } from "node:fs";
import { access, copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [input, slug] = process.argv.slice(2);
if (!input || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error("Usage: node scripts/import-story-photo.mjs <source-image> <lowercase-slug>");
}
const source = path.resolve(input);
const outputDirectory = path.resolve("public/about");
const originalDirectory = path.resolve(".story-originals");
const output = path.join(outputDirectory, `${slug}.webp`);
await mkdir(outputDirectory, { recursive: true });
await mkdir(originalDirectory, { recursive: true });
try {
  await access(output);
  throw new Error(`Refusing to overwrite an existing photograph: ${output}`);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
// Keep the supplied original locally. WebP conversion strips image metadata and
// preserves the complete frame; it does not crop, retouch or generate imagery.
await copyFile(source, path.join(originalDirectory, `${slug}${path.extname(source)}`), constants.COPYFILE_EXCL);
const result = await sharp(source).rotate().resize({ width: 1600, height: 2000, fit: "inside", withoutEnlargement: true }).webp({ quality: 88 }).toFile(output);
await sharp(source).rotate().resize({ width: 180, height: 180, fit: "inside", withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(outputDirectory, `${slug}-thumb.webp`));
console.log(JSON.stringify({ src: `/about/${slug}.webp`, thumbnail: `/about/${slug}-thumb.webp`, width: result.width, height: result.height, bytes: (await stat(output)).size }));

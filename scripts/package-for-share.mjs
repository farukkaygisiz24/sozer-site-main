#!/usr/bin/env node
/**
 * Paylaşım zip'i — git, AI araçları, build çıktıları ve kişisel bilgiler hariç.
 * Alıcı: npm install && npm run dev
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUTPUT = path.join(ROOT, "..", `${path.basename(ROOT)}-share.zip`);
const STAGING = path.join(ROOT, "..", `.${path.basename(ROOT)}-share-tmp`);

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "out",
  ".cache",
  ".claude",
  ".cursor",
  ".vercel",
  "natro",
]);

const SKIP_FILES = new Set([".DS_Store", "next-env.d.ts"]);

const SKIP_PATH_PREFIXES = ["app/api/"];

function shouldSkip(relativePath) {
  const parts = relativePath.split(path.sep);
  if (parts.some((part) => SKIP_DIRS.has(part))) return true;
  if (SKIP_FILES.has(parts.at(-1) ?? "")) return true;
  const normalized = relativePath.replace(/\\/g, "/");
  if (SKIP_PATH_PREFIXES.some((prefix) => normalized.startsWith(prefix))) return true;
  if (normalized.endsWith(".tsbuildinfo")) return true;
  if (path.basename(normalized).startsWith(".env")) return true;
  return false;
}

function copyDir(src, dest, relative = "") {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const rel = relative ? `${relative}${path.sep}${entry.name}` : entry.name;
    if (shouldSkip(rel)) continue;

    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyDir(from, to, rel);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
    }
  }
}

const SHARE_README = `# ORTUNÇ YGM — Kurumsal Web Sitesi (v2)

ORTUNÇ YGM için Next.js tabanlı kurumsal web sitesi.

## Kurulum

\`\`\`bash
npm install
npm run dev
\`\`\`

Tarayıcıda \`http://localhost:3000\` adresini açın.

## Derleme

\`\`\`bash
npm run build
\`\`\`

Statik export varsayılan olarak \`out/\` klasörüne üretilir.
`;

if (fs.existsSync(STAGING)) {
  fs.rmSync(STAGING, { recursive: true, force: true });
}
if (fs.existsSync(OUTPUT)) {
  fs.rmSync(OUTPUT);
}

fs.mkdirSync(STAGING, { recursive: true });
copyDir(ROOT, STAGING);
fs.writeFileSync(path.join(STAGING, "README.md"), SHARE_README, "utf8");

const zipResult = spawnSync("zip", ["-r", OUTPUT, "."], {
  cwd: STAGING,
  stdio: "inherit",
});

fs.rmSync(STAGING, { recursive: true, force: true });

if (zipResult.status !== 0) {
  console.error("Zip oluşturulamadı.");
  process.exit(zipResult.status ?? 1);
}

const sizeMb = (fs.statSync(OUTPUT).size / (1024 * 1024)).toFixed(1);
console.log(`\nHazır: ${OUTPUT} (${sizeMb} MB)`);
console.log("\nZip içinde YOK:");
console.log("  .git, node_modules, .next, out, .cache");
console.log("  .cursor, .claude, .vercel, natro, app/api");
console.log("  Kişisel GitHub bilgileri (README sadeleştirildi)");
console.log("\nAlıcı için:");
console.log(`  unzip ${path.basename(OUTPUT)} -d ortunc-site`);
console.log("  cd ortunc-site");
console.log("  npm install");
console.log("  npm run dev");

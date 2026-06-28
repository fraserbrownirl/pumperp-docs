#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content", "docs");

const REQUIRED = ["title", "description"];

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.isFile() && /\.mdx?$/.test(e.name)) out.push(full);
  }
  return out;
};

const parseFrontmatter = (raw) => {
  if (!raw.startsWith("---")) return null;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return null;
  const block = raw.slice(3, end).trim();
  const fm = {};
  for (const line of block.split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    fm[m[1]] = v;
  }
  return fm;
};

const main = async () => {
  const files = await walk(ROOT);
  const errors = [];
  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const fm = parseFrontmatter(raw);
    if (!fm) {
      errors.push(`${file}: missing frontmatter`);
      continue;
    }
    for (const key of REQUIRED) {
      if (!fm[key]) errors.push(`${file}: missing required frontmatter "${key}"`);
    }
  }
  if (errors.length > 0) {
    for (const e of errors) console.error(e);
    process.exit(1);
  }
  console.log(`OK - ${files.length} pages have valid frontmatter`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

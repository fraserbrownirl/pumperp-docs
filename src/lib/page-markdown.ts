import { promises as fs } from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

const CONTENT_ROOT = path.join(process.cwd(), "content", "docs");

const stripFrontmatter = (raw: string): string => {
  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3);
    if (end !== -1) {
      const after = raw.slice(end + 4);
      return after.replace(/^\r?\n/, "");
    }
  }
  return raw;
};

const headingText = (line: string): string => {
  return line
    .replace(/^#{1,6}\s+/, "")
    .replace(/\{#[^}]+\}\s*$/, "")
    .replace(/[*_`]/g, "")
    .trim();
};

const headingDepth = (line: string): number => {
  const match = /^(#{1,6})\s+/.exec(line);
  return match ? match[1].length : 0;
};

const isCodeFence = (line: string): boolean => /^\s*```/.test(line);

export interface PageMarkdown {
  body: string;
  sections: Record<string, string>;
}

const resolveContentFile = async (slugSegments: string[]): Promise<string> => {
  const segments = slugSegments.length === 0 ? ["index"] : slugSegments;
  const candidates = [
    path.join(CONTENT_ROOT, ...segments) + ".mdx",
    path.join(CONTENT_ROOT, ...segments, "index.mdx"),
    path.join(CONTENT_ROOT, ...segments) + ".md",
    path.join(CONTENT_ROOT, ...segments, "index.md"),
  ];
  for (const file of candidates) {
    try {
      await fs.access(file);
      return file;
    } catch {
      // try next
    }
  }
  throw new Error(
    `No content file found for slug ${segments.join("/")} (tried: ${candidates.join(", ")})`,
  );
};

export const contentFileRelativePath = async (
  slugSegments: string[],
): Promise<string> => {
  const file = await resolveContentFile(slugSegments);
  return path.relative(process.cwd(), file).split(path.sep).join("/");
};

export const readPageMarkdown = async (
  slugSegments: string[],
): Promise<PageMarkdown> => {
  const file = await resolveContentFile(slugSegments);
  const raw = await fs.readFile(file, "utf8");
  const body = stripFrontmatter(raw).trim();
  const lines = body.split(/\r?\n/);

  const slugger = new GithubSlugger();
  const sections: Record<string, string> = {};

  let inFence = false;
  let currentSlug: string | null = null;
  let currentDepth = 0;
  let buffer: string[] = [];

  const flush = () => {
    if (currentSlug && buffer.length > 0) {
      sections[currentSlug] = buffer.join("\n").trimEnd();
    }
  };

  for (const line of lines) {
    if (isCodeFence(line)) {
      inFence = !inFence;
      if (currentSlug) buffer.push(line);
      continue;
    }
    if (!inFence) {
      const depth = headingDepth(line);
      if (depth === 2 || depth === 3) {
        if (currentSlug) flush();
        const text = headingText(line);
        const slug = slugger.slug(text);
        currentSlug = slug;
        currentDepth = depth;
        buffer = [line];
        continue;
      }
    }
    if (currentSlug) buffer.push(line);
  }
  if (currentSlug) flush();
  void currentDepth;

  return { body, sections };
};

export const listAllPages = async (): Promise<
  Array<{ slug: string[]; file: string }>
> => {
  const out: Array<{ slug: string[]; file: string }> = [];

  const walk = async (dir: string, slug: string[]): Promise<void> => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full, [...slug, entry.name]);
      } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
        const base = entry.name.replace(/\.mdx?$/, "");
        const pageSlug =
          base === "index" ? slug : [...slug, base];
        out.push({ slug: pageSlug, file: full });
      }
    }
  };

  await walk(CONTENT_ROOT, []);
  return out;
};

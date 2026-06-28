import { NextResponse } from "next/server";
import { source } from "@/lib/source";
import { listAllPages, readPageMarkdown } from "@/lib/page-markdown";
import { docsBaseUrl } from "@/lib/llm-targets";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = docsBaseUrl();
  const pages = await listAllPages();
  const sourcePages = source.getPages();

  const titleBySlug = new Map<string, string>();
  for (const sp of sourcePages) {
    const key = sp.url === "/" ? "" : sp.url.replace(/^\//, "");
    titleBySlug.set(key, sp.data.title ?? sp.url);
  }

  const out: string[] = [];
  out.push("# pumperp Docs (Full Corpus)");
  out.push("");
  out.push(`Source: ${baseUrl}`);
  out.push("");
  out.push("---");
  out.push("");

  for (const page of pages) {
    const slugKey = page.slug.join("/");
    const title = titleBySlug.get(slugKey) ?? (slugKey || "index");
    const path = slugKey ? `/${slugKey}` : "";
    const pageUrl = `${baseUrl}${path}`;

    try {
      const { body } = await readPageMarkdown(page.slug);
      out.push(`# ${title}`);
      out.push("");
      out.push(`Source: ${pageUrl}`);
      out.push("");
      out.push(body);
      out.push("");
      out.push("---");
      out.push("");
    } catch {
      // skip unreadable
    }
  }

  return new NextResponse(out.join("\n"), {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

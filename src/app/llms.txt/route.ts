import { NextResponse } from "next/server";
import { source } from "@/lib/source";
import { docsBaseUrl } from "@/lib/llm-targets";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = docsBaseUrl();
  const pages = source.getPages();

  const lines: string[] = [];
  lines.push("# pumperp Docs");
  lines.push("");
  lines.push(
    "> Technical documentation for pumperp — Clanker v4 launches on Base, Avantis perp desks, and the Fission-style buyback flywheel (PUM + creator tokens).",
  );
  lines.push("");
  lines.push("## Pages");
  lines.push("");

  for (const page of pages) {
    const url =
      page.url === "/" ? `${baseUrl}/index.md` : `${baseUrl}${page.url}.md`;
    const title = page.data.title ?? page.url;
    const desc =
      page.data.llmDescription ?? page.data.description ?? "";
    const suffix = desc ? `: ${desc}` : "";
    lines.push(`- [${title}](${url})${suffix}`);
  }

  return new NextResponse(lines.join("\n") + "\n", {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

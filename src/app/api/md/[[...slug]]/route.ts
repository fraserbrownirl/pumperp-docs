import { NextResponse } from "next/server";
import { listAllPages, readPageMarkdown } from "@/lib/page-markdown";

type RouteParams = Promise<{ slug?: string[] }>;

const stripMd = (segments: string[]): string[] | null => {
  if (segments.length === 0) return null;
  const last = segments[segments.length - 1];
  if (!/\.mdx?$/.test(last)) return null;
  const cleaned = last.replace(/\.mdx?$/, "");
  return [...segments.slice(0, -1), cleaned];
};

export async function GET(_req: Request, { params }: { params: RouteParams }) {
  const { slug } = await params;
  const segments = slug ?? [];
  const stripped = stripMd(segments);
  if (!stripped) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const pageSlug =
    stripped[stripped.length - 1] === "index"
      ? stripped.slice(0, -1)
      : stripped;

  try {
    const { body } = await readPageMarkdown(pageSlug);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=300",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}

export async function generateStaticParams() {
  const pages = await listAllPages();
  return pages.map((p) => {
    const last = p.slug.length === 0 ? "index" : p.slug[p.slug.length - 1];
    const head = p.slug.length === 0 ? [] : p.slug.slice(0, -1);
    return { slug: [...head, `${last}.md`] };
  });
}

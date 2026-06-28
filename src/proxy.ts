import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.endsWith(".md") || pathname.endsWith(".mdx")) {
    const url = req.nextUrl.clone();
    url.pathname = `/api/md${pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|llms\\.txt|llms-full\\.txt).*)"],
};

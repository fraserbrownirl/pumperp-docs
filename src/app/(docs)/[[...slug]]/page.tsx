import { notFound } from "next/navigation";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/components/mdx-components";
import { PageActionBar } from "@/components/llm-actions/PageActionBar";
import { SectionProvider } from "@/components/SectionContext";
import { contentFileRelativePath, readPageMarkdown } from "@/lib/page-markdown";
import { docsBaseUrl } from "@/lib/llm-targets";
import { githubSourceUrl } from "@/lib/github";

type RouteParams = Promise<{ slug?: string[] }>;

export default async function Page({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const slugSegments = slug ?? [];
  const page = source.getPage(slugSegments);
  if (!page) notFound();

  const MDX = page.data.body;
  const { body, sections } = await readPageMarkdown(slugSegments);

  const baseUrl = docsBaseUrl();
  const pagePath = slugSegments.length === 0 ? "/" : `/${slugSegments.join("/")}`;
  const pageUrl = `${baseUrl}${pagePath === "/" ? "" : pagePath}`;
  const rawMarkdownUrl = `${baseUrl}${pagePath === "/" ? "/index" : pagePath}.md`;
  const githubUrl = githubSourceUrl(await contentFileRelativePath(slugSegments));

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description ? (
        <DocsDescription>{page.data.description}</DocsDescription>
      ) : null}
      <PageActionBar
        pageTitle={page.data.title}
        pageUrl={pageUrl}
        rawMarkdownUrl={rawMarkdownUrl}
        pageMarkdown={body}
        githubUrl={githubUrl}
      />
      <DocsBody>
        <SectionProvider
          value={{
            pageTitle: page.data.title,
            pageUrl,
            rawMarkdownUrl,
            sections,
          }}
        >
          <MDX components={getMDXComponents()} />
        </SectionProvider>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  if (!page) return {};
  return {
    title: page.data.title,
    description: page.data.description,
  };
}

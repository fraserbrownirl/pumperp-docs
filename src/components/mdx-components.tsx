import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { H2, H3 } from "./SectionHeadings";

export const getMDXComponents = (
  components?: MDXComponents,
): MDXComponents => ({
  ...defaultMdxComponents,
  h2: H2,
  h3: H3,
  ...components,
});

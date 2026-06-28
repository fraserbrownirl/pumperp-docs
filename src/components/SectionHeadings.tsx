"use client";

import { Children, isValidElement } from "react";
import { useSectionContext } from "./SectionContext";
import { SectionMenu } from "./llm-actions/SectionMenu";

const extractText = (node: React.ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode } | undefined;
    return extractText(props?.children);
  }
  return "";
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  id?: string;
}

const renderWithMenu = (
  Tag: "h2" | "h3",
  { children, id, className, ...rest }: HeadingProps,
) => {
  const ctx = useSectionContext();
  const slug = id ?? "";
  const sectionMd = ctx?.sections?.[slug];
  const title = extractText(children);

  return (
    <Tag
      id={id}
      className={`group ${className ?? ""}`.trim()}
      {...rest}
    >
      {children}
      {ctx && sectionMd ? (
        <SectionMenu
          sectionSlug={slug}
          sectionTitle={title}
          sectionMarkdown={sectionMd}
          pageTitle={ctx.pageTitle}
          pageUrl={ctx.pageUrl}
          rawMarkdownUrl={ctx.rawMarkdownUrl}
        />
      ) : null}
    </Tag>
  );
};

export function H2(props: HeadingProps) {
  return renderWithMenu("h2", props);
}

export function H3(props: HeadingProps) {
  return renderWithMenu("h3", props);
}

void Children;

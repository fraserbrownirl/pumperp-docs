export interface LlmTarget {
  id: "chatgpt" | "claude" | "perplexity" | "grok";
  label: string;
  shortLabel: string;
  buildUrl: (prompt: string) => string;
}

export const LLM_TARGETS: LlmTarget[] = [
  {
    id: "chatgpt",
    label: "Open in ChatGPT",
    shortLabel: "ChatGPT",
    buildUrl: (prompt) =>
      `https://chatgpt.com/?hints=search&q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "claude",
    label: "Open in Claude",
    shortLabel: "Claude",
    buildUrl: (prompt) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "perplexity",
    label: "Open in Perplexity",
    shortLabel: "Perplexity",
    buildUrl: (prompt) =>
      `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "grok",
    label: "Open in Grok",
    shortLabel: "Grok",
    buildUrl: (prompt) => `https://grok.com/?q=${encodeURIComponent(prompt)}`,
  },
];

export const docsBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_DOCS_BASE_URL ?? "http://localhost:3000";
};

export const buildPagePrompt = (params: {
  pageUrl: string;
  pageTitle: string;
}): string => {
  return `Read ${params.pageUrl} and answer my questions about the pumperp docs page "${params.pageTitle}".\n\nMy question: `;
};

export const buildSectionPrompt = (params: {
  pageUrl: string;
  pageTitle: string;
  sectionTitle: string;
  sectionMarkdown: string;
}): string => {
  return `Read this section from the pumperp docs page "${params.pageTitle}" (full page: ${params.pageUrl}) and answer my questions about it.\n\n## ${params.sectionTitle}\n\n${params.sectionMarkdown}\n\nMy question: `;
};

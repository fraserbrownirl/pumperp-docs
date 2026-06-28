"use client";

import { useCallback, useState } from "react";
import {
  ClipboardCopy,
  ExternalLink,
  FileText,
  Bot,
  Sparkles,
  Search,
  Radar,
  Github,
} from "lucide-react";
import {
  LLM_TARGETS,
  buildPagePrompt,
} from "@/lib/llm-targets";

const TARGET_ICON: Record<string, React.ComponentType<{ className?: string }>> =
  {
    chatgpt: Bot,
    claude: Sparkles,
    perplexity: Search,
    grok: Radar,
  };

interface PageActionBarProps {
  pageTitle: string;
  pageUrl: string;
  rawMarkdownUrl: string;
  pageMarkdown: string;
  githubUrl: string;
}

export function PageActionBar({
  pageTitle,
  pageUrl,
  rawMarkdownUrl,
  pageMarkdown,
  githubUrl,
}: PageActionBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  }, [pageMarkdown]);

  const prompt = buildPagePrompt({ pageUrl, pageTitle });

  return (
    <div className="not-prose mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-fd-border bg-fd-card/50 p-2 text-sm">
      <span className="px-2 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
        LLM
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 py-1.5 text-xs font-medium text-fd-foreground transition hover:border-fd-primary/50 hover:text-fd-primary"
        aria-label="Copy this page as markdown"
      >
        <ClipboardCopy className="size-3.5" aria-hidden />
        {copied ? "Copied" : "Copy as Markdown"}
      </button>
      <a
        href={rawMarkdownUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 py-1.5 text-xs font-medium text-fd-foreground transition hover:border-fd-primary/50 hover:text-fd-primary"
      >
        <FileText className="size-3.5" aria-hidden />
        View Raw
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 py-1.5 text-xs font-medium text-fd-foreground transition hover:border-fd-primary/50 hover:text-fd-primary"
        aria-label="View this page's source on GitHub"
      >
        <Github className="size-3.5" aria-hidden />
        GitHub
      </a>
      <span className="mx-1 hidden h-5 w-px bg-fd-border sm:inline-block" />
      {LLM_TARGETS.map((target) => {
        const Icon = TARGET_ICON[target.id] ?? ExternalLink;
        return (
          <a
            key={target.id}
            href={target.buildUrl(prompt)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 py-1.5 text-xs font-medium text-fd-foreground transition hover:border-fd-primary/50 hover:text-fd-primary"
          >
            <Icon className="size-3.5" aria-hidden />
            {target.shortLabel}
          </a>
        );
      })}
    </div>
  );
}

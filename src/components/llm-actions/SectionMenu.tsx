"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, ClipboardCopy, FileText } from "lucide-react";
import { LLM_TARGETS, buildSectionPrompt } from "@/lib/llm-targets";

interface SectionMenuProps {
  sectionSlug: string;
  sectionTitle: string;
  sectionMarkdown: string;
  pageTitle: string;
  pageUrl: string;
  rawMarkdownUrl: string;
}

export function SectionMenu({
  sectionTitle,
  sectionMarkdown,
  pageTitle,
  pageUrl,
  rawMarkdownUrl,
}: SectionMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const prompt = buildSectionPrompt({
    pageUrl,
    pageTitle,
    sectionTitle,
    sectionMarkdown,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sectionMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  };

  return (
    <span
      className="not-prose relative ml-2 inline-flex align-middle"
      ref={ref}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-6 items-center justify-center rounded-md border border-transparent text-fd-muted-foreground opacity-0 transition group-hover:opacity-100 hover:border-fd-border hover:bg-fd-card hover:text-fd-foreground focus:opacity-100"
        aria-label={`Open LLM actions for section ${sectionTitle}`}
      >
        <Sparkles className="size-3.5" aria-hidden />
      </button>
      {open ? (
        <div className="absolute left-full top-0 z-30 ml-1 w-56 rounded-lg border border-fd-border bg-fd-popover p-1 text-sm shadow-lg">
          <div className="border-b border-fd-border px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-fd-muted-foreground">
            Section: {sectionTitle}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <ClipboardCopy className="size-3.5" aria-hidden />
            {copied ? "Copied" : "Copy section markdown"}
          </button>
          <a
            href={rawMarkdownUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-fd-accent hover:text-fd-accent-foreground"
          >
            <FileText className="size-3.5" aria-hidden />
            View raw page
          </a>
          <div className="my-1 h-px bg-fd-border" />
          {LLM_TARGETS.map((target) => (
            <a
              key={target.id}
              href={target.buildUrl(prompt)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
              <Sparkles className="size-3.5" aria-hidden />
              {target.label}
            </a>
          ))}
        </div>
      ) : null}
    </span>
  );
}

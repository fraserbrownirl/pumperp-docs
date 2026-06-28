"use client";

import { createContext, useContext } from "react";

export interface SectionContextValue {
  pageTitle: string;
  pageUrl: string;
  rawMarkdownUrl: string;
  sections: Record<string, string>;
}

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({
  value,
  children,
}: {
  value: SectionContextValue;
  children: React.ReactNode;
}) {
  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
}

export function useSectionContext(): SectionContextValue | null {
  return useContext(SectionContext);
}

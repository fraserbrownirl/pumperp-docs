export function BrandLogo() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <span
        aria-hidden
        className="flex size-6 items-center justify-center rounded-md bg-brand-600 text-[11px] font-bold text-white dark:bg-brand-500"
      >
        P
      </span>
      <span className="font-mono text-[15px]">
        pum<span className="text-brand-600 dark:text-brand-400">perp</span>
      </span>
      <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground sm:inline">
        Docs
      </span>
    </span>
  );
}

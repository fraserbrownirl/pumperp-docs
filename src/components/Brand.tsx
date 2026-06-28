import Image from "next/image";

export function BrandLogo() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <Image
        src="/pum-icon-trans.png"
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-md"
        aria-hidden
        priority
      />
      <span className="font-mono text-[15px]">
        pum<span className="text-brand-600 dark:text-brand-400">perp</span>
      </span>
      <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground sm:inline">
        Docs
      </span>
    </span>
  );
}

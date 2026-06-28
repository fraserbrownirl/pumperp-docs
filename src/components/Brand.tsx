import Image from "next/image";

export function BrandLogo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/pumperp-logo.png"
        alt="pumperp"
        width={1024}
        height={1024}
        className="h-8 w-auto shrink-0 rounded-md"
        priority
      />
      <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground sm:inline">
        Docs
      </span>
    </span>
  );
}

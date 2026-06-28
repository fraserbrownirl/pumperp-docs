import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";

export const metadata: Metadata = {
  title: {
    default: "pumperp Docs",
    template: "%s | pumperp Docs",
  },
  description:
    "Technical documentation for pumperp — perpetual-backed Clanker tokens on Base with the Fission fee flywheel.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_DOCS_BASE_URL ?? "http://localhost:3000",
  ),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: [{ url: "/pum-icon-trans.png", width: 1024, height: 1024, alt: "pumperp" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

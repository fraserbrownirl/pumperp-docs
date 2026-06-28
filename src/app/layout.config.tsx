import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BrandLogo } from "@/components/Brand";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <BrandLogo />,
    transparentMode: "top",
  },
  links: [
    {
      text: "pumperp.com",
      url: "https://pumperp.com",
      external: true,
    },
    {
      text: "GitHub",
      url: "https://github.com/fraserbrown/pumperp",
      external: true,
    },
  ],
};

import type { ReactNode } from "react";
import { Menu } from "~/components/ui/menu";
import type { LanguageType } from "~/server/i18n.server";

export default function PublicLayout({
  children,
  currentLang,
}: {
  children: ReactNode;
  currentLang: LanguageType;
}) {
  return (
    <div className="wrapper min-h-screen grid grid-rows-landingpage">
      <Menu currentLang={currentLang} />
      <div className="flex items-center pb-8 md:pb-12">{children}</div>
    </div>
  );
}

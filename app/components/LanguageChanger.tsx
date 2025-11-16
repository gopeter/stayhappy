import { Languages } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTranslation } from "~/hooks/useTranslation";
import type { LanguageType } from "~/server/i18n.server";

export default function LanguageChanger({
  currentLang,
}: {
  currentLang: LanguageType;
}) {
  const { t } = useTranslation();
  const location = useLocation();

  // Get the current path without the language prefix
  const getCurrentPath = () => {
    // Remove /en or /de prefix
    if (location.pathname.startsWith("/en")) {
      return location.pathname.substring(3) || "/";
    }
    if (location.pathname.startsWith("/de")) {
      return location.pathname.substring(3) || "/";
    }
    return location.pathname;
  };

  const currentPath = getCurrentPath();
  const englishUrl = `/en${currentPath === "/" ? "" : currentPath}`;
  const germanUrl = `/de${currentPath === "/" ? "" : currentPath}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="px-2">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link to={englishUrl} className="contents">
          <DropdownMenuCheckboxItem checked={currentLang === "en"}>
            {t.language.en}
          </DropdownMenuCheckboxItem>
        </Link>
        <Link to={germanUrl} className="contents">
          <DropdownMenuCheckboxItem checked={currentLang === "de"}>
            {t.language.de}
          </DropdownMenuCheckboxItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

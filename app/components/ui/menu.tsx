import { SmileIcon } from "lucide-react";
import { NavLink } from "react-router";
import type { LanguageType } from "~/server/i18n.server";
import LanguageChanger from "../LanguageChanger";
import ThemeChanger from "../ThemeChanger";

export function Menu({ currentLang }: { currentLang: LanguageType }) {
  const homeUrl = currentLang === "de" ? "/de" : "/en";

  return (
    <nav className="w-full mx-auto flex items-center justify-between my-8 md:my-12">
      <h1 className="text-primary font-medium">
        <NavLink to={homeUrl} className="flex items-center gap-2">
          <SmileIcon />
          StayHappy
        </NavLink>
      </h1>

      <ul className="flex flex-row space-x-5 text-sm font-medium items-center">
        <li>
          <LanguageChanger currentLang={currentLang} />
        </li>
        <li>
          <ThemeChanger />
        </li>
      </ul>
    </nav>
  );
}

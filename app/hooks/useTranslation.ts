import { useMatches } from "react-router";
import type { TranslationKeys } from "~/i18n/translations";
import { translations } from "~/i18n/translations";
import type { LanguageType } from "~/server/i18n.server";

export function useTranslation() {
  const matches = useMatches();

  // Find the layout route which contains the currentLang
  const publicLayoutMatch = matches.find(
    (match) => match.id === "routes/$lang",
  );

  const currentLanguage: LanguageType =
    (publicLayoutMatch?.data as { currentLang?: LanguageType })?.currentLang ||
    "en";

  const t = translations[currentLanguage] as TranslationKeys;

  return { t, currentLanguage };
}

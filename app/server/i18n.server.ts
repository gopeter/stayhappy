import acceptLanguage from "accept-language-parser";

export type LanguageType = "en" | "de";

const SUPPORTED_LANGUAGES: LanguageType[] = ["en", "de"];
const DEFAULT_LANGUAGE: LanguageType = "en";

// Get locale from Accept-Language header
export function getLocaleFromRequest(request: Request): LanguageType {
  const languages = acceptLanguage.parse(
    request.headers.get("Accept-Language") as string,
  );

  // If somehow the header is empty, return default locale
  if (languages?.length < 1) return DEFAULT_LANGUAGE;

  // Map common language codes to supported languages
  const langCode = languages[0].code;
  if (langCode.startsWith("de")) return "de";

  // Default to English
  return DEFAULT_LANGUAGE;
}

// Get language from URL parameter
export function getLanguageFromParams(params: { lang?: string }): LanguageType {
  const lang = params.lang;

  if (lang === "de") return "de";

  // Default to English for any other value or undefined
  return DEFAULT_LANGUAGE;
}

// Check if we should redirect to a localized version
export function shouldRedirectToLocalizedVersion(
  request: Request,
  currentLang: LanguageType,
): string | null {
  // Only redirect on the homepage and if no language preference has been expressed
  const url = new URL(request.url);

  // Don't redirect if we're already on a localized path
  if (url.pathname.startsWith("/de")) return null;

  // Don't redirect if we're not on the homepage
  if (url.pathname !== "/") return null;

  // Get preferred language from Accept-Language header
  const preferredLang = getLocaleFromRequest(request);

  // If the preferred language is German and we're on the English site, redirect
  if (preferredLang === "de" && currentLang === "en") {
    return "/de";
  }

  return null;
}

export function getSupportedLanguages(): LanguageType[] {
  return SUPPORTED_LANGUAGES;
}

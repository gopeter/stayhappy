import type { LoaderFunctionArgs } from "react-router";
import { Outlet, redirect, useLoaderData } from "react-router";
import PublicLayout from "~/components/layouts/PublicLayout";
import type { LanguageType } from "~/server/i18n.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  // If no language parameter, redirect based on Accept-Language header
  if (!params.lang) {
    const acceptLanguage = request.headers.get("Accept-Language");
    const preferredLang = acceptLanguage?.toLowerCase().includes("de")
      ? "de"
      : "en";

    // Preserve the path after the language prefix
    const newPath = `/${preferredLang}${url.pathname}${url.search}`;
    return redirect(newPath);
  }

  // Validate language parameter
  const currentLang: LanguageType = params.lang === "de" ? "de" : "en";

  // If invalid language, redirect to English
  if (params.lang !== "en" && params.lang !== "de") {
    return redirect(`/en${url.pathname}${url.search}`);
  }

  return { currentLang };
};

export default function UnauthedLayout() {
  const { currentLang } = useLoaderData<typeof loader>();

  return (
    <PublicLayout currentLang={currentLang}>
      <Outlet />
    </PublicLayout>
  );
}

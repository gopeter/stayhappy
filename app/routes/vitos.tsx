import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Detect preferred language from Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language");
  const preferredLang = acceptLanguage?.toLowerCase().includes("de") ? "de" : "en";

  // Redirect to language-specific homepage
  return redirect(`/${preferredLang}`);
};

// This route should never render, but just in case
export default function Vitos() {
  return null;
}

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useLocation,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import { DataFunctionArgs } from "@vercel/remix";
import { Analytics } from "@vercel/analytics/react";
import acceptLanguage from "accept-language-parser";
import React, { useEffect } from "react";
import { ToastsRenderer } from "./hooks/useToast";
import styles from "./root.css";
import { CLIENT_ENV } from "./env";
import { getCurrentTheme } from "./server/theme.server";
import { cn } from "./utils";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Work+Sans:wght@400;700&display=swap",
    },
    {
      rel: "icon",
      href: "/favicon.ico",
      sizes: "any",
    },
    {
      rel: "icon",
      href: "/favicon.svg",
      type: "image/svg+xml",
    },
  ];
}

// Load the locale from the Accept-Language header to later
// inject it on the app's context
function localeFromRequest(request: Request): string {
  const languages = acceptLanguage.parse(
    request.headers.get("Accept-Language") as string,
  );

  // If somehow the header is empty, return a default locale
  if (languages?.length < 1) return "en-us";

  // If there is no region for this locale, just return the country code
  if (!languages[0].region) return languages[0].code;

  return `${languages[0].code}-${languages[0].region.toLowerCase()}`;
}

export const loader = async ({ request }: DataFunctionArgs) => {
  return {
    locale: localeFromRequest(request),
    ENV: CLIENT_ENV,
    rootTime: new Date().toISOString(),
    currentTheme: await getCurrentTheme(request),
  };
};

export type RootLoaderType = Awaited<ReturnType<typeof loader>>;

export function useRootLoaderData(): RootLoaderType {
  return useMatches()[0].data as RootLoaderType;
}

function applySystemTheme() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const cl = document.documentElement.classList;

  cl.add(theme);
}

const applySystemThemeString = `
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
  const cl = document.documentElement.classList;

  cl.add(theme);
`;

export default function App() {
  const { ENV, currentTheme } = useLoaderData<RootLoaderType>();

  useEffect(() => {
    if (currentTheme === "system") applySystemTheme();
  }, [currentTheme]);

  return (
    <Document className={currentTheme}>
      <script
        // Set the variables for our `envVars` modules
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)};

          // Only apply the system theme if there's nothing on the cookie
          ${currentTheme === "system" ? applySystemThemeString : ""}`,
        }}
      />

      <Outlet />

      <ToastsRenderer />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </Document>
    );
  }

  console.error(error);

  return (
    <Document>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
    </Document>
  );
}

function Document({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  const location = useLocation();

  return (
    <React.StrictMode>
      <html
        className={cn(className, "bg-background text-foreground")}
        lang="en"
      >
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
        </head>
        <body className={location.pathname === "/" ? "dark landingpage" : ""}>
          <Analytics />

          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </React.StrictMode>
  );
}

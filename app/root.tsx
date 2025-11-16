import { Analytics } from "@vercel/analytics/react";
import React, { useEffect } from "react";
import type { LoaderFunctionArgs } from "react-router";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
  useRouteError,
} from "react-router";
import { CLIENT_ENV } from "./env";
import { ToastsRenderer } from "./hooks/useToast";
import styles from "./root.css?url";
import { getCurrentTheme } from "./server/theme.server";
import { cn } from "./utils";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return {
    ENV: CLIENT_ENV,
    rootTime: new Date().toISOString(),
    currentTheme: await getCurrentTheme(request),
    isSafari: request.headers.get("user-agent")?.includes("Safari/") ?? false,
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
  const { ENV, currentTheme, isSafari } = useLoaderData<RootLoaderType>();
  const matches = useMatches();

  // Get language from the public layout route
  const publicLayoutMatch = matches.find(
    (match) => match.id === "routes/_public",
  );
  const currentLanguage =
    (publicLayoutMatch?.data as { currentLang?: string })?.currentLang || "en";

  useEffect(() => {
    if (currentTheme === "system") applySystemTheme();
  }, [currentTheme]);

  return (
    <Document
      className={currentTheme}
      isSafari={isSafari}
      lang={currentLanguage}
    >
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
      <Document lang="en" isSafari={false}>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </Document>
    );
  }

  console.error(error);

  return (
    <Document lang="en" isSafari={false}>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
    </Document>
  );
}

function Document({
  children,
  title,
  className,
  isSafari,
  lang = "en",
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  isSafari: boolean;
  lang?: string;
}) {
  return (
    <React.StrictMode>
      <html
        className={cn(
          className,
          "bg-background text-foreground",
          isSafari && "is-safari",
        )}
        lang={lang}
      >
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
        </head>
        <body>
          <Analytics />

          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </React.StrictMode>
  );
}

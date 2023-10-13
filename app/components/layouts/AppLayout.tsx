import { Form, NavLink } from "@remix-run/react";
import { ReactNode } from "react";
import useFeatureFlags from "~/hooks/useFeatureFlags";
import { UserProvider } from "~/hooks/useUser";
import { AppRouteData } from "~/routes/_app";
import { Button } from "../ui/button";
import { Sidebar } from "../ui/sidebar";
import ThemeChanger from "../ThemeChanger";

function InnerAppInLayout({
  user,
  children,
}: {
  user: NonNullable<AppRouteData["user"]>;
  children: ReactNode;
}) {
  const { hasFeatureFlag } = useFeatureFlags();

  return (
    <div className="flex flex-col h-screen w-full px-12">
      <nav className="max-w-6xl mx-auto flex w-full justify-between shrink-0 py-8">
        {hasFeatureFlag("EXAMPLE_FEATURE_FLAG") ? (
          <p>Special welcome, {user.name}!</p>
        ) : (
          <p>Welcome, {user.name}!</p>
        )}

        <ul className="flex flex-row space-x-4 items-center">
          <li>
            <NavLink
              to="/events"
              prefetch="intent"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Events
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              prefetch="intent"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Profile
            </NavLink>
          </li>

          <li>
            <Form method="post" action="/logout">
              <Button type="submit" variant="destructive">
                Logout
              </Button>
            </Form>
          </li>

          <li>
            <ThemeChanger />
          </li>
        </ul>
      </nav>

      <Sidebar />

      <div className="contents">{children}</div>
    </div>
  );
}

export default function AppLayout({
  user,
  children,
}: {
  user: NonNullable<AppRouteData["user"]>;
  children: ReactNode;
}) {
  return (
    <UserProvider user={user}>
      <InnerAppInLayout user={user}>{children}</InnerAppInLayout>
    </UserProvider>
  );
}

import { SmileIcon } from "lucide-react";
import { Form, NavLink } from "@remix-run/react";

import { Button } from "~/components/ui/button";

import ThemeChanger from "../ThemeChanger";

export function Menu({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="w-full mx-auto flex items-center justify-between my-8 md:my-12">
      <h1 className="text-primary font-medium">
        <NavLink to="/" className="flex items-center gap-2">
          <SmileIcon />
          StayHappy
        </NavLink>
      </h1>

      <ul className="flex flex-row space-x-5 text-sm font-medium items-center">
        {isLoggedIn ? (
          <>
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
                <Button type="submit" size="sm" variant="secondary">
                  Logout
                </Button>
              </Form>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/login"
              prefetch="intent"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Login
            </NavLink>
          </li>
        )}

        <li>
          <ThemeChanger />
        </li>
      </ul>
    </nav>
  );
}

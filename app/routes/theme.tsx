import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "react-router";
import { setTheme } from "~/server/theme.server";

export const action: ActionFunction = async ({ request }) => setTheme(request);

export const loader: LoaderFunction = () => redirect("/", { status: 404 });

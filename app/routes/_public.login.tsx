import type {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
  SerializeFrom,
} from "@vercel/remix";
import { redirect } from "@vercel/remix";
import Login from "~/modules/Login";
import { authenticate, userFromRequest } from "~/server/auth.server";
import { login } from "~/server/users/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  // no need to show the login page to an already logged-in user
  if (user) return redirect("/events");

  return null;
};

export type LoginActionType = SerializeFrom<typeof action>;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const original = Object.fromEntries(formData) as Record<string, string>;
  const result = await login(formData);

  if (result.errors) return { errors: result.errors, original };

  return authenticate(result.data, original.redirectUrl as string) as never;
};

export const meta: MetaFunction = () => [
  {
    title: "Login · StayHappy",
  },
  {
    description: "Your little helper to remember nice things",
  },
];

export default function LoginPage() {
  return <Login />;
}

import { Outlet, useLoaderData } from "@remix-run/react";
import { DataFunctionArgs, SerializeFrom } from "@vercel/remix";
import AppLayout from "~/components/layouts/AppLayout";
import PublicLayout from "~/components/layouts/PublicLayout";
import Login from "~/modules/Login";
import { userFromRequest } from "~/server/auth.server";

export type AppRouteData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const user = await userFromRequest(request);

  return { user };
};

export default function AppPage() {
  const { user } = useLoaderData<AppRouteData>();

  if (!user)
    return (
      <PublicLayout isLoggedIn={false}>
        <Login />
      </PublicLayout>
    );

  return (
    <AppLayout user={user}>
      <Outlet />
    </AppLayout>
  );
}

import { Outlet, useLoaderData } from "@remix-run/react";
import { SerializeFrom, DataFunctionArgs } from "@vercel/remix";
import PublicLayout from "~/components/layouts/PublicLayout";
import { userFromRequest } from "~/server/auth.server";

export type PublicRouteData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const user = await userFromRequest(request);

  return { user };
};

export default function UnauthedLayout() {
  const { user } = useLoaderData<PublicRouteData>();

  return (
    <PublicLayout isLoggedIn={user ? true : false}>
      <Outlet />
    </PublicLayout>
  );
}

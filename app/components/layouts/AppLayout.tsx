import { ReactNode } from "react";
import useFeatureFlags from "~/hooks/useFeatureFlags";
import { UserProvider } from "~/hooks/useUser";
import { AppRouteData } from "~/routes/_app";
import { Menu } from "~/components/ui/menu";

function InnerAppInLayout({
  user,
  children,
}: {
  user: NonNullable<AppRouteData["user"]>;
  children: ReactNode;
}) {
  const { hasFeatureFlag } = useFeatureFlags();

  return (
    <div className="wrapper pb-10">
      <Menu isLoggedIn={true} />

      <div className="grid md:grid-cols-layout gap-12">{children}</div>
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

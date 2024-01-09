import { ReactNode } from "react";

import { Menu } from "~/components/ui/menu";

export default function PublicLayout({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: ReactNode;
}) {
  return (
    <div className="wrapper min-h-screen grid grid-rows-landingpage">
      <Menu isLoggedIn={isLoggedIn} />
      <div className="flex items-center pb-8 md:pb-12">{children}</div>
    </div>
  );
}

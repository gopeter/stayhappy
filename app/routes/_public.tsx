import { Outlet } from "react-router";
import PublicLayout from "~/components/layouts/PublicLayout";

export default function UnauthedLayout() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}

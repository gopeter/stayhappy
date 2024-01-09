import { createContext, ReactNode, useContext } from "react";
import { AppRouteData } from "~/routes/_app";

export const UserContext = createContext<AppRouteData["user"] | null>(null);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: NonNullable<AppRouteData["user"]>;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function useUser(): NonNullable<AppRouteData["user"]> {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>",
    );
  }

  return userContext;
}

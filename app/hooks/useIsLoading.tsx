import { useNavigation } from "react-router";

export default function useIsLoading() {
  const navigation = useNavigation();

  return navigation.state !== "idle";
}

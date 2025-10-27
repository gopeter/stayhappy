import { formatDistance } from "date-fns";
import { useMemo } from "react";
import { useRootLoaderData } from "~/root";

function formatDateLocale(timestamp: string, locale: string) {
  return new Date(timestamp).toLocaleString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatRelativeTime(timestamp: string, rootTime: string) {
  return formatDistance(new Date(timestamp), new Date(rootTime));
}

export default function useDates() {
  const { locale, rootTime } = useRootLoaderData();

  return useMemo(
    () => ({
      formatDateLocale: (timestamp: string) =>
        formatDateLocale(timestamp, locale),
      formatRelativeTime: (timestamp: string) =>
        formatRelativeTime(timestamp, rootTime),
    }),
    [locale, rootTime],
  );
}

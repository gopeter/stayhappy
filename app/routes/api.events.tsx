import { DataFunctionArgs, SerializeFrom } from "@vercel/remix";
import { userIdFromJwt } from "~/server/auth.server";
import { listApiEvents } from "~/server/events.server";

export type EventsRouteData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const jwt = userIdFromJwt(request);
  if (!jwt.id) return {};

  const url = new URL(request.url);
  const limit = url.searchParams.get("limit");

  const events = await listApiEvents(
    jwt.id,
    limit ? parseInt(limit, 10) : undefined,
  );
  return { events };
};

import { DataFunctionArgs, SerializeFrom } from "@vercel/remix";
import { userIdFromJwt } from "~/server/auth.server";
import { listApiEvents } from "~/server/events.server";

export type EventsRouteData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const jwt = userIdFromJwt(request);
  if (!jwt.id) return {};

  const events = await listApiEvents(jwt.id);
  return { events };
};

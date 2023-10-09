import { DataFunctionArgs, SerializeFrom } from "@vercel/remix";
import { userIdFromJwt } from "~/server/auth.server";
import { listEvents } from "~/server/events.server";

export type EventsRouteData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const jwt = userIdFromJwt(request);
  if (!jwt.id) return {};

  const events = await listEvents(jwt.id);
  return { events };
};

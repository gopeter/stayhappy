import {
  ActionFunction,
  DataFunctionArgs,
  SerializeFrom,
  MetaFunction,
  redirect,
} from "@vercel/remix";
import EventsDeleteAll from "~/modules/Events/EventsDeleteAll";
import EventsForm from "~/modules/Events/EventsForm";
import EventsList from "~/modules/Events/EventsList";
import { userIdFromRequest } from "~/server/auth.server";
import {
  createEvent,
  updateEvent,
  deleteAllEvents,
  deleteEvent,
  listEvents,
} from "~/server/events.server";

export type EventsRouteData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const events = await listEvents(userId);

  return { events };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await userIdFromRequest(request);
  const form = Object.fromEntries(await request.formData());

  switch (form._action) {
    case "create":
      await createEvent(userId, {
        content: form.content as string,
        startAt: new Date(form.startAt as string).toISOString(),
        endAt: new Date(form.endAt as string).toISOString(),
      });
      break;

    case "update":
      await updateEvent(form.eventId as string, {
        content: form.content as string,
        startAt: new Date(form.startAt as string).toISOString(),
        endAt: new Date(form.endAt as string).toISOString(),
      });
      break;

    case "delete":
      await deleteEvent(userId, form.id as string);
      break;

    case "delete-all":
      await deleteAllEvents(userId);
      break;
  }

  return redirect("/events");
};

export const meta: MetaFunction = () => [
  {
    title: "Events · StayHappy",
  },
  {
    description: "Your little helper to remember nice things",
  },
];

export default function EventsPage() {
  return (
    <>
      <main className="order-2 md:order-1">
        <h2 className="font-bold text-2xl mb-4">Events</h2>
        <EventsList />
        <EventsDeleteAll />
      </main>

      <div className="order-1 md:order-2">
        <h2 className="font-bold text-2xl mb-4">Add event</h2>
        <EventsForm mode="new" />
      </div>
    </>
  );
}

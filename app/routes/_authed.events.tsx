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
        start: new Date(form.start as string).toISOString(),
        end: new Date(form.end as string).toISOString(),
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
    title: "Remix Prisma Starter",
  },
  {
    description: "Welcome to remix!",
  },
];

export default function EventsPage() {
  return (
    <>
      <main className="max-w-xl w-full mx-auto flex-grow overflow-hidden">
        <EventsList />
      </main>

      <div className="shrink-0 max-w-xl w-full mx-auto py-8">
        <EventsDeleteAll />

        <EventsForm />
      </div>
    </>
  );
}

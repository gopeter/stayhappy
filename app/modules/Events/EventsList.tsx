import { useRef } from "react";
import { useLoaderData } from "@remix-run/react";

import { ScrollArea } from "~/components/ui/scroll-area";
import { EventsRouteData } from "~/routes/_app.events";

import Event from "./Event";

export default function EventsList() {
  const { events } = useLoaderData<EventsRouteData>();
  const eventsContainerRef = useRef<HTMLDivElement>(null);

  if (events.length === 0)
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-center">You have no events! Please write some.</p>
      </div>
    );

  return (
    <ScrollArea ref={eventsContainerRef}>
      <ul className="space-y-6 flex flex-col">
        {events.map((event) => (
          <Event key={event.id} {...event} />
        ))}
      </ul>
    </ScrollArea>
  );
}

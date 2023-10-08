import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { usePrevious } from "react-use";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import useDates from "~/hooks/useDates";
import useIsLoading from "~/hooks/useIsLoading";
import { EventsRouteData } from "~/routes/__authed.events";
import { cn } from "~/utils";

export default function EventsList() {
  const { events } = useLoaderData<EventsRouteData>();
  const { formatRelativeTime } = useDates();
  const previousEventsLength = usePrevious<number>(events.length);
  const eventsContainerRef = useRef<HTMLDivElement>(null);
  const isLoading = useIsLoading();

  // Scroll the events to bottom if a new one comes in
  useEffect(() => {
    if (events.length > (previousEventsLength || 0)) {
      if (!eventsContainerRef.current) return;

      const scrollingContainer =
        eventsContainerRef.current.querySelector("div");

      if (!scrollingContainer) return;

      scrollingContainer.scrollTop = scrollingContainer.scrollHeight;
    }
  }, [events.length, previousEventsLength]);

  if (events.length === 0)
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-center">You have no events! Please write some.</p>
      </div>
    );

  return (
    <ScrollArea className="max-h-full h-full" ref={eventsContainerRef}>
      <ul className="space-y-6 flex flex-col">
        {events.map((event) => (
          <li key={event.id}>
            <Card className="p-4 flex flex-row justify-between">
              <div className="flex flex-col space-y-6">
                <p>{event.content}</p>
                <p>Start: {event.start}</p>
                <p>End: {event.end}</p>

                <p className="text-xs opacity-75">
                  Created {formatRelativeTime(event.createdAt)} ago
                </p>
              </div>

              <Form
                method="post"
                className="flex flex-col items-center justify-center"
              >
                <input name="id" readOnly value={event.id} className="hidden" />
                <button
                  type="submit"
                  className={cn("link", {
                    "cursor-not-allowed": isLoading,
                  })}
                  disabled={isLoading}
                  name="_action"
                  value="delete"
                  aria-label="Delete event"
                >
                  X
                </button>
              </Form>
            </Card>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

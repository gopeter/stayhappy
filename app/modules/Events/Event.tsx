import { useState, useCallback } from "react";
import { Form } from "@remix-run/react";
import { Settings2Icon, Trash2Icon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { EventsRouteData } from "~/routes/_app.events";
import useDates from "~/hooks/useDates";
import useIsLoading from "~/hooks/useIsLoading";
import { cn } from "~/utils";
import EventsForm from "./EventsForm";

type Event = EventsRouteData["events"][0];
interface Props extends Event {}

export default function EventsList(event: Props) {
  const { formatDateLocale, formatRelativeTime } = useDates();
  const isLoading = useIsLoading();
  const [isEditing, setEditingMode] = useState(false);

  const handleEdit = () => {
    setEditingMode((mode) => !mode);
  };

  const afterSubmit = useCallback(() => {
    setEditingMode(false);
  }, []);

  return (
    <li>
      <Card className="p-4 flex flex-row justify-between">
        {isEditing ? (
          <div className="grow pr-4">
            <EventsForm
              mode="edit"
              afterSubmit={afterSubmit}
              eventId={event.id}
              content={event.content}
              startAt={event.startAt}
              endAt={event.endAt}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-6 grow">
              <p>
                <strong>{event.content}</strong>
              </p>

              <div className="grid grid-cols-[auto_1fr] gap-x-4">
                <span>Start</span>
                <span>{formatDateLocale(event.startAt)}</span>
                <span className="text-right">End</span>
                <span>{formatDateLocale(event.endAt)}</span>
              </div>

              <p className="text-xs opacity-75">
                Created {formatRelativeTime(event.createdAt)} ago
              </p>
            </div>
          </>
        )}

        <div className="flex flex-col grow-0 shrink-0 items-center justify-center">
          <Button
            type="button"
            onClick={handleEdit}
            aria-label="Edit event"
            size="sm"
            variant={isEditing ? "secondary" : "ghost"}
          >
            <Settings2Icon size={16} />
          </Button>
        </div>

        <Form
          method="post"
          className="flex flex-col grow-0 shrink-0 items-center justify-center"
        >
          <input name="id" readOnly value={event.id} className="hidden" />
          <Button
            type="submit"
            className={cn({
              "cursor-not-allowed": isLoading,
            })}
            disabled={isLoading}
            name="_action"
            value="delete"
            aria-label="Delete event"
            size="sm"
            variant="ghost"
          >
            <Trash2Icon size={16} />
          </Button>
        </Form>
      </Card>
    </li>
  );
}

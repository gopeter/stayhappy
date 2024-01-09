import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Form, useNavigation } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import { FullInput } from "~/components/ui/full-input";
import useIsLoading from "~/hooks/useIsLoading";

type Props =
  | {
      mode: "new";
    }
  | {
      mode: "edit";
      eventId: string;
      afterSubmit: () => void;
      content?: string;
      startAt?: string;
      endAt?: string;
    };

export default function EventsForm(props: Props) {
  const navigation = useNavigation();
  const isLoading = useIsLoading();

  const [startAt, setStartAt] = useState<string>(
    props.mode === "edit" && props.startAt
      ? new Date(props.startAt).toISOString().slice(0, 10)
      : "",
  );

  const [endAt, setEndAt] = useState<string>(
    props.mode === "edit" && props.endAt
      ? new Date(props.endAt).toISOString().slice(0, 10)
      : "",
  );

  const inputContentRef = useRef<HTMLInputElement>(null);

  const isSaving =
    navigation.state === "submitting" &&
    (navigation.formData?.get("_action") === "create" ||
      navigation.formData?.get("_action") === "update");

  const handleStartAtChange = (el: ChangeEvent<HTMLInputElement>) => {
    setStartAt(el.currentTarget.value);
    if (endAt === "") setEndAt(el.currentTarget.value);
  };

  const handleEndAtChange = (el: ChangeEvent<HTMLInputElement>) => {
    setEndAt(el.currentTarget.value);
  };

  useEffect(() => {
    if (!isSaving || !inputContentRef.current) return;

    inputContentRef.current.value = "";
    setStartAt("");
    setEndAt("");

    if (
      props.mode === "new" &&
      navigation.formData?.get("_action") === "create"
    ) {
      inputContentRef.current.focus();
    }

    if (
      props.mode === "edit" &&
      navigation.formData?.get("_action") === "update"
    ) {
      props.afterSubmit();
    }
  }, [isSaving, props, navigation.formData]);

  return (
    <Form method="post" className="flex flex-col items-end space-y-8">
      <FullInput
        defaultValue={props.mode === "edit" ? props.content : undefined}
        label="Content"
        name="content"
        type="text"
        required
        ref={inputContentRef}
        className="w-full"
        inputClassName="input-bordered"
      />

      <FullInput
        value={startAt}
        label="Start date"
        name="startAt"
        type="date"
        max={endAt}
        onChange={handleStartAtChange}
        required
        className="w-full"
        inputClassName="input-bordered"
      />

      <FullInput
        value={endAt}
        label="End date"
        name="endAt"
        type="date"
        min={startAt}
        onChange={handleEndAtChange}
        required
        className="w-full"
        inputClassName="input-bordered"
      />

      {props.mode === "edit" && (
        <input type="hidden" name="eventId" value={props.eventId} />
      )}

      <Button
        type="submit"
        isLoading={isLoading}
        name="_action"
        value={props.mode === "new" ? "create" : "update"}
        className="w-[120px]"
      >
        Submit
      </Button>
    </Form>
  );
}

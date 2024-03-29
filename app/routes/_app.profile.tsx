import { Form, useActionData, useLoaderData } from "@remix-run/react";
import type {
  DataFunctionArgs,
  SerializeFrom,
  MetaFunction,
} from "@vercel/remix";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { FullInput } from "~/components/ui/full-input";
import { updateUser } from "~/server/users.server";
import useIsLoading from "~/hooks/useIsLoading";
import useToast from "~/hooks/useToast";
import useUser from "~/hooks/useUser";
import { userIdFromRequest, userJwt } from "~/server/auth.server";
import { Card, CardTitle } from "~/components/ui/card";

export type ProfileRouteActionType = SerializeFrom<typeof action>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const jwt = await userJwt(userId);

  return { jwt };
};

export const action = async ({ request }: DataFunctionArgs) => {
  const userId = await userIdFromRequest(request);
  const form = await request.formData();

  return await updateUser(userId, form);
};

export const meta: MetaFunction = () => [
  {
    title: "Profile · StayHappy",
  },
  {
    description: "Your little helper to remember nice things",
  },
];

export default function Profile() {
  const user = useUser();
  const actionData = useActionData<ProfileRouteActionType>();
  const { toast } = useToast();
  const isLoading = useIsLoading();
  const { jwt } = useLoaderData();

  useEffect(() => {
    if (actionData?.errors) toast("Failed to update profile!", "error");
    else if (actionData?.data) toast("Updated profile!", "success");
  }, [actionData, toast]);

  return (
    <Card className="max-w-lg w-full mx-auto flex items-center justify-center">
      <Form method="post" className="p-10 w-full flex flex-col space-y-4">
        <CardTitle className="mb-8">Edit your profile</CardTitle>

        <FullInput
          label="JWT"
          name="jwt"
          type="text"
          disabled
          defaultValue={jwt}
        />

        <FullInput
          label="Email"
          name="email"
          type="text"
          required
          placeholder="hello@email.com"
          defaultValue={user.email}
          errors={actionData?.errors}
        />

        <FullInput
          label="Name"
          name="name"
          type="text"
          required
          placeholder="How you would like to be called"
          defaultValue={user.name}
          errors={actionData?.errors}
        />

        <FullInput
          label="Current password"
          name="currentPassword"
          type="password"
          placeholder="**************"
          required
          autoComplete="current-password"
          errors={actionData?.errors}
        />

        <FullInput
          label="New password"
          name="newPassword"
          type="password"
          placeholder="**************"
          autoComplete="new-password"
          errors={actionData?.errors}
        />

        <FullInput
          label="Confirm password"
          name="passwordConfirmation"
          type="password"
          placeholder="**************"
          autoComplete="new-password"
          errors={actionData?.errors}
          className="pb-4"
        />

        <Button type="submit" isLoading={isLoading}>
          Update profile
        </Button>
      </Form>
    </Card>
  );
}

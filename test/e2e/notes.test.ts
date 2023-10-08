import { faker } from "@faker-js/faker";
import { waitFor } from "@playwright-testing-library/test";
import { Screen } from "@playwright-testing-library/test/dist/fixture/types";
import { expect } from "@playwright/test";
import { createUserAndLogin, test } from "./utils";

async function createEvent(screen: Screen) {
  const event = faker.git.commitSha();

  screen.getByLabelText("New todo").fill(event);
  screen.getByText("Submit").click();
  await screen.findByText(event);

  return event;
}

async function getEventsLength(screen: Screen) {
  return (await screen.queryAllByLabelText("Delete event").allTextContents())
    .length;
}

test("creates events", async ({ page, screen }) => {
  await createUserAndLogin(page, screen);

  const event = await createEvent(screen);

  expect(await screen.getByText(event).count()).toBe(1);
});

test("deletes events", async ({ page, screen }) => {
  await createUserAndLogin(page, screen);
  await createEvent(screen);

  const eventsCountBefore = await getEventsLength(screen);
  screen.getAllByLabelText("Delete event").first().click();

  await waitFor(async () =>
    expect(await getEventsLength(screen)).toBe(eventsCountBefore - 1),
  );
});

test("deletes all events", async ({ page, screen }) => {
  await createUserAndLogin(page, screen);
  await createEvent(screen);
  await createEvent(screen);
  await createEvent(screen);

  screen.getAllByLabelText("Delete all events").first().click();

  await waitFor(async () => expect(await getEventsLength(screen)).toBe(0));
});

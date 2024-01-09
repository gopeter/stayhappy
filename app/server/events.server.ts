import { Event } from "@prisma/client";
import prisma from "./utils/prisma.server";

export async function listEvents(userId: string): Promise<Event[]> {
  if (!userId) return [];

  return prisma.event.findMany({
    where: {
      userId,
    },
    orderBy: [{ startAt: "desc" }, { createdAt: "asc" }],
  });
}

export async function listApiEvents(
  userId: string,
  limit: number = 4,
): Promise<Event[]> {
  if (!userId) return [];

  const startOfToday = new Date().setHours(0, 0, 0, 0);

  return prisma.event.findMany({
    where: {
      userId,
      startAt: {
        gte: new Date(startOfToday),
      },
    },
    take: limit,
    orderBy: { startAt: "asc" },
  });
}

export async function deleteEvent(userId: string, id: string): Promise<void> {
  await prisma.event.deleteMany({ where: { id, userId: userId } });
}

export async function deleteAllEvents(userId: string): Promise<void> {
  await prisma.event.deleteMany({ where: { userId: userId } });
}

export async function createEvent(
  userId: string,
  eventParams: { content: string; startAt: string; endAt: string },
) {
  return prisma.event.create({
    data: { ...eventParams, user: { connect: { id: userId } } },
  });
}

export async function updateEvent(
  eventId: string,
  eventParams: { content: string; startAt: string; endAt: string },
) {
  return prisma.event.update({
    data: { ...eventParams },
    where: { id: eventId },
  });
}

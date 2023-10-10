import { Event } from "@prisma/client";
import prisma from "./utils/prisma.server";

export async function listEvents(userId: string): Promise<Event[]> {
  if (!userId) return [];

  return prisma.event.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function listApiEvents(
  userId: string,
  limit: number = 4,
): Promise<Event[]> {
  if (!userId) return [];

  return prisma.event.findMany({
    where: {
      userId,
      start: {
        gte: new Date(),
      },
    },
    take: limit,
    orderBy: { start: "asc" },
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
  eventParams: { content: string; start: string; end: string },
) {
  return prisma.event.create({
    data: { ...eventParams, user: { connect: { id: userId } } },
  });
}

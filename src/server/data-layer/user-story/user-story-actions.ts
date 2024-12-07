"use server";

import { userStorySchema } from "@/schemas/schemas";
import { db } from "@/server/db";
import { type userStoryType } from "@/types/types";

export async function createUserStory(payload: userStoryType): Promise<userStoryType> {
    const { data, error } = userStorySchema.safeParse(payload);
    if (error) return 'Payload does not have required format or does not exist.'
    return await db.userStory.create({
        data: {
            title: data.title,
            description: data.description,
            userEpic: { connect: { id: data.userEpic?.id } },
        }
    }).catch((e) => console.error(e));
}

export async function updateUserStory(payload: userStoryType, id: number) {
    const { data, error } = userStorySchema.safeParse(payload);
    if (error) return 'Payload does not have required format or does not exist.'
    await db.userStory.update({
        data: {
            title: data.title,
            description: data.description,
            userEpic: { connect: { id: data.userEpic?.id } }
        },
        where: { id: id }
    })
}
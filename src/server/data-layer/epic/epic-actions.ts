"use server";

import { userEpicSchema } from "@/schemas/schemas";
import { db } from "@/server/db";
import { type userEpicType } from "@/types/types";

export async function createUserEpic(payload: userEpicType): Promise<userEpicType> {
    const { data, error } = userEpicSchema.safeParse(payload);
    if (error) return 'Payload does not have required format or does not exist.'
    return await db.userEpic.create({
        data: {
            title: data.title,
            description: data?.description,
        }
    }).catch((e) => console.error(e));
}

export async function updateUserEpic(payload: userEpicType, id: number): Promise<userEpicType> {
    const { data, error } = userEpicSchema.safeParse(payload)
    if (error) return 'Payload does not have required format or does not exist.'
    return await db.userEpic.update({
        data: {
            title: data.title,
            description: data?.description,
        },
        where: { id: id }
    }).catch((e) => console.error(e));
}
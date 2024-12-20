import { userStoryListSchema, userStorySchema } from "@/schemas/schemas";
import { db } from "@/server/db";

/**
 * Fetchs an User Story using an id
 * @param id id used to filter all the stories
 * @returns fetched user story
 */
export async function fetchUserStoryById(id: number) {
    return await db.userStory.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            userEpic: true,
            description: true
        }
    }).then((res) => userStorySchema.safeParse(res).data)
}

export async function fetchUserStories() {
    return await db.userStory.findMany({
        select: {
            id: true,
            title: true,
            description: true
        }
    }).then((res) => userStoryListSchema.safeParse(res).data!)
}
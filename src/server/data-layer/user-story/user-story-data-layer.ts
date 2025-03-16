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

/**
 * Returns all the users stories without any filter
 * @returns all the user stories
 */
export async function fetchUserStories() {
    return await db.userStory.findMany({
        orderBy: {
            userEpic: {
                title: 'asc',
            }
        },
        select: {
            id: true,
            title: true,
        },
    })
}

export async function fetchUserStoriesByEnvironment(environmentId: number) {
    return await db.userStory.findMany({
        where: {
            casesOfThisStory: {
                some: {
                    environmentWhereIsExecuted: {
                        some: {
                            environmentId: environmentId || 1
                        }
                    }
                }
            }
        },
        include: {
            userEpic: true
        }
    }).then((res) => userStoryListSchema.safeParse(res).data!);
}

/**
 * Returns all the user stories related to an epic
 * @param epicId used to filter user stories
 * @returns all the user stories filtered by an epic
 */
export async function fetchUserStoriesByUserEpics(epicId: number) {
    return await db.userStory.findMany({
        where: {
            userEpicId: epicId
        },
        include: {
            userEpic: true
        }
    }).then((res) => userStoryListSchema.safeParse(res).data!)
}
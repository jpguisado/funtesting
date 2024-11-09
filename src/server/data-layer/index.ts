import { db } from "../db";

export async function fetchUserEpics() {
    return await db.userEpic.findMany({
        select: {
            id: true,
            title: true,
            description: true
        }
    })
}

export async function fetchUserEpicById(id: number) {
    return await db.userEpic.findFirst({
        where: {
            id: id
        }
    })
}

export async function fetchUsers() {
    return await db.user.findMany()
}

export async function fetchUserStories() {
    return await db.userStory.findMany({

    })
}

export async function fetchSteps() {
    return await db.step.findMany({})
}

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
        include: { 
            userEpic: true
        }
    })
}

export async function fetchTestCases() {
    return await db.testCase.findMany({
        include: {
            stepList: true,
            relatedStory: true,
            executor: true,
        },
        orderBy: {
            executionOrder: 'asc'
        },
    })
}

export async function fetchTestCase(id: number) {
    return await db.testCase.findFirst({
        where: {
            id: id
        },
        include: {
            executor: true,
            stepList: {
                select: {
                    case: true,
                    expectedResult: true,
                    id: true,
                    isBlocker: true,
                    order: true,
                    stepDescription: true,
                    stepStatus: true,
                },
                orderBy: {
                    order: 'asc'
                }
            },
            relatedStory: true
        }
    })
}

export async function fetchStringOfTest() {
    return await db.userEpic.findMany({
        include: {
            userStoriesOfThisEpic: {
                include: {
                    casesOfThisStory: {orderBy: {executionOrder: 'asc'}}
                }
            }
        }
    })
}
import { userEpicListType } from "@/types/types";
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

export async function fetchUserStories() {
    return await db.userStory.findMany({

    })
}

export async function fetchTestCases() {
    return await db.testCase.findMany({
        include: {
            stepList: true,
            relatedStory: true,
        }
    })
}

export async function fetchTestCase(id: number) {
    return await db.testCase.findFirst({
        where: {
            id: id
        },
        include: {
            stepList: true
        }
    })
}

export async function fetchStringOfTest(): userEpicListType {
    return await db.userEpic.findMany({
        include: {
            userHistories: {
                include: {
                    casesOfThisHistory: true
                }
            }
        }
    })
}
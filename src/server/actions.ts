'use server'

import { newTestCaseType, userEpicType, userStoryType } from "@/types/types";
import { db } from "./db";

export async function createUserEpic(data: userEpicType) {
    await db.userEpic.create({
        data: data
    })
}

export async function createUserStory(data: userStoryType) {
    try {
        await db.userStory.create({
            data: {
                title: data.title,
                description: data.description,
                userEpic: { connect: { id: data.userEpic.id } },
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function createNewTestCase(data: newTestCaseType) {
    console.log(data.stepList);
    await db.testCase.create({
        data: {
            titleCase: data.titleCase,
            preconditions: data.preconditions,
            relatedStory: { connect: { id: data.userStory.id }},
            // userEpic: { connect: { id: data.userEpic.id }},
            stepList: {createMany: {data: data.stepList}},
        }
    })
}
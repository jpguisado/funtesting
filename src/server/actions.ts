'use server'

import { editTestCaseType, newTestCaseType, userEpicType, userStoryType } from "@/types/types";
import { db } from "./db";

export async function createUserEpic(data: userEpicType) {
    await db.userEpic.create({
        data: data
    })
}

export async function updateUserEpic(data: userEpicType, id: number) {
    await db.userEpic.update({
        data: data,
        where: { id: id }
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

export async function updateUserStory(data: userStoryType, id: number) {
    console.log(data)
    await db.userStory.update({
        data: {
            title: data.title,
            description: data.description,
            userEpic: { connect: { id: data.userEpic.id } }
        },
        where: { id: id }
    })
}

export async function createNewTestCase(data: newTestCaseType) {
    await db.testCase.create({
        data: {
            titleCase: data.titleCase,
            preconditions: data.preconditions,
            relatedStory: { connect: { id: data.relatedStory.id } },
            stepList: { createMany: { data: data.stepList } },
            executor: { connect: { id: data.executor.id } }
        }
    })
}

export async function updateTestCase(data: editTestCaseType, id: number) {
    await db.testCase.update({
        data: {
            titleCase: data.titleCase,
            preconditions: data.preconditions,
            relatedStory: { update: { id: data.relatedStory.id } },
            executor: { connect: { id: data.executor.id } }
        },
        where: {
            id: id
        }
    })

    for (const step of data.stepList) {
        // Check if the step has an existing ID, if so, update it
        if (step.id) {
            await db.step.update({
                where: {
                    id: step.id,
                },
                data: {
                    expectedResult: step.expectedResult,
                    isBlocker: step.isBlocker,
                    stepDescription: step.stepDescription,
                    order: step.order,
                    stepStatus: step.stepStatus,
                },
            });
        } else {
            // Otherwise, create a new step
            await db.step.create({
                data: {
                    expectedResult: step.expectedResult,
                    isBlocker: step.isBlocker,
                    stepDescription: step.stepDescription,
                    order: step.order,
                    stepStatus: step.stepStatus,
                    testCaseId: id
                },
            });
        }
    }
}

export async function updateStepStatus(data: string, id: number) {
    await db.step.update({
        where: {
            id: id
        },
        data: {
            stepStatus: data
        }
    })
}
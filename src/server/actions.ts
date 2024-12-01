'use server'

import { testCaseType, userEpicType, userStoryType } from "@/types/types";
import { db } from "./db";
import { revalidatePath } from "next/cache";

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
    await db.userStory.update({
        data: {
            title: data.title,
            description: data.description,
            userEpic: { connect: { id: data.userEpic.id } }
        },
        where: { id: id }
    })
}

/**
 * @deprecated
 * @param data 
 */
export async function createNewTestCase(data: testCaseType) {
    await db.testCase.create({
        data: {
            titleCase: data.titleCase,
            preconditions: data.preconditions,
            relatedStory: { connect: { id: data.relatedStory.id } },
            stepList: { createMany: { data: data.stepList } },
        }
    })
}

export async function updateTestCaseDate(id: number) {
    await db.testCase.update({
        data: {
            updatedAt: new Date()
        },
        where: {
            id: id
        }
    });
    revalidatePath(`/test-execution/details?id=${id}`)
}

export async function updateTestCaseStatus(testCaseId: number, environmentId: number, status: string) {
    console.log(status)
    await db.testCaseInEnvironment.update({
        data: {
            status: status
        },
        where: {
            environmentId_testCaseId: {
                testCaseId: testCaseId,
                environmentId: environmentId,
            }
        }
    })
    revalidatePath('/test-execution/details')
}

export async function updateStepStatusInEnvironment(status: string, stepId: number, environmentId: number) {
    await db.stepStatusByEnvironment.update({
        where: {
            environmentId_stepId: {
                stepId: stepId,
                environmentId: environmentId
            }
        },
        data: {
            status: status
        }
    })
}

export async function updateTestCaseOrder(from: number, to: number) {
    console.log(from, to);
    const fromPositionTestCaseId = await db.testCase.findFirst({
        select: {
            id: true,
        },
        where: {
            executionOrder: from
        }
    });

    const toPositionTestCaseId = await db.testCase.findFirst({
        select: {
            id: true,
        },
        where: {
            executionOrder: to
        }
    });

    await db.testCase.update({
        data: {
            executionOrder: to
        },
        where: {
            id: fromPositionTestCaseId!.id
        }
    })

    await db.testCase.update({
        data: {
            executionOrder: from
        },
        where: {
            id: toPositionTestCaseId!.id
        }
    })
    revalidatePath('/test-case')
}

export async function deleteStep(id: number) {
    console.log(id)
    await db.stepStatusByEnvironment.delete({
        where: {
            environmentId_stepId: {
                stepId: id,
                environmentId: 1
            }
        }
    })
    await db.step.delete({
        where: {
            id: id
        }
    })
}

export async function copyCasesOnEnvironment(fromEnvironment: number, toEnvironment: number) {

    // Retrieve all the cases from the original environment
    const cases = await db.testCaseInEnvironment.findMany({
        where: {
            environmentId: fromEnvironment
        },
        select: {
            testCaseId: true
        }
    })

    // Prepare data with destination environmet
    const casesWithEnv = cases.map((tcase) => {
        return {
            testCaseId: tcase.testCaseId,
            environmentId: toEnvironment,
        }
    })

    // Inserts all the records
    await db.testCaseInEnvironment.createMany({
        data: casesWithEnv,
        skipDuplicates: true,
    },
    )
}
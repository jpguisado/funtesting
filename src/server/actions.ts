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

export async function createNewTestCase(data: testCaseType) {
    await db.testCase.create({
        data: {
            titleCase: data.titleCase,
            preconditions: data.preconditions,
            relatedStory: { connect: { id: data.relatedStory.id } },
            stepList: { createMany: { data: data.stepList } },
            executor: { connect: { id: data.executor.id } },
        }
    })
}

export async function updateTestCase(data: testCaseType, id: number) {
    await db.testCase.update({
        data: {
            // TODO: restore env an update it.
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
                    testCaseId: id
                },
            });
        }
    }
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
    await db.step.delete({ where: { id: id } })
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
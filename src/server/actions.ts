'use server'

import type { testCaseType } from "@/types/types";
import { revalidatePath } from "next/cache";
import { db } from "./db";

/**
 * @deprecated
 * @param data 
 */
export async function createNewTestCase(data: testCaseType) {
    await db.testCase.create({
        data: {
            titleCase: data.titleCase,
            preconditions: data.preconditions,
            relatedStory: { connect: { id: data.relatedStory!.id } },
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

/**
 * Update the proposed execution order of the test cases
 * @param from position where the test case is
 * @param to position where the test case will be
 * @param environmentId id of the environment
 */
export async function updateTestCaseOrder(from: number, to: number, environmentId: number) {
    // Retrieve the id of the test case in the 'from' position
    const fromPositionTestCaseId = await db.testCase.findFirst({
        select: {
            id: true,
        },
        where: {
            executionOrder: from,
            environmentWhereIsExecuted: {
                some: {
                    environmentId: environmentId
                }
            }
        }
    });
    // Retrieve the id of the test case in the 'to' position
    const toPositionTestCaseId = await db.testCase.findFirst({
        select: {
            id: true,
        },
        where: {
            executionOrder: to,
            environmentWhereIsExecuted: {
                some: {
                    environmentId: environmentId
                }
            }
        }
    });
    await db.testCase.update({
        data: {
            executionOrder: to
        },
        where: {
            id: fromPositionTestCaseId!.id,
            environmentWhereIsExecuted: {
                some: {
                    environmentId: environmentId
                }
            }
        }
    })

    await db.testCase.update({
        data: {
            executionOrder: from
        },
        where: {
            id: toPositionTestCaseId!.id,
            environmentWhereIsExecuted: {
                some: {
                    environmentId: environmentId
                }
            }
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
            userId: '' // TODO
        }
    })

    // Inserts all the records
    await db.testCaseInEnvironment.createMany({
        data: casesWithEnv,
        skipDuplicates: true,
    },
    )
}
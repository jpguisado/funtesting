"use server";

import { testCaseType } from "@/types/types";
import { db } from "../db";

export async function fetchTestCaseByEnvironmentAndId(testCaseId: number, environmentId: number) {
    const rawTestCase = await db.testCase.findFirst({
        where: {
            id: testCaseId
        },
        include: {
            executor: {
                select: {
                    name: true,
                    id: true
                }
            },
            stepList: {
                select: {
                    id: true,
                    stepDescription: true,
                    expectedResult: true,
                    isBlocker: true,
                    order: true,
                    stepStatusByEnv: {
                        select: {
                            stepId: true,
                            status: true
                        },
                        where: {
                            environmentId: environmentId,
                        }
                    }
                },
                orderBy: {
                    order: 'asc'
                }
            },
        }
    })

    return {
        titleCase: rawTestCase?.titleCase,
        preconditions: rawTestCase?.preconditions,
        executor: rawTestCase?.executor,
        updatedAt: rawTestCase?.updatedAt,
        stepList: rawTestCase?.stepList.map((step) => {
            return {
                id: step.id,
                stepDescription: step.stepDescription,
                expectedResult: step.expectedResult,
                status: step.stepStatusByEnv[0]?.status || '',
                isBlocker: step.isBlocker,
                order: step.order,
            }
        }),
    }

}

export async function createTestCaseWithSteps(data: testCaseType) {
    console.log('Argumento: ')
    console.log(data);
    const createdTest = await db.testCase.create({
        data: {
            titleCase: data.titleCase,
            preconditions: data.preconditions,
            relatedStory: { connect: { id: data.relatedStory.id } },
            stepList: { createMany: { data: data.stepList } },
            executor: { connect: { id: data.executor.id } },
            environmentWhereIsExecuted: {
                create: {
                    environmentId: data.environmentWhereIsExecuted.id,
                    status: 'pendiente'
                }
            }
        },
        include: {
            stepList: {
                include: { stepStatusByEnv: true }
            }
        }
    });
    const stepswithEnv = createdTest.stepList.map((step) => {
        return {
            stepId: step.id,
            environmentId: data.environmentWhereIsExecuted.id,
            status: 'pendiente'
        }
    })
    await db.stepStatusByEnvironment.createMany({
        data: stepswithEnv
    })
}
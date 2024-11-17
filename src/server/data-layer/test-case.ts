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
                status: step.stepStatusByEnv[0].status,
                isBlocker: step.isBlocker,
                order: step.order,
            }
        }),
    }

}
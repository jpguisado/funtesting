import { db } from "../db";

export async function fetchTestCaseByIdAndEnvironment(testCaseId: number, environmentId: number) {
    if (!testCaseId) return null
    return await db.testCase.findFirst({
        where: {
            id: testCaseId,
            environmentWhereIsExecuted: {
                some: {
                    environmentId: environmentId
                }
            }
        },
        include: {
            stepList: {
                select: {
                    expectedResult: true,
                    id: true,
                    isBlocker: true,
                    order: true,
                    stepDescription: true,
                },
                orderBy: {
                    order: 'asc'
                }
            },
            relatedStory: true,
            environmentWhereIsExecuted: {
                include: {
                    environment: true,
                    executor: true,
                }
            },
        }
    }).then((res) => {
        return {
            relatedStory: res?.relatedStory,
            environmentWhereIsExecuted: res?.environmentWhereIsExecuted[0],
            id: res?.id,
            titleCase: res?.titleCase,
            preconditions: res?.preconditions,
            stepList: res?.stepList,


        }
    })
}
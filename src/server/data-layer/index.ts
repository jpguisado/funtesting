import { clerkClient } from "@clerk/nextjs/server";
import { db } from "../db";
import { testCaseListType } from "@/app/export/select-from-client";
import { userStoryListSchema, userStorySchema } from "@/schemas/schemas";

const usersFromClerk = await (await clerkClient()).users.getUserList();
export const clerkUsers = usersFromClerk.data.map((user) => {
    return {
        id: user.id,
        name: user.fullName!,
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
    }
})

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
    return await db.userStory.findMany().then((res) => userStoryListSchema.safeParse(res).data!)
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
        select: {
            title: true,
            userEpic: true
        }
    }).then((res) => userStorySchema.safeParse(res).data)
}

export async function fetchTestCases() {
    return await db.testCase.findMany({
        include: {
            stepList: true,
            relatedStory: true,
        },
        orderBy: {
            executionOrder: 'asc'
        },
    })
}

export async function fetchTestCasesByEnvironment(id: number): Promise<testCaseListType> {
    return await db.testCase.findMany({
        include: {
            stepList: {
                select: {
                    expectedResult: true,
                    stepDescription: true,
                    order: true
                }
            },
            relatedStory: true,
        },
        orderBy: {
            executionOrder: 'asc'
        },
        where: {
            environmentWhereIsExecuted: {
                every: {
                    environmentId: {
                        equals: id || 1
                    }
                },
            }
        }
    }).catch((error) => {
        console.log('No se ha pasado id de entorno');
        throw error;
    })
}



export async function fetchTestCaseWithEnvirontmentByEnvId(environmentId: number) {
    if(!environmentId) return null;
    const testCases = await db.testCaseInEnvironment.findMany({
        include: {
            executor: true,
            testCase: {
                include: {
                    stepList: {
                        include: {
                            stepStatusByEnv: {
                                select: {
                                    status: true
                                }
                            }
                        }
                    },
                }
            },
        },
        orderBy: {
            testCase: {
                executionOrder: 'asc'
            }
        },
        where: {
            environmentId: environmentId
        },
    }).catch((error) => {
        console.error('Error en la op. de bbdd ', error)
    });
    if (testCases) {
        return testCases.map((test) => {
            return {
                environmentId: test.environmentId,
                testCaseId: test.testCaseId,
                testCase: test.testCase,
                executor: test.executor,
                status: test.status,
                stepListLength: test.testCase.stepList.length,
                title: test.testCase.titleCase,
                executionOrder: test.testCase.executionOrder,
            }
        })
    }
}

export async function fetchTestCaseById(id: number) {
    return await db.testCase.findFirst({
        where: {
            id: id
        },
        include: {
            stepList: {
                select: {
                    // case: true,
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
                    executor: true
                }
            },
        }
    })
}

export async function fetchStringOfTest() {
    return await db.userEpic.findMany({
        include: {
            userStoriesOfThisEpic: {
                include: {
                    casesOfThisStory: { orderBy: { executionOrder: 'asc' } }
                }
            }
        }
    })
}

export async function fetchEnvironment() {
    return await db.environment.findMany({
        select: {
            id: true,
            title: true,
            URL: true,
        }
    })
}

export async function fetchTestCaseByEnvironmentAndId(testCaseId: number, environmentId: number) {
    const rawTestCase = await db.testCase.findFirst({
        where: {
            id: testCaseId
        },
        include: {
            environmentWhereIsExecuted: {
                include: {
                    executor: true,
                },
                where: {
                    environmentId: environmentId,
                    testCaseId: testCaseId,
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
        executor: rawTestCase?.environmentWhereIsExecuted[0]?.executor,
        preconditions: rawTestCase?.preconditions,
        updatedAt: rawTestCase?.updatedAt,
        status: rawTestCase?.environmentWhereIsExecuted[0]?.status,
        stepList: rawTestCase?.stepList.map((step) => {
            return {
                id: step.id,
                stepDescription: step.stepDescription,
                expectedResult: step.expectedResult,
                status: step.stepStatusByEnv[0]?.status ?? '',
                isBlocker: step.isBlocker,
                order: step.order,
            }
        }),
    }

}
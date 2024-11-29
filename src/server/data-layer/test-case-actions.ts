"use server";

import { testCaseType } from "@/types/types";
import { db } from "../db";
import {testCaseSchema } from "@/schemas/schemas";

export async function createTestCaseWithSteps(testData: testCaseType) {

    const {data} = testCaseSchema.safeParse(testData);
    console.log(data)

    if (data) {
        const { titleCase, preconditions, relatedStory, environmentWhereIsExecuted } = data;
        const createdTest = await db.testCase.create({
            data: {
                titleCase: titleCase,
                preconditions: preconditions,
                stepList: {
                    createMany: {
                        data: data.stepList
                    }
                },
                relatedStory: {connect: relatedStory},
            },
            include: {
                stepList: {
                    include: { stepStatusByEnv: true }
                }
            }
        });
        if (environmentWhereIsExecuted!.environment.id) {
            const id = environmentWhereIsExecuted!.environment.id;
            await db.testCaseInEnvironment.create({
                data: {
                    environmentId: id,
                    testCaseId: createdTest.id,
                    userId: environmentWhereIsExecuted?.executor.id
                }
            })
            const stepswithEnv = createdTest.stepList.map((step) => {
                return {
                    stepId: step.id,
                    environmentId: id,
                    status: 'pendiente',
                    comment: '',
                }
            })
            await db.stepStatusByEnvironment.createMany({
                data: stepswithEnv
            })
        }
    }
}

export async function updateTestCase(data: testCaseType, id: number) {
    await db.testCase.update({
        data: {
            updatedAt: new Date(),
            titleCase: data.titleCase,
            preconditions: data.preconditions,
            relatedStory: { update: { id: data.relatedStory.id } },
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
            const newSteps = await db.step.create({
                data: {
                    expectedResult: step.expectedResult,
                    isBlocker: step.isBlocker,
                    stepDescription: step.stepDescription,
                    order: step.order,
                    testCaseId: id
                },
            });
            await db.stepStatusByEnvironment.create({
                data: {
                    status: 'pendiente',
                    environmentId: data.environmentWhereIsExecuted.id,
                    stepId: newSteps.id
                }
            })
        }
    }
}


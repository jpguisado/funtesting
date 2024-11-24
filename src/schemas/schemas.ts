import { z } from "zod";

export const projectSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string().optional(),
    environments: z.lazy(() => environmentListSchema),
})

export const environmentSchema: z.ZodType<Environment> = z.object({
    id: z.number().optional(),
    title: z.string(),
    URL: z.string(),
    project: projectSchema.optional(),
    testCaseInEnvironment: z.lazy(() => testCaseSchema.array()).optional(),
    // Missing attribute: steps in env
})

export const userSchema = z.object({
    id: z.string().optional(),
    email: z.string().email(),
    name: z.string().optional(),
    assignedTest: z.lazy(() => testCaseSchema.array()).optional()
})

export const userEpicSchema: z.ZodType<UserEpic> = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string().optional(),
    userStoriesOfThisEpic: z.lazy(() => userStoryListSchema)
});

export const userEpicListSchema = userEpicSchema.array()

export const userStorySchema = z.object({
    id: z.number().optional(),
    title: z.string().min(2, {
        message: "User Epic must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "User History must be at least 2 characters.",
    }).optional(),
    userEpic: userEpicSchema.optional(),
    casesOfThisStory: z.lazy(() => testCaseSchema.array()).optional()
})

export const userStoryListSchema = userStorySchema.array()

export const stepSchema: z.ZodType<Step> = z.object({
    id: z.number().optional(),
    case: z.lazy(() => testCaseSchema).optional(),
    stepDescription: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    expectedResult: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    isBlocker: z.string().optional(),
    order: z.number(),
    stepStatusByEnv: z.lazy(() => stepStatusByEnvironmentSchema.omit({step: true, environment: true}).optional())
})

export const stepListSchema = stepSchema.array();

export const userListSchema = userSchema.array();

export const testCaseSchema: z.ZodType<TestCase> = z.object({
    id: z.number().optional(),
    titleCase: z.string(),
    executor: userSchema.optional(),
    relatedStory: userStorySchema.optional(),
    preconditions: z.string().min(1, {
        message: "At least one precondition."
    }),
    stepList: stepSchema.array(),
    executionOrder: z.number(),
    updatedAt: z.date().optional(),
    environmentWhereIsExecuted: z.lazy(() => environmentSchema)
})

export const stepStatusByEnvironmentSchema = z.object({
    environment: environmentSchema,
    step: stepSchema,
    status: z.string(),
})

export const environmentListSchema = environmentSchema.array();


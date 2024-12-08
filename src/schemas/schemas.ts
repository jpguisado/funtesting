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
    testCaseInEnvironment: z.lazy(() => testCaseInEnvironmentSchema.array()).optional(),
})

export const userSchema = z.object({
    id: z.string().optional(),
    email: z.string().email(),
    name: z.string().min(2, {message: 'Select an asignee'}),
    assignedTest: z.lazy(() => testCaseSchema.array()).optional()
})

export const userEpicSchema: z.ZodType<UserEpic> = z.object({
    id: z.number().optional(),
    title: z.string().min(2, {
        message: 'This epic needs a title'
    }),
    description: z.string().optional(),
    userStoriesOfThisEpic: z.lazy(() => userStoryListSchema).optional()
});

export const userEpicListSchema = userEpicSchema.array()

export const userStorySchema = z.object({
    id: z.number().optional(),
    title: z.string().min(2, {
        message: "Title must have at least 2 characters long.",
    }),
    description: z.string().min(2, {
        message: "Description must have at least 2 characters long.",
    }),
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
    stepStatusByEnv: z.lazy(() => stepStatusByEnvironmentSchema.omit({step: true, environment: true}))
})

export const stepListSchema = stepSchema.array();

export const userListSchema = userSchema.array();

export const testCaseInEnvironmentSchema = z.object({
    environment: environmentSchema,
    testCase: z.lazy(() => testCaseSchema).optional(),
    status: z.string().min(2, { message: 'At least we need two chars' }),
    executor: userSchema.required(),
})

export const testCaseSchema: z.ZodType<TestCase> = z.object({
    id: z.number().optional(),
    titleCase: z.string().min(1, {
        message: "Test must have a title."
    }),
    relatedStory: userStorySchema.required(),
    preconditions: z.string().min(1, {
        message: "Please, fill preconditions of this case"
    }),
    stepList: stepSchema.array(),
    executionOrder: z.number().optional(),
    updatedAt: z.date().optional(),
    environmentWhereIsExecuted: testCaseInEnvironmentSchema.pick({environment: true, executor: true, status: true})
})

export const stepStatusByEnvironmentSchema = z.object({
    environment: environmentSchema,
    step: stepSchema,
    status: z.string(),
})

export const environmentListSchema = environmentSchema.array();


import { z, ZodType } from "zod";

export const userEpicSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string().optional(),
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
    userEpic: userEpicSchema.optional()
})

export const userStoryListSchema = userStorySchema.array()

export const stepSchema = z.object({
    id: z.number().optional(),
    stepDescription: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    expectedResult: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    isBlocker: z.string().optional(),
    stepStatus: z.string().optional(),
    order: z.number(),
})

export const stepListSchema = stepSchema.array();

export const userSchema = z.object({
    id: z.string().optional(),
    email: z.string().email(),
    name: z.string()
})

export const userListSchema = userSchema.array();

export const testCaseSchema = z.object({
    id: z.number().optional(),
    titleCase: z.string(),
    executor: userSchema.optional(),
    relatedStory: userStorySchema.optional(),
    preconditions: z.string().min(1, {
        message: "At least one precondition."
    }),
    stepList: stepSchema.array(),
    executionOrder: z.number().default(0),
    // status: z.string().default('no ejecutado'),
    updatedAt: z.date().optional(),
    environmentWhereIsExecuted: z.lazy((): ZodType => environmentSchema), // ???
})

export const projectSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    URL: z.string(),
    // enviroments: z.lazy(() => environmentSchema.optional())  
})

export const environmentSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    URL: z.string(),
    testCaseInEnvironment: testCaseSchema.array().optional(),
    project: projectSchema.optional(),
})

export const stepStatusByEnvironmentSchema = z.object({
    environment: environmentSchema,
    step: stepSchema,
    status: z.string(),
})

export const environmentListSchema = environmentSchema.array();
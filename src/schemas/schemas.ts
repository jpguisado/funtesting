import { z } from "zod";

export const userEpicSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string().optional(),
});

export const userEpicListSchema = userEpicSchema.array()

export const userStorySchema = z.object({
    title: z.string().min(2, {
        message: "User Epic must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "User History must be at least 2 characters.",
    }).optional(),
    userEpic: userEpicSchema.optional()
})

export const userStoryListSchema = userStorySchema.array()

export const FieldValidationSchema = z.object({
    fieldLabel: z.string().min(1, {
        message: "You need at least 1 character.",
    }).optional(),
    fieldValidation: z.string().min(1, {
        message: "You need at least 1 character.",
    }).array().optional(),
})

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

export const TestCaseSchema = z.object({
    userEpic: userEpicSchema.optional(),
    relatedStory: userEpicSchema.optional(), // TODO: VER QUE HACEMOS CON ESTO
    titleCase: z.string(),
    preconditions: z.string().min(1, {
        message: "At least one precondition."
    }),
    stepList: stepSchema.array(),
    executionOrder: z.number().default(0),
    status: z.string().default('no ejecutado'),
    executor: userSchema.optional(),
    updatedAt: z.date()
})

export const NewTestCaseSchema = z.object({
    userEpic: userEpicSchema.optional(),
    userStory: userEpicSchema.optional(), // TODO: VER QUE HACEMOS CON ESTO
    titleCase: z.string(),
    preconditions: z.string().min(1, {
        message: "At least one precondition."
    }),
    stepList: stepSchema.array(),
    executionOrder: z.number().default(0),
    status: z.string().default('no ejecutado'),
    executor: userSchema.optional(),
})

export const EditTestCaseSchema = z.object({
    relatedStory: userEpicSchema.optional(),
    executor: userSchema.optional(),
    titleCase: z.string(),
    preconditions: z.string().min(1, {
        message: "At least one precondition."
    }),
    stepList: stepSchema.array(),
    executionOrder: z.number().default(0),
    status: z.string().default('no ejecutado')
})
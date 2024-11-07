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

export const StepSchema = z.object({
    id: z.number().optional(),
    stepDescription: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    expectedResult: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    // field: FieldValidationSchema.array().optional(),
    isBlocker: z.string().optional(),
    stepStatus: z.string().optional(),
    // TODO: relatedWithStepId
    order: z.number(),
})

export const NewTestCaseSchema = z.object({
    userEpic: userEpicSchema.optional(),
    userStory: userEpicSchema.optional(), // TODO: VER QUE HACEMOS CON ESTO
    titleCase: z.string(),
    preconditions: z.string().min(1, {
        message: "At least one precondition."
    }),
    stepList: StepSchema.array(),
    executionOrder: z.number().default(0),
    status: z.string().default('no ejecutado')
})

export const EditTestCaseSchema = z.object({
    relatedStory: userEpicSchema.optional(),
    titleCase: z.string(),
    preconditions: z.string().min(1, {
        message: "At least one precondition."
    }),
    stepList: StepSchema.array(),
    executionOrder: z.number().default(0),
    status: z.string().default('no ejecutado')
})
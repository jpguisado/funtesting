import { Environment, Step, TestCase, UserEpic } from "@/types/ts";
import { z } from "zod";

// Base schemas for common properties
const baseEntitySchema = z.object({
    id: z.number().optional(),
});

export const projectSchema = baseEntitySchema.extend({
    title: z.string(),
    description: z.string().optional(),
    environments: z.lazy(() => environmentListSchema),
})

export const environmentSchema: z.ZodType<Environment> = baseEntitySchema.extend({
    title: z.string(),
    URL: z.string(),
    project: z.lazy(() => projectSchema.optional()),
    testCaseInEnvironment: z.lazy(() => testCaseInEnvironmentSchema.array()).optional(),
})

export const userSchema = z.object({
    id: z.string().optional(),
    email: z.string().email(),
    name: z.string().min(2, {message: 'Name is required'}),
    assignedTest: z.lazy(() => testCaseSchema.array()).optional()
})

export const userEpicSchema: z.ZodType<UserEpic> = baseEntitySchema.extend({
    title: z.string().min(2, {
        message: 'This epic needs a title'
    }),
    description: z.string().optional(),
    userStoriesOfThisEpic: z.lazy(() => userStoryListSchema).optional()
})

export const userEpicListSchema = userEpicSchema.array()

export const userStorySchema = baseEntitySchema.extend({
    title: z.string().min(2, {
        message: "Title must have at least 2 characters long.",
    }),
    description: z.string().min(2, {
        message: "Description must have at least 2 characters long.",
    }).optional(),
    userEpic: userEpicSchema.optional(),
    casesOfThisStory: z.lazy(() => testCaseSchema.array()).optional()
})

export const userStoryListSchema = userStorySchema.array()

export const stepSchema: z.ZodType<Step>  = baseEntitySchema.extend({
    case: z.lazy(() => testCaseSchema).optional(),
    stepDescription: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    expectedResult: z.string().min(2, {
        message: "You need at least 2 characters.",
    }),
    isBlocker: z.string().nullable(),
    order: z.number(),
    stepStatusByEnv: z.lazy(() => stepStatusByEnvironmentSchema.omit({step: true, environment: true}).optional())
})

export const stepListSchema = stepSchema.array();

export const userListSchema = userSchema.array();

export const cicleSchema = baseEntitySchema.extend({
  title: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.string(),
})

// Environment execution status schema
const executionStatusSchema = z.object({
    environment: environmentSchema,
    executor: userSchema,
    cicle: cicleSchema,
    status: z.string().min(2, { 
      message: 'At least we need two chars' 
    }),
  });

// TestCaseInEnvironment schema with lazy reference
export const testCaseInEnvironmentSchema = executionStatusSchema.extend({
    testCase: z.lazy(() => testCaseSchema).optional(),
  });

export const testCaseSchema: z.ZodType<TestCase> = baseEntitySchema.extend({
    titleCase: z.string().min(1, {
        message: "Test must have a title."
    }),
    relatedStory: userStorySchema.optional(),
    preconditions: z.string().min(1, {
        message: "Please, fill preconditions of this case"
    }),
    stepList: stepSchema.array(),
    executionOrder: z.number().optional(),
    updatedAt: z.date().optional(),
    environmentWhereIsExecuted: testCaseInEnvironmentSchema.pick({environment: true, executor: true, status: true, cicle: true}).optional()
})

export const stepStatusByEnvironmentSchema = z.object({
    environment: environmentSchema,
    step: stepSchema,
    status: z.string(),
})

export const environmentListSchema = environmentSchema.array();


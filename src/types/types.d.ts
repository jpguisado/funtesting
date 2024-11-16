import {
    userEpicSchema,
    userSchema,
    userListSchema,
    userStorySchema,
    userStoryListSchema,
    userEpicListSchema,
    testCaseSchema,
    stepSchema,
    stepListSchema,
    environmentSchema,
    environmentListSchema
} from "@/schemas/schemas"

export type testCaseType = z.infer<typeof testCaseSchema>
export type userStoryType = z.infer<typeof userStorySchema>
export type userEpicType = z.infer<typeof userEpicSchema>
export type userStoryListType = z.infer<typeof userStoryListSchema>
export type userEpicListType = z.infer<typeof userEpicListSchema>
export type userType = z.infer<typeof userSchema>
export type userListType = z.infer<typeof userListSchema>
export type stepType = z.infer<typeof stepSchema>
export type stepListType = z.infer<typeof stepListSchema>
export type stepListType = z.infer<typeof stepListSchema>
export type environmentType = z.infer<typeof environmentSchema>
export type environmentListType = z.infer<typeof environmentListSchema>
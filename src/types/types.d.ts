import {
    userEpicSchema,
    userSchema,
    userListSchema,
    userStorySchema,
    userStoryListSchema,
    userEpicListSchema,
    NewTestCaseSchema,
    EditTestCaseSchema,
    testCaseSchema,
    stepSchema,
    stepListSchema,
} from "@/schemas/schemas"

export type testCaseType = z.infer<typeof testCaseSchema>

export type newTestCaseType = z.infer<typeof NewTestCaseSchema>
export type editTestCaseType = z.infer<typeof EditTestCaseSchema>
export type userStoryType = z.infer<typeof userStorySchema>
export type userEpicType = z.infer<typeof userEpicSchema>
export type userStoryListType = z.infer<typeof userStoryListSchema>
export type userEpicListType = z.infer<typeof userEpicListSchema>
export type userType = z.infer<typeof userSchema>
export type userListType = z.infer<typeof userListSchema>
export type stepType = z.infer<typeof stepSchema>
export type stepListType = z.infer<typeof stepListSchema>
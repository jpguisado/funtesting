import { userEpicSchema, userStorySchema, userStoryListSchema, userEpicListSchema, NewTestCaseSchema, EditTestCaseSchema } from "@/schemas/schemas"

export type newTestCaseType = z.infer<typeof NewTestCaseSchema>
export type editTestCaseType = z.infer<typeof EditTestCaseSchema>
export type userStoryType = z.infer<typeof userStorySchema>
export type userEpicType = z.infer<typeof userEpicSchema>
export type userStoryListType = z.infer<typeof userStoryListSchema>
export type userEpicListType = z.infer<typeof userEpicListSchema>
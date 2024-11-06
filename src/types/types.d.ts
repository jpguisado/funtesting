import { userEpicSchema, userStorySchema, userStoryListSchema, userEpicListSchema, NewTestCaseSchema } from "@/schemas/schemas"

export type newTestCaseType = z.infer<typeof NewTestCaseSchema>
export type userStoryType = z.infer<typeof userStorySchema>
export type userEpicType = z.infer<typeof userEpicSchema>
export type userStoryListType = z.infer<typeof userStoryListSchema>
export type userEpicListType = z.infer<typeof userEpicListSchema>
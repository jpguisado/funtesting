import { fetchUserEpics } from "@/server/data-layer/epic/epic-data-layer";
import UserStoryForm from "../user-story-form"
import { fetchUserStoryById } from "@/server/data-layer/user-story/user-story-data-layer";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) {
    const id = (await searchParams).id
    const userEpicList = await fetchUserEpics();
    const userStory = await fetchUserStoryById(parseInt(id))

    return (
        <UserStoryForm
            editedUserStory={userStory}
            userEpicsList={userEpicList}
        />
    )
}
import { fetchUserEpics } from "@/server/data-layer";
import NewUserStoryForm from "./new-user-story-form";

export default async function Page() {
    const userEpicsList = await fetchUserEpics()
    return <NewUserStoryForm userEpicsList={userEpicsList} />
}
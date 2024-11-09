import { fetchUserEpics } from "@/server/data-layer";
import UserStoryForm from "./user-story-form";

export const dynamic = 'force-dynamic'

export default async function Page() {
    const userEpicsList = await fetchUserEpics();
    return <UserStoryForm
        userEpicsList={userEpicsList}
    />
}
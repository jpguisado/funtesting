import { fetchUserEpics } from "@/server/data-layer";
import NewUserStoryForm from "./user-story-form";

export const dynamic = 'force-dynamic'

export default async function Page() {
    const userEpicsList = await fetchUserEpics();
    return <NewUserStoryForm userEpicsList={userEpicsList} />
}
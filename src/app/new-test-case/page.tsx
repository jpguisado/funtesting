import { fetchUserEpics, fetchUserStories } from "@/server/data-layer";
import NewTestCaseForm from "./new-test-case-form";

export default async function Page() {

    const userStories = await fetchUserStories();
    const userEpics = await fetchUserEpics();

    return <NewTestCaseForm 
        userStoriesList={userStories}
        userEpicsList={userEpics}
        />
}
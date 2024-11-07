import { fetchUserStories } from "@/server/data-layer";
import NewTestCaseForm from "./new-test-case-form";

export default async function Page() {

    const userStories = await fetchUserStories();

    return <NewTestCaseForm
        userStoriesList={userStories}
    />
}
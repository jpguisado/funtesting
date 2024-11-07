import { fetchUserStories } from "@/server/data-layer";
import NewTestCaseForm from "./new-test-case-form";

export const dynamic = 'force-dynamic'

export default async function Page() {

    const userStories = await fetchUserStories();
    return <NewTestCaseForm
        userStoriesList={userStories}
    />
}
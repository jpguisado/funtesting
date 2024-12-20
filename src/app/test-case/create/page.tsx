import { clerkUsers, fetchEnvironment } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";
import { fetchUserStories } from "@/server/data-layer/user-story/user-story-data-layer";

export default async function Page() {
    const userStories = await fetchUserStories();
    const enviromentList = await fetchEnvironment();
    
    return <TestCaseForm
        userStoriesList={userStories}
        userList={clerkUsers}
        enviromentList = {enviromentList}
    />
}
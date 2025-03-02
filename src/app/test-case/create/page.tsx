import { clerkUsers, fetchEnvironment } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";
import { fetchUserStories } from "@/server/data-layer/user-story/user-story-data-layer";
import { fetchTestCycleList } from "@/server/data-layer/cycles/cycles-data";

export default async function Page() {
    const userStories = await fetchUserStories();
    const enviromentList = await fetchEnvironment();
    const testCyclesList = await fetchTestCycleList();
    return <TestCaseForm
        testCyclePayload={testCyclesList}
        userStoriesList={userStories}
        userList={clerkUsers}
        enviromentList = {enviromentList}
    />
}
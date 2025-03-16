import { clerkUsers, fetchEnvironment } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";
import { fetchUserStories } from "@/server/data-layer/user-story/user-story-data-layer";
import { fetchTestCycleList } from "@/server/data-layer/cycles/cycles-data";
import { Suspense } from "react";

export default function Page() {
    const userStories = fetchUserStories();
    const enviromentList = fetchEnvironment();
    const testCyclesList = fetchTestCycleList();
    return (
        <Suspense fallback={'...'}>
            <TestCaseForm
                testCyclePayload={testCyclesList}
                userStoriesList={userStories}
                resolvedUserList={clerkUsers}
                enviromentList={enviromentList}
            />
        </Suspense>
    )
}
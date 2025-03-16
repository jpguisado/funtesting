import { clerkUsers, fetchEnvironment } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";
import { fetchTestCaseByIdAndEnvironment } from "@/server/data-layer/test-case/test-case-data";
import { fetchUserStories } from "@/server/data-layer/user-story/user-story-data-layer";
import { fetchTestCycleList } from "@/server/data-layer/cycles/cycles-data";
import { Suspense } from "react";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ testId: string, envId: string }>
}) {
    const testCaseId = (await searchParams).testId;
    const environmentId = (await searchParams).envId;
    const userStories = fetchUserStories();
    const editedCase = fetchTestCaseByIdAndEnvironment(parseInt(testCaseId, 10), parseInt(environmentId, 10));
    const enviromentList = fetchEnvironment();
    const testCyclesList = fetchTestCycleList();
    return (
        <Suspense fallback={'...'}>
            <TestCaseForm
                testCyclePayload={testCyclesList}
                enviromentList={enviromentList}
                editedCase={editedCase}
                userStoriesList={userStories}
                resolvedUserList={clerkUsers}
            />
        </Suspense>
    )
}
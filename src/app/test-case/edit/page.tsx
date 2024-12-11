import { clerkUsers, fetchEnvironment, fetchUserStories } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";
import { fetchTestCaseByIdAndEnvironment } from "@/server/data-layer/test-case/test-case-data";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ testId: string, envId: string }>
}) {
    const testCaseId = (await searchParams).testId
    const environmentId = (await searchParams).envId

    const userStories = await fetchUserStories();
    const editedCase = await fetchTestCaseByIdAndEnvironment(parseInt(testCaseId, 10), parseInt(environmentId, 10));
    const enviromentList = await fetchEnvironment();
    return <TestCaseForm
        enviromentList={enviromentList}
        editedCase={editedCase}
        userStoriesList={userStories}
        userList={clerkUsers}
    />
}
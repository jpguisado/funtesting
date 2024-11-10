import { clerkUsers, fetchTestCaseById, fetchUserStories } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) {
    const id = (await searchParams).id

    const userStories = await fetchUserStories();
    const editedCase = await fetchTestCaseById(parseInt(id, 10));
    return <TestCaseForm
        editedCase={editedCase}
        userStoriesList={userStories}
        userList={clerkUsers}
    />
}
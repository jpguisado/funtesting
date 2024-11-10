import { clerkUsers, fetchTestCase, fetchUserStories } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) {
    const id = (await searchParams).id

    const userStories = await fetchUserStories();
    const editedCase = await fetchTestCase(parseInt(id, 10));

    return <TestCaseForm
        editedCase={editedCase}
        userStoriesList={userStories}
        userList={clerkUsers}
    />
}
import { fetchTestCase, fetchUsers, fetchUserStories } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) {
    const id = (await searchParams).id

    const users = await fetchUsers();
    const userStories = await fetchUserStories();
    const editedCase = await fetchTestCase(parseInt(id, 10));
    console.log(editedCase)

    return <TestCaseForm
        editedCase={editedCase}
        userStoriesList={userStories}
        userList={users}
    />
}
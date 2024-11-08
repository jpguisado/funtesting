import { fetchUsers, fetchUserStories } from "@/server/data-layer";
import TestCaseForm from "./test-case-form";

export default async function Page() {
    const users = await fetchUsers();
    const userStories = await fetchUserStories();

    return <TestCaseForm
        userStoriesList={userStories}
        userList={users}
    />
}
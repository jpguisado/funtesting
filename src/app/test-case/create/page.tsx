import { clerkUsers, fetchEnvironment, fetchUserStories } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";

export default async function Page() {
    const userStories = await fetchUserStories();
    const enviromentList = await fetchEnvironment();
    
    return <TestCaseForm
        userStoriesList={userStories}
        userList={clerkUsers}
        enviromentList = {enviromentList}
    />
}
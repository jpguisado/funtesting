import { fetchUserEpics, fetchUserHistories } from "@/server/data-layer";
import NewTestCaseForm from "./new-test-case-form";

export default async function Page() {

    const userHistories = await fetchUserHistories();
    const userEpics = await fetchUserEpics();

    return <NewTestCaseForm 
        userHistories={userHistories}
        userEpics={userEpics}
        />
}
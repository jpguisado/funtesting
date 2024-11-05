import { fetchUserHistories } from "@/server/data-layer";
import NewTestCaseForm from "./new-test-case-form";

export default async function Page() {

    const userHistories = await fetchUserHistories()

    return <NewTestCaseForm userHistories={userHistories}/>
}
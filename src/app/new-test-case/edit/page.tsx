import { fetchTestCase, fetchUserStories } from "@/server/data-layer"
import EditTestCaseForm from "./edit-test-case-form"
import { editTestCaseType } from "@/types/types"

export default async function Page({
    searchParams,
  }: {
    searchParams: Promise<{ id: string }>
  }) {
    const id = (await searchParams).id
    console.log(id)
    const testCase: editTestCaseType = await fetchTestCase(parseInt(id));
    const userStories = await fetchUserStories();
    
    return <EditTestCaseForm 
        editedCase={testCase}
        userStoriesList={userStories}
    />
}
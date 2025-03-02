import { clerkUsers, fetchEnvironment } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";
import { fetchTestCaseByIdAndEnvironment } from "@/server/data-layer/test-case/test-case-data";
import { fetchUserStories } from "@/server/data-layer/user-story/user-story-data-layer";
import { fetchTestCycleList } from "@/server/data-layer/cycles/cycles-data";
import Link from "next/link";
import { FilePlus2 } from "lucide-react";
import { CicleForm } from "../cicle-form";

export default async function Page(
    props: {
        searchParams?: Promise<{
            testId: string,
            envId: string
        }>;
}) {

    const searchParams = await props.searchParams;
    const testCaseId = searchParams?.testId ?? '';
    const environmentId = searchParams?.envId ?? '';

    const userStories = await fetchUserStories();
    const editedCase = await fetchTestCaseByIdAndEnvironment(parseInt(testCaseId, 10), parseInt(environmentId, 10));
    const enviromentList = await fetchEnvironment();
    const testCyclesList = await fetchTestCycleList();
    return (
        <>
            <div className="flex items-center justify-evenly mb-6">
                <div className="text-2xl font-bold w-full">Test del proyecto:</div>
                <nav className="flex gap-3 w-full justify-end">
                    <Link className="text-blue-500 hover:text-blue-400 flex items-center font-bold gap-1" href={'/test-case/create'}>Nueva Épica <FilePlus2 size={18} /></Link>
                    <Link className="text-blue-500 hover:text-blue-400 flex items-center font-bold gap-1" href={'/test-case/create'}>Nueva HU <FilePlus2 size={18} /></Link>
                    <Link className="text-blue-500 hover:text-blue-400 flex items-center font-bold gap-1" href={'/test-case/create'}>Nuevo Ciclo <FilePlus2 size={18} /></Link>
                                <CicleForm />
                </nav>
            </div>
            <TestCaseForm
                testCyclePayload={testCyclesList}
                enviromentList={enviromentList}
                editedCase={editedCase}
                userStoriesList={userStories}
                userList={clerkUsers}
            />
        </>
    )
}
import { clerkUsers, fetchEnvironment } from "@/server/data-layer";
import TestCaseForm from "../test-case-form";
import { fetchUserStories } from "@/server/data-layer/user-story/user-story-data-layer";
import { fetchTestCycleList } from "@/server/data-layer/cycles/cycles-data";
import { Suspense } from "react";
import { CicleForm } from "../cicle-form";
import { UserStoryDialogForm } from "../user-story-dialog-form";
import { UserEpicDialogForm } from "../epic-dialog-form";
import { EnvironmentDialogForm } from "../environment-dialog-form";

export default function Page() {
    const userStories = fetchUserStories();
    const enviromentList = fetchEnvironment();
    const testCyclesList = fetchTestCycleList();
    return (
        <Suspense fallback={'...'}>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold w-full">Test del proyecto:</div>
                <nav className="flex gap-3 w-full justify-end">
                    <EnvironmentDialogForm />
                    <UserEpicDialogForm />
                    <UserStoryDialogForm />
                    <CicleForm />
                </nav>
            </div>
            <TestCaseForm
                testCyclePayload={testCyclesList}
                userStoriesList={userStories}
                resolvedUserList={clerkUsers}
                enviromentList={enviromentList}
            />
        </Suspense>
    )
}
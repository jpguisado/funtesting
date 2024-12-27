'use client';

import { deleteTestCaseByIdInEnv } from "@/server/data-layer/test-case/test-case-actions";
import { Trash2Icon } from "lucide-react";

export default function DeleteTestCase({testCaseId, environmentId}: {testCaseId: number, environmentId: number}) {

    async function deleteTestCase(testCaseId: number, environmentId: number) {
        await deleteTestCaseByIdInEnv(testCaseId, environmentId);
    }

    return (
        <Trash2Icon onClick={() => deleteTestCase(testCaseId, environmentId)} size={18} />
    )
}
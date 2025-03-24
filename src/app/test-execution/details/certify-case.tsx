'use client';
import { Button } from "@/components/ui/button"
import { updateTestCaseStatus } from "@/server/actions"
import { CheckCheckIcon } from "lucide-react"

export default function CertifyCase({ testCaseId, environmentId, testStatus }: { testCaseId: number, environmentId: number, testStatus: string }) {
    const newStatus = testStatus === 'pass' ? 'failed' : 'pass';
    async function updateCaseStatus(testCaseId: number) {
        console.log(testStatus, newStatus)
        updateTestCaseStatus(testCaseId, environmentId, newStatus);
    }

    return (
        <Button variant={testStatus === 'pass' ? 'destructive' : 'default'} className="col-span-2" onClick={(() => { updateCaseStatus(testCaseId) })}><CheckCheckIcon />{newStatus}</Button>
    )
}
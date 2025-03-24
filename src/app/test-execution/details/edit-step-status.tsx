"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { updateStepStatusInEnvironment, updateTestCaseDate } from "@/server/actions"
import { CheckCheckIcon, CircleOffIcon } from "lucide-react"
import { useState } from "react"

export default function EditStepStatus({
    testCaseId,
    stepId,
    environmentId,
    stepStatus }: {
        testCaseId: string,
        stepId: number,
        environmentId: number,
        stepStatus: string
    }) {

    const [stepStatusState, setStepStatus] = useState(stepStatus)

    async function save(status: string, stepId: number) {
        setStepStatus(status);
        await updateStepStatusInEnvironment(status, stepId, environmentId);
        await updateTestCaseDate(parseInt(testCaseId));
    }

    return (
        <div className="flex flex-col gap-3">
            <Badge variant={`${stepStatusState === 'pass' ? 'outline' : 'destructive'}`}>{stepStatusState}</Badge>
            <div className="flex gap-3">
                <Button disabled={stepStatusState === 'pass' ? true : false} onClick={() => {save('pass', stepId)}}><CheckCheckIcon /></Button>
                <Button disabled={stepStatusState === 'failed' ? true : false} onClick={() => save('failed', stepId)}variant="destructive" className=""><CircleOffIcon /></Button>
            </div>
        </div>
    )
}
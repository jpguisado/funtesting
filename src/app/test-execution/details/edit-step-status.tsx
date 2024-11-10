"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { updateStepStatus, updateTestCaseDate } from "@/server/actions"
import { CheckCheckIcon, CircleOffIcon } from "lucide-react"
import { useState } from "react"

export default function EditStepStatus({ testCaseId, stepId, stepStatus }: { testCaseId: string, stepId: number, stepStatus: string }) {

    const [stepStatusState, setStepStatus] = useState(stepStatus)

    async function save(status: string, id: number) {
        setStepStatus(status);
        await updateStepStatus(status, id);
        await updateTestCaseDate(parseInt(testCaseId));
    }

    return (
        <div className="flex flex-col gap-3">
            <Badge variant={`${stepStatusState === 'pass' ? 'outline' : 'destructive'}`}>{stepStatusState}</Badge>
            <div className="flex gap-3">
                <Button disabled={stepStatusState === 'pass' ? true : false} onClick={() => {save('pass', stepId)}}><CheckCheckIcon /></Button>
                <Button disabled={stepStatusState === 'failed' ? true : false} onClick={() => save('failed', stepId)}variant="destructive" className=""><CircleOffIcon /></Button>
            </div>
            {/* <div className="flex gap-3">
            <Button variant="outline" className=""><LockIcon /></Button>
            <Button variant="outline" className=""><UnlockIcon /></Button>
        </div> */}
        </div>
    )
}
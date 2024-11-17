'use client';
import { Button } from "@/components/ui/button"
import { updateTestCaseStatus } from "@/server/actions"
import { CheckCheckIcon } from "lucide-react"

export default function CertifyCase({ testCaseId, environmentId }: { testCaseId: number, environmentId: number }) {
    console.log('certify-case comp: ', environmentId)
    async function updateCaseStatus(testCaseId: number) {
        updateTestCaseStatus(testCaseId, environmentId, 'pass');
    }

    return (
        <Button className="col-span-2" onClick={(() => { updateCaseStatus(testCaseId) })}><CheckCheckIcon />Certificar Caso</Button>
    )
}
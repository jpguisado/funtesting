'use client';
import { Button } from "@/components/ui/button"
import { updateTestCaseStatus } from "@/server/actions"
import { CheckCheckIcon } from "lucide-react"

export default function CertifyCase({ testCaseId }: { testCaseId: number }) {

    async function updateCaseStatus(id: number) {
        updateTestCaseStatus(id, 'pass');
    }

    return (
        <Button className="col-span-2" onClick={(() => { updateCaseStatus(testCaseId) })}><CheckCheckIcon />Certificar Caso</Button>
    )
}
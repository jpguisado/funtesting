'use client';

// import { updateTestCaseOrder } from "@/server/actions";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ChangeCaseOrder({ order, testCount, testCaseId }: { order: number, testCount?: number, testCaseId: number }) {

    async function updateOrder(order: number, testCaseId: number) {
        // await updateTestCaseOrder(order, testCaseId)
        console.log(order, testCaseId)
    }

    if (order <= 1) {
        return <ChevronDown onClick={() => updateOrder(order + 1, testCaseId)} size={18} />
    } else if (order === testCount) {
        return <ChevronUp size={18} />
    } else {
        return (
            <>
                <ChevronUp onClick={() => updateOrder(order - 1, testCaseId)} size={18} />
                <ChevronDown size={18} />
            </>
        )
    }
}
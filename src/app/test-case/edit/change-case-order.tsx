'use client';
import { toast } from "@/hooks/use-toast";
import { updateTestCaseOrder } from "@/server/actions";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ChangeCaseOrder({ order, testCount, environmentId }: { order: number, testCount?: number, environmentId: number }) {

    async function updateOrder(from: number, to: number) {
        await updateTestCaseOrder(from, to, environmentId);
        toast({
            title: "You updated test case execution order:",
            description: (
                <span>From position {from} to position {to}</span>
            ),
        });
    }
    if (order <= 1) {
        return <ChevronDown onClick={() => updateOrder(order, order + 1)} size={18} />
    } else if (order >= testCount!) { //
        return <ChevronUp onClick={() => updateOrder(order, order - 1)} size={18} />
    } else {
        return (
            <>
                <ChevronUp onClick={() => updateOrder(order, order - 1)} size={18} />
                <ChevronDown onClick={() => updateOrder(order, order + 1)} size={18} />
            </>
        )
    }
}
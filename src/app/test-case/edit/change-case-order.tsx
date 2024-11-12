'use client';

import { toast } from "@/hooks/use-toast";
import { updateTestCaseOrder } from "@/server/actions";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ChangeCaseOrder({ order, testCount }: { order: number, testCount?: number }) {

    async function updateOrder(from: number, to: number) {
        await updateTestCaseOrder(from, to);
        toast({
            title: "You updated test case order:",
            description: (
                <span>From position {from} to position {to}</span>
            ),
        });
    }

    if (order <= 1) {
        return <ChevronDown onClick={() => updateOrder(order, order + 1)} size={18} />
    } else if (order === testCount) {
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
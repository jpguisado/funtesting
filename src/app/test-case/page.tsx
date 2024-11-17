import { fetchTestCases } from "@/server/data-layer";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Edit2Icon, FilePlus2 } from "lucide-react";
import ChangeCaseOrder from "./edit/change-case-order";
export const dynamic = 'force-dynamic'

export default async function Page() {
    const testCases = await fetchTestCases();
    const testCaseSize = testCases.length

    return (

        <>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">Test del proyecto:</div>
                <Link className="text-blue-500 font-bold flex items-center gap-1" href={'test-case/create'}>crear <FilePlus2 size={18} /></Link>
            </div>
            <Table>
                <TableCaption>A list of your tests.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Test Code</TableHead>
                        <TableHead>Execution order</TableHead>
                        <TableHead>Asignee</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Steps</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {testCases.map((test) => {
                        return (
                            <TableRow key={test.id}>
                                <TableCell className="font-medium">{test.id}</TableCell>
                                <TableCell className="font-medium">{test.executionOrder}</TableCell>
                                <TableCell className="font-medium">{test.executor?.name}</TableCell>
                                <TableCell>{test.titleCase}</TableCell>
                                <TableCell><Badge variant="outline">{test.stepList.length}</Badge></TableCell>
                                <TableCell className="text-right flex gap-1">
                                    <Link href={'/test-case/edit/?id=' + test.id.toString()}><Edit2Icon size={18} /></Link>
                                    <ChangeCaseOrder
                                        testCount={testCaseSize}
                                        order={test.executionOrder}>
                                    </ChangeCaseOrder>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}
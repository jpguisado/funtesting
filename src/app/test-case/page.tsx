import { fetchEnvironment, fetchTestCaseWithEnvirontmentByEnvId } from "@/server/data-layer";
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
import FilterByExecutionEnvironment from "../test-execution/filter-by-environment";
import ChangeCaseOrder from "./edit/change-case-order";

export const dynamic = 'force-dynamic'

export default async function Page(props: {
    searchParams?: Promise<{
        envId?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const envId = searchParams?.envId ?? '';
    const environments = await fetchEnvironment();
    const testCases = await fetchTestCaseWithEnvirontmentByEnvId(parseInt(envId));
    return (
        <>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">Test del proyecto:</div>
                <Link className="text-blue-500 font-bold flex items-center gap-1" href={'test-case/create'}>crear <FilePlus2 size={18} /></Link>
            </div>
            <FilterByExecutionEnvironment
                environments={environments}
            />
            <Table className="">
                <TableCaption>A list of your tests.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Test Code</TableHead>
                        <TableHead>Execution order</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Steps</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {testCases ? '' : <TableRow><TableCell className="text-center" colSpan={5}>Error al cargar el dato</TableCell></TableRow>}
                    {testCases?.map((test) => {
                        const {testCaseId, stepListLength, executionOrder, title, } = test
                        return (
                            <TableRow key={testCaseId}>
                                <TableCell className="font-medium">{testCaseId}</TableCell>
                                <TableCell className="font-medium">{executionOrder}</TableCell>
                                <TableCell>{title}</TableCell>
                                <TableCell><Badge variant="outline">{stepListLength}</Badge></TableCell>
                                <TableCell className="text-right flex gap-1">
                                    <Link href={'/test-case/edit/?testId=' + testCaseId.toString() + '&envId=' + envId.toString()}><Edit2Icon size={18} /></Link>
                                    <ChangeCaseOrder
                                        environmentId={parseInt(envId)}
                                        testCount={testCases.length}
                                        order={executionOrder}>
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
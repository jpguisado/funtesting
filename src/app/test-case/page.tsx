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
// import ChangeCaseOrder from "./edit/change-case-order";
import FilterByExecutionEnvironment from "../test-execution/filter-by-environment";
export const dynamic = 'force-dynamic'

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const environments = await fetchEnvironment();
    const testCases = await fetchTestCaseWithEnvirontmentByEnvId(parseInt(query));
    return (
        <>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">Test del proyecto:</div>
                <Link className="text-blue-500 font-bold flex items-center gap-1" href={'test-case/create'}>crear <FilePlus2 size={18} /></Link>
            </div>
            <FilterByExecutionEnvironment
                environments={environments}
            />
            <Table>
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
                    {testCases!.map((test) => {
                        return (
                            <TableRow key={test.testCaseId}>
                                <TableCell className="font-medium">{test.testCaseId}</TableCell>
                                <TableCell className="font-medium">{test.testCase.executionOrder}</TableCell>
                                <TableCell>{test.testCase.titleCase}</TableCell>
                                <TableCell><Badge variant="outline">{test.testCase.stepList.length}</Badge></TableCell>
                                <TableCell className="text-right flex gap-1">
                                    <Link href={'/test-case/edit/?id=' + test.testCaseId.toString() + '&env=' + query.toString() }><Edit2Icon size={18} /></Link>
                                    {/* <ChangeCaseOrder
                                        testCount={0}
                                        order={test.executionOrder}>
                                    </ChangeCaseOrder> */}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}
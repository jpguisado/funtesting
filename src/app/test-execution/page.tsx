import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { fetchEnvironment, fetchTestCaseWithEnvirontmentByEnvId } from "@/server/data-layer"
import { EyeIcon } from "lucide-react";
import Link from "next/link"
import FilterByExecutionEnvironment from "./filter-by-environment";
import CopyIntoEnvironment from "./copy-into-environment";
export const dynamic = 'force-dynamic'

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const testCaseWithEnv = await fetchTestCaseWithEnvirontmentByEnvId(parseInt(query));
    console.log(testCaseWithEnv)
    const environments = await fetchEnvironment();
    return (
        <div className="">
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">Lista de test disponibles:</div>
                <CopyIntoEnvironment
                    environments={environments}
                />
            </div>
            <FilterByExecutionEnvironment
                environments={environments}
            />
            <Table className="mt-3">
                <TableCaption>A list of your tests.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Test Code</TableHead>
                        <TableHead>Execution order</TableHead>
                        <TableHead>Asignee</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Executed steps</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!testCaseWithEnv ? <TableRow>
                        <TableCell colSpan={7} className="font-medium text-center text-slate-500">Selecciona un entorno</TableCell>
                    </TableRow> : testCaseWithEnv?.map((test) => {
                        return (
                            <TableRow key={test.testCaseId}>
                                <TableCell className="font-medium">{test.testCaseId}</TableCell>
                                <TableCell className="font-medium">{test.testCase.executionOrder}</TableCell>
                                <TableCell className="font-medium">{test.testCase.executor?.name}</TableCell>
                                <TableCell>{test.testCase.titleCase}</TableCell>
                                <TableCell><span className={`border-[2px] px-1 rounded-lg`}>{test.status}</span></TableCell>
                                {/* TODO: change step status */}
                                <TableCell>{test.testCase.stepList.filter((step) => step.stepStatus === 'pass').length + ' de ' + test.testCase.stepList.length}</TableCell>
                                <TableCell className="text-right flex gap-3">
                                    <Link href={'/test-execution/details/?id=' + test.testCaseId.toString() + '&env=' + test.environmentId.toString()}><EyeIcon /></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
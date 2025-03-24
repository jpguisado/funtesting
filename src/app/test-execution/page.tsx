import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { fetchEnvironment, fetchTestCaseWithFilters } from "@/server/data-layer";
import GenericFilter from "./generic-filter";
import { fetchUserStories } from "@/server/data-layer/user-story/user-story-data-layer";
import Link from "next/link";
import { fetchTestCycleList } from "@/server/data-layer/cycles/cycles-data";
import { EyeIcon } from "lucide-react";
import CopyIntoEnvironment from "./copy-into-environment";
type DynamicData = {
    id: number;
    title: string;
}
export default async function Page(props: {
    searchParams?: Promise<{
        cycleId?: string;
        environmentId?: string;
        userStoryId?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const env = searchParams?.environmentId ?? '';
    const us = searchParams?.userStoryId ?? '';
    const cycleId = searchParams?.cycleId ?? '';
    const environments = fetchEnvironment();
    const userStories = fetchUserStories();
    const testCyclesId = fetchTestCycleList();
    const testCaseWithEnv = await fetchTestCaseWithFilters(parseInt(env), parseInt(us), parseInt(cycleId));
    return (
        <div>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">Lista de test disponibles:</div>
                <div className="flex gap-3">
                    <div className="text-blue-500 font-bold">Copiar entre ciclos</div>
                    <CopyIntoEnvironment
                        environments={await environments}
                    />
                </div>
            </div>
            <div className="flex gap-3">
                {/* Filter by Cicle */}
                <GenericFilter<DynamicData>
                    label={"Ciclo de pruebas"}
                    promise={testCyclesId}
                    param="cycleId"
                />
                {/* Filter by env */}
                <GenericFilter<DynamicData>
                    label={"Entorno"}
                    promise={environments}
                    param="environmentId"
                />w
                {/* Filter by User Story */}
                <GenericFilter<DynamicData>
                    label={"Historia de usuario"}
                    promise={userStories}
                    param="userStoryId"
                />
            </div>
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
                            <TableRow key={test.testCase?.id}>
                                <TableCell className="font-medium">{test.testCase?.id}</TableCell>
                                <TableCell className="font-medium">{test.testCase?.executionOrder}</TableCell>
                                <TableCell className="font-medium">{test.executor?.name}</TableCell>
                                <TableCell>{test.testCase?.titleCase}</TableCell>
                                <TableCell><span className={`px-[5px] py-[2px] rounded-lg ${test.status === 'pass' ? 'bg-green-200' : 'bg-red-200'}`}>{test.status}</span></TableCell>
                                {/* TODO: change step status */}
                                <TableCell>{test.testCase?.stepList.filter((step) => step.stepStatusByEnv?.filter((status) => status.status === 'pass').length !== 0).length + ' de ' + test.testCase?.stepList.length}</TableCell>
                                <TableCell className="text-right flex gap-3">
                                    <Link href={'/test-execution/details/?id=' + test.testCase?.id?.toString() + '&cycleId=' + parseInt(cycleId) + '&env=' + parseInt(env).toString()}><EyeIcon /></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
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
import { fetchUserStoriesByEnvironment } from "@/server/data-layer/user-story/user-story-data-layer";
import { CicleForm } from "./cicle-form";
import CopyIntoEnvironment from "../test-execution/copy-into-environment";
import FilterByExecutionEnvironment from "../test-execution/filter-by-environment";
import Link from "next/link";
type DynamicData = {
    id: number;
    title: string;
}
export default async function IdeasPage(props: {
    searchParams?: Promise<{
        environmentId?: string;
        userStoryId?: string;
        cicleId?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const env = searchParams?.environmentId ?? '';
    const us = searchParams?.userStoryId ?? '';
    const environments = await fetchEnvironment();
    const userStories = (await fetchUserStoriesByEnvironment(parseInt(env)));
    const nonUndefinedStories = userStories.map((val) => {
        return {
            id: val.id!,
            title: val.title
        }
    });
    const testCaseWithEnv = await fetchTestCaseWithFilters(parseInt(env), parseInt(us));
    return (
        <div>
            <div className="flex gap-3">
                {/* Filter by Cicle */}
                <GenericFilter<DynamicData>
                    label={"Ciclo de pruebas"}
                    data={nonUndefinedStories}
                    param="cicleId"
                />
                {/* Filter by env */}
                <GenericFilter<DynamicData>
                    label={"Entorno"}
                    data={environments}
                    param="environmentId"
                />
                {/* Filter by User Story */}
                <GenericFilter<DynamicData>
                    label={"Historia de usuario"}
                    data={nonUndefinedStories}
                    param="userStoryId"
                />
            </div>
            <h1>Ideas</h1>
            <CicleForm />
            <div>
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
                    </TableRow> : testCaseWithEnv?.map((test: test) => {
                        return (
                            <TableRow key={test.testCaseId}>
                                <TableCell className="font-medium">{test.testCaseId}</TableCell>
                                <TableCell className="font-medium">{test.testCase.executionOrder}</TableCell>
                                <TableCell className="font-medium">{test.executor?.name}</TableCell>
                                <TableCell>{test.testCase.titleCase}</TableCell>
                                <TableCell><span className={`px-[5px] py-[2px] rounded-lg ${test.status === 'pass' ? 'bg-green-200' : 'bg-red-200'}`}>{test.status}</span></TableCell>
                                {/* TODO: change step status */}
                                <TableCell>{test.testCase.stepList.filter((step) => step.stepStatusByEnv.filter((status) => status.status === 'pass').length !== 0).length + ' de ' + test.testCase.stepList.length}</TableCell>
                                <TableCell className="text-right flex gap-3">
                                    <Link href={'/test-execution/details/?id=' + test.testCaseId.toString() + '&env=' + test.environmentId.toString()}><EyeIcon /></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
            {testCaseWithEnv?.map((test) => {
                return (
                    test.testCase.titleCase
                )
            })
            }
        </div>
    );
}
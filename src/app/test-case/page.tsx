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
import ChangeCaseOrder from "./edit/change-case-order";
import DeleteTestCase from "./delete-case";
import GenericFilter from "../test-execution/generic-filter";
import { CicleForm } from "./cicle-form";
import { fetchTestCycleList } from "@/server/data-layer/cycles/cycles-data";
import { UserStoryDialogForm } from "./user-story-dialog-form";

export default async function Page(props: {
    searchParams?: Promise<{
        envId?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const envId = searchParams?.envId ?? '';
    const environments = fetchEnvironment();
    const testCyclesList = fetchTestCycleList()
    const testCases = await fetchTestCaseWithEnvirontmentByEnvId(parseInt(envId));
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Test del proyecto:</div>
                <nav className="flex gap-3 w-full justify-end">
                    <Link className="text-blue-500 font-bold flex items-center gap-1" href={'test-case/create'}>crear <FilePlus2 size={18} /></Link>
                    <Link className="text-blue-500 hover:text-blue-400 flex items-center font-bold gap-1" href={'/test-case/create'}>Nueva Épica <FilePlus2 size={18} /></Link>
                    <Link className="text-blue-500 hover:text-blue-400 flex items-center font-bold gap-1" href={'/test-case/create'}>Nueva HU <FilePlus2 size={18} /></Link>
                </nav>
            </div>
            <GenericFilter
                promise={environments}
                label="Entornos"
                param="envId"
            />
            <Table className="">
                <TableCaption>Lista de Test</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Orden</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Pasos</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {testCases ? '' : <TableRow><TableCell className="text-center" colSpan={5}>Error al cargar el dato</TableCell></TableRow>}
                    {testCases?.map((test) => {
                        const { testCaseId, stepListLength, executionOrder, title, } = test
                        return (
                            <TableRow key={testCaseId}>
                                <TableCell className="font-medium">{testCaseId}</TableCell>
                                <TableCell className="font-medium">{executionOrder}</TableCell>
                                <TableCell>{title}</TableCell>
                                <TableCell><Badge variant="outline">{stepListLength}</Badge></TableCell>
                                <TableCell className="text-right flex gap-1">
                                    <Link href={'/test-case/edit/?testId=' + testCaseId.toString() + '&envId=' + envId.toString()}><Edit2Icon size={18} /></Link>
                                    <DeleteTestCase
                                        testCaseId={testCaseId}
                                        environmentId={parseInt(envId)}
                                    />
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
        </div>
    )
}
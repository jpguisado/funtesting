import { fetchEnvironment, fetchTestCasesByEnvironment } from "@/server/data-layer";
import SelectFromClient from "./select-from-client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import GenericFilter from "../test-execution/generic-filter";
export const dynamic = 'force-dynamic'

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const environments = fetchEnvironment();
    const testCases = await fetchTestCasesByEnvironment(parseInt(query));
    return (
        <div>
            <>
                <div className="flex items-center justify-between mb-12">
                    <div className="text-2xl font-bold">Test del proyecto:</div>
                    <SelectFromClient testCasesList={testCases} />
                </div>
                <GenericFilter
                    promise={environments}
                    label="Entornos"
                    param="envId"
                />
                <Table className="">
                    <TableCaption>A list of your tests.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Test Code</TableHead>
                            <TableHead>Execution order</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testCases ? '' : <TableRow><TableCell className="text-center" colSpan={5}>Error al cargar el dato</TableCell></TableRow>}
                        {testCases?.map((test) => {
                            const { id, executionOrder, titleCase } = test
                            return (
                                <TableRow key={id}>
                                    <TableCell className="font-medium">{id}</TableCell>
                                    <TableCell className="font-medium">{executionOrder}</TableCell>
                                    <TableCell>{titleCase}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </>
        </div>
    )
}


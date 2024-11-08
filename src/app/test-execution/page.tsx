import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { fetchTestCases } from "@/server/data-layer"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function Page() {
    const testCases = await fetchTestCases();
    console.log(testCases)
    return (
        <>
            <div className="text-2xl">Resumen de test:</div>
            <Table>
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
                    {testCases.map((test) => {
                        return (
                            <TableRow key={test.id}>
                                <TableCell className="font-medium">{test.id}</TableCell>
                                <TableCell className="font-medium">{test.executionOrder}</TableCell>
                                <TableCell className="font-medium">{test.executor?.name}</TableCell>
                                <TableCell>{test.titleCase}</TableCell>
                                <TableCell><Badge variant="outline">{test.status}</Badge></TableCell>
                                <TableCell><Badge variant="outline">{test.id}</Badge></TableCell>
                                <TableCell className="text-right"><Link href={'/test-execution/details/?id='+test.id.toString()}>Detalles</Link></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </>
    )
}
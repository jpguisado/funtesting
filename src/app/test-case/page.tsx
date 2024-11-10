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
import { FilePlus2 } from "lucide-react";
export const dynamic = 'force-dynamic'

export default async function Page() {
    const testCases = await fetchTestCases();

    return (

        <>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">Resumen de test:</div>
                <Link className="text-blue-500 font-bold flex items-center gap-1" href={'test-case/create'}>crear <FilePlus2 size={18}/></Link>
            </div>
            <Table>
                <TableCaption>A list of your tests.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Test Code</TableHead>
                        <TableHead>Execution order</TableHead>
                        <TableHead>Asignee</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
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
                                <TableCell><Badge variant="outline">{test.status}</Badge></TableCell>
                                <TableCell><Badge variant="outline">{test.stepList.length}</Badge></TableCell>
                                <TableCell className="text-right"><Link href={'/test-case/edit/?id=' + test.id.toString()}>Detalles</Link></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}
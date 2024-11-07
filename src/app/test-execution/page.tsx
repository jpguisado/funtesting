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
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {testCases.map((test) => {
                        return (
                            <TableRow key={test.id}>
                                <TableCell className="font-medium">{test.id}</TableCell>
                                <TableCell><Badge variant="default" className="bg-green-300 text-black">Done</Badge></TableCell>
                                <TableCell>{test.titleCase}</TableCell>
                                <TableCell className="text-right"><Link href={'/test-execution/'+test.id.toString()}>Detalles</Link></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </>
    )
}
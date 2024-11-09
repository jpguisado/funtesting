import { fetchUserEpics } from "@/server/data-layer";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { FilePlus2 } from "lucide-react";
export const dynamic = 'force-dynamic'

export default async function Page() {
    const userEpics = await fetchUserEpics();

    return (
        <>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">Resumen de User Epics:</div>
                <Link className="text-blue-500 font-bold flex items-center gap-1" href={'user-story/create'}>crear <FilePlus2 size={18} /></Link>
            </div>
            <Table>
                <TableCaption>A list of your User Epics.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userEpics.map((epic) => {
                        return (
                            <TableRow key={epic.id}>
                                <TableCell>{epic.title}</TableCell>
                                <TableCell>{epic.description}</TableCell>
                                <TableCell className="text-right"><Link href={'/user-epic/edit/?id=' + epic.id.toString()}>Editar</Link></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}
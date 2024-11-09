import { fetchUserStories } from "@/server/data-layer";
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
    const userStories = await fetchUserStories();

    return (
        <>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">Resumen de historias de usuario:</div>
                <Link className="text-blue-500 font-bold flex items-center gap-1" href={'user-story/create'}>crear <FilePlus2 size={18} /></Link>
            </div>
            <Table>
                <TableCaption>A list of your User Stories.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userStories.map((HU) => {
                        return (
                            <TableRow key={HU.id}>
                                <TableCell>{HU.title}</TableCell>
                                <TableCell>{HU.description}</TableCell>
                                <TableCell className="text-right"><Link href={'/user-story/edit/?id=' + HU.id.toString()}>Editar</Link></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}
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
import { Edit2Icon, FilePlus2 } from "lucide-react";
import { fetchUserStories } from "@/server/data-layer/user-story/user-story-data-layer";
export const dynamic = 'force-dynamic'
    
export default async function Page() {
    const userStories = await fetchUserStories();
    return (
        <>
            <div className="flex items-center justify-between mb-12">
                <div className="text-2xl font-bold">A list of user functionalities:</div>
                <Link className="text-blue-500 font-bold flex items-center gap-1" href={'user-story/create'}>crear <FilePlus2 size={18} /></Link>
            </div>
            <Table>
                <TableCaption>A list of your User Stories.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[30%]">Epic</TableHead>
                        <TableHead>User story title</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userStories.map((HU) => {
                        return (
                            <TableRow key={HU.id}>
                                <TableCell>{HU.userEpic?.title}</TableCell>
                                <TableCell>{HU.title}</TableCell>
                                <TableCell className="text-right flex gap-1">
                                    <Link href={'/user-story/edit/?id=' + HU.id!.toString()}><Edit2Icon size={18} /></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}
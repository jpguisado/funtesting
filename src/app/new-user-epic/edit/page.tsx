import { fetchUserEpicById } from "@/server/data-layer"
import EditUserEpicForm from "./edit-user-epic"

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) {
    const id = (await searchParams).id
    const userEpic = await fetchUserEpicById(parseInt(id, 10))
    return (
        <EditUserEpicForm
            userEpic={userEpic}
        />
    )
}
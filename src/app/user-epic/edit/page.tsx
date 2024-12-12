import { fetchUserEpicById } from "@/server/data-layer"
import UserEpicForm from "../user-epic-form"

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) {
    const id = (await searchParams).id;
    const userEpic = await fetchUserEpicById(parseInt(id, 10));
    return (
        <UserEpicForm
            userEpic={userEpic!}
        />
    )
}
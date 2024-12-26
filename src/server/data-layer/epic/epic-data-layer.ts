import { db } from "@/server/db"

export async function fetchUserEpics() {
    return await db.userEpic.findMany({
        select: {
            id: true,
            title: true,
            description: true
        }
    })
}

export async function fetchUserEpicById(id: number) {
    return await db.userEpic.findFirst({
        where: {
            id: id
        }
    })
}
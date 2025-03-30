import { environmentSchema } from "@/schemas/schemas"
import { db } from "@/server/db"

export async function fetchEnvironmentList() {
    return await db.environment.findMany({
        select: {
            id: true,
            title: true,
            URL: true,
        }
    })
}

export async function fetchEnvironmentById(envId: number) {
    return await db.environment.findFirst({
        select: {
            id: true,
            title: true,
            URL: true,
        },
        where: {
            id: envId
        }
    }).then((env) => {
        return environmentSchema.safeParse(env).data!
    })
}
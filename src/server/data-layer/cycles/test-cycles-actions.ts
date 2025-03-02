"use server";

import { db } from "@/server/db";
import { testCycleType } from "@/types/types";

export async function createTestCycle(data: testCycleType) {
    await db.cicle.create({
        data: data
    })
}

export async function updateTestCycle(data: testCycleType, id: number) {
    await db.cicle.update({
        where: {
            id: id
        },
        data: data
    })
}

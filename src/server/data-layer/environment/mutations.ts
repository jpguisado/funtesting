'use server';

import { db } from "@/server/db";
import { environmentType } from "@/types/types";

export async function createNewEnvironment(newEnvironment: environmentType) {
    await db.environment.create({
        data: {
            title: newEnvironment.title,
            URL: newEnvironment.URL,
            projectId: 1, // TODO
        }
    })
}
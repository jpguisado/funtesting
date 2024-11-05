import { db } from "../db";

export function fetchUserEpics() {
    return db.userEpic.findMany({
    })
}

export function fetchUserHistories() {
    return db.userHistory.findMany({
    })
}


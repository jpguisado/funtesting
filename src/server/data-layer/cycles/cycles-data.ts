"use server";
import { db } from "@/server/db";

export async function fetchTestCycleList() {
  return await db.cicle.findMany({});
}

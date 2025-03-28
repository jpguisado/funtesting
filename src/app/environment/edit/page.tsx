import { fetchEnvironmentById } from "@/server/data-layer";
import EnvironmentForm from "../environment-form";

export default async function Page({
    searchParams,
}:{
    searchParams: Promise<{envId: string}>
}) {
    const envId = (await searchParams).envId;
    const environment = fetchEnvironmentById(parseInt(envId));
    return (
        <EnvironmentForm
            environment={environment!}
        />
    )
}
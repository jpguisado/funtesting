import SelectFromClient from "./select-from-client";

export default async function Page() {
    return (
        <div>
            <p>Se generará un documento Word:</p>
            <SelectFromClient />
        </div>
    )
}


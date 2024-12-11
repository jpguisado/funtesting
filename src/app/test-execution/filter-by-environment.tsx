'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { environmentListType, environmentType } from "@/types/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterByExecutionEnvironment({ environments }: { environments: environmentListType }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <Select onValueChange={(value) => { handleSearch(value.toString()) }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona entorno" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Entornos:</SelectLabel>
                    {environments.map((env: environmentType) => {
                        return <SelectItem key={env.id} value={env.id}>{env.title}</SelectItem>
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
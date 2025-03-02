'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface BaseItem {
    id: string | number;
    title: string;
}
interface ClientComponentProps<T extends BaseItem> {
    data: T[];
    param: string;
    label: string;
}
export default function GenericFilter<T extends BaseItem>({ data, param, label }: ClientComponentProps<T>) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set(param, term);
        } else {
            params.delete(param);
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <Select onValueChange={(value) => { handleSearch(value.toString()) }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Entornos:</SelectLabel>
                    {data.map((element) => {
                        return <SelectItem key={element.id} value={element.id!.toString()}>{element.title}</SelectItem>
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Control } from "react-hook-form";
import { testCaseType } from "@/types/types";
export default function ComboboxField({
    control,
    fieldName,
    label,
    form,
    list,
    formSetValue,
    fieldDescription
}: {
    control: Control<testCaseType>
    fieldName: keyof testCaseType & string
    label: string
    form: unknown
    list: unknown
    formSetValue: string
    fieldDescription: string
}) {
    return (
        <FormField
            control={control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground",
                                    )}
                                >
                                    {field.value
                                        ? list!.find(
                                            (element) => element.id === field.value,
                                        )?.title
                                        : "Select a cicle from this list"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search ..." />
                                <CommandList>
                                    <CommandEmpty>Not found.</CommandEmpty>
                                    <CommandGroup>
                                        {list!.map((element) => (
                                            <CommandItem
                                                value={element.title}
                                                key={element.title}
                                                onSelect={() => {
                                                    form.setValue(
                                                        formSetValue,
                                                        element,
                                                    );
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        element.id === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0",
                                                    )}
                                                />
                                                {element.title}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                        {fieldDescription}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
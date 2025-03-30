"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { cicleSchema } from "@/schemas/schemas";
import { testCycleType } from "@/types/types";
import { z } from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { use } from "react";
import { copyCasesOnEnvironment } from "@/server/actions";

const CopyIntoTestCycleSchema = z.object({
    fromTestingCycle: cicleSchema,
    toTestingCycle: cicleSchema
})

type CopyIntoCycleType = z.infer<typeof CopyIntoTestCycleSchema>

export function CopyIntoTestCycleDialogForm({ currentTestCycle, testCyclesListPromise }: {
    currentTestCycle?: testCycleType,
    testCyclesListPromise: Promise<testCycleType[]>
}) {
    const testCyclesList = use(testCyclesListPromise);
    const form = useForm<CopyIntoCycleType>({
        resolver: zodResolver(CopyIntoTestCycleSchema),
        defaultValues: {
            fromTestingCycle: {
                title: currentTestCycle?.title ?? '',
            },
            toTestingCycle: {
                title: ''
            }
        },
    });
    const { control, handleSubmit, reset } = form;
    async function onSubmit(data: CopyIntoCycleType) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
        await copyCasesOnEnvironment(data.fromTestingCycle.id!, data.toTestingCycle.id!)
        reset()
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-blue-500 font-bold">Asociar pruebas a otro entorno</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Entorno de origen</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={control}
                                name="fromTestingCycle.id"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full">
                                        <FormLabel>Ciclo de pruebas de origen:</FormLabel>
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
                                                            ? testCyclesList!.find(
                                                                (cycle) => cycle.id === field.value,
                                                            )?.title
                                                            : "Select user story from this list"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search environment..." />
                                                    <CommandList>
                                                        <CommandEmpty>No ENV found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {testCyclesList!.map((testCycle) => (
                                                                <CommandItem
                                                                    value={testCycle.title}
                                                                    key={testCycle.title}
                                                                    onSelect={() => {
                                                                        form.setValue("fromTestingCycle", testCycle);
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            testCycle.id! === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0",
                                                                        )}
                                                                    />
                                                                    {testCycle.title}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Entorno desde el que se van a copiar las pruebas
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="toTestingCycle.id"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full">
                                        <FormLabel>Entorno de destino:</FormLabel>
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
                                                            ? testCyclesList!.find(
                                                                (ENV) => ENV.id === field.value,
                                                            )?.title
                                                            : "Selecciona entorno de destino"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Busca entre entornos..." />
                                                    <CommandList>
                                                        <CommandEmpty>No se encuentra entorno.</CommandEmpty>
                                                        <CommandGroup>
                                                            {testCyclesList!.map((ENV) => (
                                                                <CommandItem
                                                                    value={ENV.title}
                                                                    key={ENV.title}
                                                                    onSelect={() => {
                                                                        form.setValue("toTestingCycle", ENV);
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            ENV.id! === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0",
                                                                        )}
                                                                    />
                                                                    {ENV.title}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Entorno donde se van a copiar las pruebas
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Guardar cambios</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

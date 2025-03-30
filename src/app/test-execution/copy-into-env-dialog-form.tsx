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
import { environmentSchema } from "@/schemas/schemas";
import { environmentListType, environmentType } from "@/types/types";
import { z } from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { use } from "react";
import { copyCasesOnEnvironment } from "@/server/actions";

const CopyIntoEnvSchema = z.object({
    fromEnvironment: environmentSchema,
    toEnvironment: environmentSchema
})

type CopyIntoEnvType = z.infer<typeof CopyIntoEnvSchema>

export function CopyIntoEnvironmentDialogForm({ currentEnvironment, environmentListPromise }: {
    currentEnvironment?: environmentType,
    environmentListPromise: Promise<environmentListType>
}) {
    const environmentList = use(environmentListPromise);
    const form = useForm<CopyIntoEnvType>({
        resolver: zodResolver(CopyIntoEnvSchema),
        defaultValues: {
            fromEnvironment: {
                title: currentEnvironment?.title ?? '',
            },
            toEnvironment: {
                title: ''
            }
        },
    });
    const { control, handleSubmit, reset } = form;
    async function onSubmit(data: CopyIntoEnvType) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
        await copyCasesOnEnvironment(data.fromEnvironment.id!, data.toEnvironment.id!)
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
                                name="fromEnvironment.id"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full">
                                        <FormLabel>Entorno de origen:</FormLabel>
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
                                                            ? environmentList!.find(
                                                                (ENV) => ENV.id === field.value,
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
                                                            {environmentList!.map((ENV) => (
                                                                <CommandItem
                                                                    value={ENV.title}
                                                                    key={ENV.title}
                                                                    onSelect={() => {
                                                                        form.setValue("fromEnvironment", ENV);
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
                                            Entorno desde el que se van a copiar las pruebas
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="toEnvironment.id"
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
                                                            ? environmentList!.find(
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
                                                            {environmentList!.map((ENV) => (
                                                                <CommandItem
                                                                    value={ENV.title}
                                                                    key={ENV.title}
                                                                    onSelect={() => {
                                                                        form.setValue("toEnvironment", ENV);
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

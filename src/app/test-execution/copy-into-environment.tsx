'use client'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Check, ChevronsUpDown, FilePlus2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { environmentListType, environmentType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { environmentSchema } from "@/schemas/schemas"
import { cn } from "@/lib/utils"
import { copyCasesOnEnvironment } from "@/server/actions"

const FormSchema = z.object({
    fromEnvironment: environmentSchema,
    toEnvironment: environmentSchema,
})

export default function CopyIntoEnvironment({ environments }: { environments: environmentListType }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fromEnvironment: {},
            toEnvironment: {}
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
        await copyCasesOnEnvironment(data.fromEnvironment.id!, data.toEnvironment.id!)
    }

    return (
        <Dialog>
            <DialogTrigger className="text-blue-500 font-bold flex items-center gap-1"><FilePlus2 size={18} />Copiar test entre entornos</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Copiar entre entornos</DialogTitle>
                    <DialogDescription>Selecciona el entorno desde el que quieres copiar los test y el entorno en el que quieres copiar los test.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="fromEnvironment"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Copiar desde:</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? environments.find(
                                                            (env: environmentType) => env.title === field.value.title
                                                        )?.title
                                                        : "Select language"}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search framework..."
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No framework found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {environments.map((env: environmentType) => (
                                                            <CommandItem
                                                                value={env}
                                                                key={env.id}
                                                                onSelect={() => {
                                                                    form.setValue("fromEnvironment", env)
                                                                }}
                                                            >
                                                                {env.title}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        env.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Este es el entorno desde el que vas a copiar la suite de casos
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="toEnvironment"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Copiar a:</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? environments.find(
                                                            (env: environmentType) => env.title === field.value.title
                                                        )?.title
                                                        : "Select language"}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search framework..."
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No framework found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {environments.map((env: environmentType) => (
                                                            <CommandItem
                                                                value={env}
                                                                key={env.id}
                                                                onSelect={() => {
                                                                    form.setValue("toEnvironment", env)
                                                                }}
                                                            >
                                                                {env.title}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        env.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Este es el entorno al que vas a copiar la suite de casos
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


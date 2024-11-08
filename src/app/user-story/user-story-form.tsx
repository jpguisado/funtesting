"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { userEpicListType, userEpicType, userStoryType } from "@/types/types"
import { userStorySchema } from "@/schemas/schemas"
import { createUserStory, updateUserStory } from "@/server/actions"

export default function UserStoryForm({userEpicsList, editedUserStory} : {userEpicsList : userEpicListType, editedUserStory: userStoryType}) {
    const form = useForm<userStoryType>({
        resolver: zodResolver(userStorySchema),
        defaultValues: editedUserStory || {
            title: "",
            description: "",
            userEpic: {
                title: "",
                description: "",
                id: "",
            },
        }
    })

    async function onSubmit(data: userStoryType) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
        if (editedUserStory) {
            await updateUserStory(data, editedUserStory.id);
        } else {
            await createUserStory(data)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="userEpic"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Épica de usuario</FormLabel>
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
                                            {field.value?.title ? field.value.title : 'Select user epic'}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search epic user..." />
                                        <CommandList>
                                            <CommandEmpty>No user epic found.</CommandEmpty>
                                            <CommandGroup>
                                                {userEpicsList.map((userEpic: userEpicType) => (
                                                    <CommandItem
                                                        value={userEpic.title}
                                                        key={userEpic.title}
                                                        onSelect={() => {
                                                            form.setValue("userEpic", userEpic)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                userEpic.title === field.value?.title
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {userEpic.title}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This is the language that will be used in the dashboard.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título de la historia de usuario</FormLabel>
                            <FormControl>
                                <Input placeholder="Indica el título de la historia de usuario" {...field} />
                            </FormControl>
                            <FormDescription>
                                Nombre descriptivo de la historia de usuario
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Indica una descripción bonita de la historia de usuario"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Descripción de la historia de usuario
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Guardar</Button>
            </form>
        </Form>
    )
}

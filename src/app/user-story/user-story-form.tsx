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
import type { userEpicListType, userStoryType } from "@/types/types"
import { userEpicListSchema, userStorySchema } from "@/schemas/schemas"
import { createUserStory, updateUserStory } from "@/server/data-layer/user-story/user-story-actions"
import SubmitButton from "@/components/ui/submit-button"

export default function UserStoryForm({ userEpicsList, editedUserStory: payload }: { userEpicsList: userEpicListType, editedUserStory?: userStoryType }) {
    const { data: fetchedUserStory } = userStorySchema.omit({ casesOfThisStory: true }).safeParse(payload);
    const { data: fetchedUserEpicList } = userEpicListSchema.safeParse(userEpicsList);
    const form = useForm<userStoryType>({
        resolver: zodResolver(userStorySchema.omit({ casesOfThisStory: true })),
        defaultValues: fetchedUserStory ?? {
            title: '',
            description: '',
        },
    });
    const { control, handleSubmit, reset, formState } = form;
    async function onSubmit(data: userStoryType) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
        if (fetchedUserStory) {
            await updateUserStory(data, fetchedUserStory.id!);
        } else {
            await createUserStory(data);
            reset();
        }
    }
    const { isSubmitting } = formState;
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={control}
                    name="userEpic"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>User epic</FormLabel>
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
                                                ? fetchedUserEpicList!.find(
                                                    (epic) => epic.id === field.value?.id
                                                )?.title
                                                : "Select user epic from this list"}
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
                                                {fetchedUserEpicList!.map((userEpic) => (
                                                    <CommandItem
                                                        value={userEpic.title?.toString()}
                                                        key={userEpic.id}
                                                        onSelect={() => {
                                                            form.setValue("userEpic", userEpic)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                userEpic.id === field.value?.id
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
                                Related user epic
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User story title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title of the User Story" {...field} />
                            </FormControl>
                            <FormDescription>
                                Full title of the user story
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Provide a aproximate description of the user story"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                User story description
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton isSubmitting={isSubmitting} />
            </form>
        </Form>
    )
}

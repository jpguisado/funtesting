'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form"
import SubmitButton from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link";

export const requirementsFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
});

export type requirementsType = z.infer<typeof requirementsFormSchema>;

export default function RequirementsForm({ requirementsForm: payload }: { requirementsForm?: unknown }) {

    const { data: fetchedUserEpic } = requirementsFormSchema.safeParse(payload);
    const form = useForm<requirementsType>({
        resolver: zodResolver(requirementsFormSchema),
        defaultValues: fetchedUserEpic ?? {
            title: "",
            description: "",
        }
    });
    const { control, handleSubmit, reset, formState } = form;
    async function onSubmit(data: requirementsType) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
        if (fetchedUserEpic) {
            // await updateUserEpic(data, fetchedUserEpic.id!);
        } else {
            // await createUserEpic(data);
            reset();
        }
    };
    const { isSubmitting } = formState;
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Context</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write the context where the functionality is going to be used.
                                    For example: this validation will be triggered when the Entity tries to introduce a new worker."
                                    className="resize-y"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                We will provide a context where the functionality is going to be used.
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
                            <FormLabel>Requisite title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title that we are going to give" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the tittle that we are going to give to the requisite.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Requisite status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="backlog">Backlog</SelectItem>
                                    <SelectItem value="sprint">Sprint</SelectItem>
                                    <SelectItem value="developing">Developing</SelectItem>
                                    <SelectItem value="testing">Testing</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage email addresses in your{" "}
                                <Link href="/examples/forms">email settings</Link>.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton isSubmitting={isSubmitting}></SubmitButton>
            </form>
        </Form>
    )
}
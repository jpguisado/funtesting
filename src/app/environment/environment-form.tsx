"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { environmentSchema } from "@/schemas/schemas"
import { environmentType } from "@/types/types"
import SubmitButton from "@/components/ui/submit-button"
import { use } from "react"

export default function EnvironmentForm({ environment: payload }: { environment?: Promise<environmentType> }) {

    const envPromise = payload ? use(payload) : '';
    const { data: fetchedEnvironment } = environmentSchema.safeParse(envPromise);
    const form = useForm<environmentType>({
        resolver: zodResolver(environmentSchema),
        defaultValues: fetchedEnvironment ?? {
            title: "",
            URL: "",
        }
    });
    const { control, handleSubmit, reset, formState } = form;
    async function onSubmit(data: environmentType) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
        if (fetchedEnvironment) {
            // await updateUserEpic(data, fetchedEnvironment.id!);
        } else {
            // await createUserEpic(data);
            reset();
        }
    };
    const { isSubmitting } = formState;
    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del entorno</FormLabel>
                            <FormControl>
                                <Input placeholder="Indica el nombre del entorno" {...field} />
                            </FormControl>
                            <FormDescription>
                                Nombre del entorno
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="URL"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección URL</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Indica la URL desde la que se accede al entorno "
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                URL del entorno
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton isSubmitting={isSubmitting} />
            </form>
        </Form>
    );
};
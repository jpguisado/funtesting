"use client"

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
import { userEpicSchema } from "@/schemas/schemas"
import { userEpicType } from "@/types/types"
import { createUserEpic } from "@/server/actions"

export default function NewUserEpicForm() {
    const form = useForm<userEpicType>({
        resolver: zodResolver(userEpicSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    })

    const { control, handleSubmit, reset, trigger, setError } = form;

    async function onSubmit(data: userEpicType) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })

        await createUserEpic(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 space-y-6">
                <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título de la épica de usuario</FormLabel>
                            <FormControl>
                                <Input placeholder="Indica el título de la épica de usuario" {...field} />
                            </FormControl>
                            <FormDescription>
                                Nombre descriptivo de la épica de usuario
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
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Indica una descripción bonita de la épica de usuario"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Descripción de la épica de usuario
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

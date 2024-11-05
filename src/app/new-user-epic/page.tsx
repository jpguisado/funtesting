"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { PlusCircleIcon, Trash2Icon } from "lucide-react"
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

const FormSchema = z.object({
    userEpicTitle: z.string().min(2, {
        message: "User Epic must be at least 2 characters.",
    }),
    caseDescription: z.string().min(2, {
        message: "User History must be at least 2 characters.",
    }).optional(),
})

export default function Page() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userEpicTitle: "",
            caseDescription: "",
        }
    })

    const { control, handleSubmit, reset, trigger, setError } = form;

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 space-y-6">
                <FormField
                    control={control}
                    name="userEpicTitle"
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
                    name="caseDescription"
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

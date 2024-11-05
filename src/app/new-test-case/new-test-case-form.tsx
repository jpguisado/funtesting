"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Check, ChevronsUpDown, PlusCircleIcon, Trash2Icon } from "lucide-react"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Textarea } from "@/components/ui/textarea"

export const userHistorySchema = z.object({
  title: z.string().min(2, {
    message: "User Epic must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "User History must be at least 2 characters.",
  }).optional(),
}).array()

export type userHistoryType = z.infer<typeof userHistorySchema>

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const FieldValidationSchema = z.object({
  fieldLabel: z.string().min(1, {
    message: "You need at least 1 character.",
  }).optional(),
  fieldValidation: z.string().min(1, {
    message: "You need at least 1 character.",
  }).array().optional(),
})

const StepSchema = z.object({
  stepDescription: z.string().min(2, {
    message: "You need at least 2 characters.",
  }),
  expectedResult: z.string().min(2, {
    message: "You need at least 2 characters.",
  }),
  field: FieldValidationSchema.array().optional(),
  isBlocker: z.string().optional()
  // TODO: relatedWithStepId
})

const FormSchema = z.object({
  userEpic: z.string().min(2, {
    message: "User Epic must be at least 2 characters.",
  }),
  userHistory: z.string().min(2, {
    message: "User History must be at least 2 characters.",
  }),
  titleCase: z.string().min(1, {
    message: "At least one title."
  }),
  preconditions: z.string().min(1, {
    message: "At least one precondition."
  }),
  stepList: StepSchema.array()
})

export default function NewTestCaseForm({ userHistories }: { userHistories: userHistoryType }) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userEpic: "",
      titleCase: "",
      userHistory: "",
      preconditions: "",
      stepList: [{
        expectedResult: '',
        stepDescription: '',
      }],
    },
  })

  const { control, handleSubmit, reset, trigger, setError } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stepList"
  });

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
                      {field.value
                        ? languages.find(
                          (language) => language.value === field.value
                        )?.label
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("userEpic", language.value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
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
          control={control}
          name="userHistory"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Historia de usuario</FormLabel>
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
                        ? userHistories.find(
                          (HU) => HU.title === field.value
                        )?.title
                        : "Select HU"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No HU found.</CommandEmpty>
                      <CommandGroup>
                        {userHistories.map((HU) => (
                          <CommandItem
                            value={HU.title}
                            key={HU.title}
                            onSelect={() => {
                              form.setValue("userHistory", HU.title)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                HU.title === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {HU.title}
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
          control={control}
          name="titleCase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del caso</FormLabel>
              <FormControl>
                <Input placeholder="Indica el título del caso" {...field} />
              </FormControl>
              <FormDescription>
                Nombre descriptivo del caso
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="preconditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precondiciones</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((item, index) => (
          <div className="flex items-center gap-3" key={item.id}>
            <FormField
              control={control}
              name={`stepList.${index}.stepDescription`}
              render={({ field }) => (
                <div className="flex gap-3 w-full">
                  <FormItem className="w-full">
                    <FormLabel>Paso {index}</FormLabel>
                    <FormControl className="">
                      <div className="flex gap-1">
                        <Textarea
                          placeholder="Añade una descripción del paso"
                          className="resize-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Describe el paso aplicable
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                  <FormItem className="w-full">
                    <FormLabel>Resultado esperado paso {index}</FormLabel>
                    <FormControl className="">
                      <div className="flex gap-1">
                        <Textarea
                          placeholder="Añade una descripción del resultado de este paso"
                          className="resize-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Describe el resultado del paso aplicable
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <Button type="button" variant={"default"} onClick={() => append({ stepDescription: "", expectedResult: "" })}><PlusCircleIcon className="" /></Button>
            <Button type="button" variant={"destructive"} onClick={() => remove(index)}><Trash2Icon /></Button>
          </div>
        ))}
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  )
}

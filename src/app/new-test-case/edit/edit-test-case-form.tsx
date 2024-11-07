"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
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
import { editTestCaseType, userStoryListType, userStoryType } from "@/types/types"
import { EditTestCaseSchema } from "@/schemas/schemas"
import { updateTestCase } from "@/server/actions"

export default function EditTestCaseForm(
  { editedCase, userStoriesList }: { editedCase: editTestCaseType, userStoriesList: userStoryListType }
) {

  const form = useForm<editTestCaseType>({
    resolver: zodResolver(EditTestCaseSchema),
    defaultValues: editedCase,
  })

  console.log(editedCase)

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stepList",
  });

  async function onSubmit(data: editTestCaseType) {
    console.log(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    await updateTestCase(data, editedCase.id)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="relatedStory"
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
                      {field.value.title ? field.value.title : 'Select HU'}
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
                        {userStoriesList.map((HU: userStoryType) => (
                          <CommandItem
                            value={HU.title}
                            key={HU.title}
                            onSelect={() => {
                              form.setValue("userStory", HU)
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
                </div>
              )}
            />
            <FormField
              control={control}
              name={`stepList.${index}.expectedResult`}
              render={({ field }) => (
                <div className="flex gap-3 w-full">
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
            <Button type="button" variant={"default"} onClick={() => append({ stepDescription: "", expectedResult: "", stepStatus: "not started", isBlocker: "", order: index+1 })}><PlusCircleIcon className="" /></Button>
            <Button type="button" variant={"destructive"} onClick={() => remove(index)}><Trash2Icon /></Button>
          </div>
        ))}
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  )
}

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Check, ChevronDown, ChevronsUpDown, ChevronUp, CopyCheckIcon, PlusCircleIcon, Trash2Icon } from "lucide-react"
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
import { userStoryListType, userStoryType, userListType, userType, testCaseType, environmentListType, environmentType } from "@/types/types"
import { testCaseSchema } from "@/schemas/schemas"
import { deleteStep, updateTestCase } from "@/server/actions"
import { createTestCaseWithSteps } from "@/server/data-layer/test-case"

export default function TestCaseForm(
  { editedCase, userStoriesList, userList, enviromentList }: { editedCase?: testCaseType, userList: userListType, userStoriesList: userStoryListType, enviromentList: environmentListType }
) {
  const form = useForm<testCaseType>({
    resolver: zodResolver(testCaseSchema),
    defaultValues: editedCase || {
      titleCase: '',
      environmentWhereIsExecuted: {
        title: '',
        URL: '',
        id: 0,
      },
      executor: {
        id: '',
        email: '',
        name: '',
      },
      relatedStory: {
        title: '',
        description: ''
      },
      preconditions: '',
      stepList: [{
        order: 0,
        expectedResult: '',
        stepDescription: '',
        isBlocker: 'no',
      }],
      executionOrder: 0,
      updatedAt: new Date(),
    },
  })
  const { control, handleSubmit, reset } = form;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "stepList",
    keyName: 'key'
  });

  async function onSubmit(data: testCaseType) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    if (editedCase) {
      await updateTestCase(data, editedCase.id);
    } else {
      await createTestCaseWithSteps(data);
      reset()
    }
  }

  console.log(control._formState)

  async function deleteStepFromDB(stepId: number) {
    if (stepId) await deleteStep(stepId)
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-3">
          <FormField
            control={control}
            name="relatedStory"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
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
                        {field.value?.title ? field.value.title : 'Select HU'}
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
                                form.setValue("relatedStory", HU)
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
            name="executor"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Responsable de la ejecución</FormLabel>
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
                        {field.value?.name ? field.value.name : 'Select responsible'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup>
                          {userList.map((user: userType) => (
                            <CommandItem
                              value={user.name}
                              key={user.name}
                              onSelect={() => {
                                form.setValue("executor", user)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  user === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {user.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the user who will be responsible for the test execution
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="environmentWhereIsExecuted"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Entorno de ejecución</FormLabel>
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
                        {field.value?.title ? field.value.title : 'Select environment'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup>
                          {enviromentList.map((env: environmentType) => (
                            <CommandItem
                              value={env.title}
                              key={env.title}
                              onSelect={() => {
                                form.setValue("environmentWhereIsExecuted", env)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  env === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {env.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the environment where test will be executed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                  placeholder="Tell us a little bit about preconditions"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                List all the elements needed to run this test
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((item, index) => (
          <div className="flex items-center gap-3" key={item.key}>
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
                          className="resize-y"
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
            <div className="grid col-span-2 gap-1">
              <div className="flex gap-1">
                <Button type="button" variant={"default"} onClick={() => append({ stepDescription: "", expectedResult: "", stepStatus: "not started", isBlocker: "", order: index + 1 })}><PlusCircleIcon className="" /></Button>
                <Button type="button" variant={"destructive"} onClick={() => {
                  if (editedCase?.stepList[index]?.id) {
                    // TODO: revalidate page when I create a new step. If not, I cannot delete step, cause Id doesn't exist
                    deleteStepFromDB(parseInt(editedCase.stepList[index].id))
                  };
                  remove(index)
                }
                }
                ><Trash2Icon /></Button>
                <Button type="button" variant={"outline"} onClick={() => { move(index, index - 1) }}><ChevronUp className="" /></Button>
                <Button type="button" variant={"outline"} onClick={() => { move(index, index + 1) }}><ChevronDown className="" /></Button>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant={"outline"} onClick={() => { console.log(index) }}><CopyCheckIcon className="" /></Button>
              </div>
            </div>
          </div>
        ))}
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  )
}

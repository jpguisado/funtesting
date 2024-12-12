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
import type { userStoryListType, userListType, testCaseType, environmentListType, stepType } from "@/types/types"
import { environmentListSchema, stepListSchema, testCaseSchema, userListSchema, userStoryListSchema } from "@/schemas/schemas"
import { deleteStep } from "@/server/actions"
import { createTestCaseWithSteps, updateTestCase } from "@/server/data-layer/test-case/test-case-actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TestCaseForm({
  editedCase: payload,
  userStoriesList: userStoriesListPayload,
  userList: userListPayload,
  enviromentList: enviromentListPayload
}: {
  editedCase?: testCaseType,
  userList: userListType,
  userStoriesList: userStoryListType,
  enviromentList: environmentListType
}) {
  const { data: fetchedTestCase, error } = testCaseSchema.safeParse(payload);
  const { data: fetchedUserStoriesList } = userStoryListSchema.safeParse(userStoriesListPayload);
  const { data: fetchedUsersList } = userListSchema.safeParse(userListPayload);
  const { data: fetchedEnviromentsList } = environmentListSchema.safeParse(enviromentListPayload);
  console.log(error)
  const form = useForm<testCaseType>({
    resolver: zodResolver(testCaseSchema),
    defaultValues: fetchedTestCase ?? {
      titleCase: '',
      preconditions: '',
      stepList: [{
        order: 0,
        expectedResult: '',
        stepDescription: '',
        isBlocker: '',
      }],
      relatedStory: {
        title: '',
      },
      environmentWhereIsExecuted: {
        environment: {
          title: '',
          URL: '',
        },
        executor: {
          name: '',
        },
        status: ''
      },
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
    if (fetchedTestCase) {
      await updateTestCase(data, fetchedTestCase.id!);
    } else {
      await createTestCaseWithSteps(data);
      reset()
    }
  }
  async function deleteStepFromDB(stepId: number) {
    if (stepId) {
      await deleteStep(stepId)
    };
  }

  /**
   * Change the order of a step in the form and the view
   * @param fromIndex origin position
   * @param toIndex destination position
   */
  function changeStepOrder(fromIndex: number, toIndex: number) {
    const stepList = stepListSchema.safeParse(form.getValues('stepList')).data!;
    if (toIndex >= 0 && toIndex < stepList.length) {
      stepList[fromIndex]!.order = toIndex;
      stepList[toIndex]!.order = fromIndex;
      stepList.sort((a:stepType, b:stepType) => a.order - b.order)
      move(fromIndex, toIndex);
      form.setValue('stepList', stepList);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-3">
          <FormField
            control={control}
            name="relatedStory.id"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>User story:</FormLabel>
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
                          ? fetchedUserStoriesList!.find(
                            (US) => US.id === field.value
                          )?.title
                          : "Select user story from this list"}
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
                          {fetchedUserStoriesList!.map((US) => (
                            <CommandItem
                              value={US.id?.toString()}
                              key={US.title}
                              onSelect={() => {
                                form.setValue("relatedStory", US)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  US.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {US.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  User story related to this case.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="environmentWhereIsExecuted.status"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Estado del test</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the initial status of the test" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pendiente">pendiente</SelectItem>
                    <SelectItem value="iniciado">iniciado</SelectItem>
                    <SelectItem value="bloqueado">bloqueado</SelectItem>
                    <SelectItem value="pass">finalizado</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can set the initial status of the test
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="environmentWhereIsExecuted.executor.id"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Asigned to:</FormLabel>
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
                          ? fetchedUsersList!.find(
                            (epic) => epic.id === field.value
                          )?.name
                          : "Select a user from this list"}
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
                          {fetchedUsersList!.map((user) => (
                            <CommandItem
                              value={user.id}
                              key={user.id}
                              onSelect={() => {
                                form.setValue("environmentWhereIsExecuted.executor", user)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  user.id === field.value
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
            name="environmentWhereIsExecuted.environment.id"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Environment where it&apos; ll be executed:</FormLabel>
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
                          ? fetchedEnviromentsList!.find(
                            (env) => env.id === field.value
                          )?.title
                          : "Select a environment from this list"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search for environment..." />
                      <CommandList>
                        <CommandEmpty>No environment found.</CommandEmpty>
                        <CommandGroup>
                          {fetchedEnviromentsList!.map((env) => (
                            <CommandItem
                              value={env.id?.toString()}
                              key={env.id}
                              onSelect={() => {
                                form.setValue("environmentWhereIsExecuted.environment", env)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  env.id === field.value
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
                  className="resize-y"
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
                          placeholder="Add a step description"
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
                          placeholder="Add a expected result description"
                          className="resize-y"
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
                <Button type="button" variant={"default"} onClick={() => append({
                  stepDescription: "",
                  expectedResult: "",
                  isBlocker: "",
                  order: index + 1
                })
                }>
                  <PlusCircleIcon className="" />
                </Button>
                <Button type="button" variant={"destructive"} onClick={() => {
                  if (fetchedTestCase?.stepList[index]?.id) {
                    void deleteStepFromDB(fetchedTestCase.stepList[index].id)
                  };
                  remove(index)
                }
                }
                ><Trash2Icon /></Button>
                <Button type="button" variant={"outline"} onClick={() => { changeStepOrder(index, index - 1) }}><ChevronUp className="" /></Button>
                <Button type="button" variant={"outline"} onClick={() => { changeStepOrder(index, index + 1) }}><ChevronDown className="" /></Button>
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

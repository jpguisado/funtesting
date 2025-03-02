export type ProjectType = {
    id?: number,
    title: string,
    description?: string;
    environments: Environment[];
}

export type User = {
    id?: string,
    name: string,
    email: string,
}

export type StepStatusByEnvironment = {
    environment?: Environment,
    status: string,
}

export type Step = {
    id?: number,
    stepDescription: string,
    expectedResult: string,
    isBlocker: string | null,
    order: number,
    stepStatusByEnv?: StepStatusByEnvironment
}

export type Environment = {
    id?: number,
    title: string,
    URL: string;
}

export type UserEpic = {
    id?: number,
    title: string,
    description?: string,
    userStoriesOfThisEpic?: UserStory[]
}

export type UserStory = {
    id?: number,
    title: string,
    description?: string,
}

export type TestCase = {
    id?: number,
    titleCase: string,
    description?: string,
    relatedStory?: UserStory
    preconditions: string,
    stepList: Step[],
    executionOrder?: number,
    updatedAt?: Date,
    environmentWhereIsExecuted?: TestCaseInEnvironment
}

export type Cicle = {
    id?: number,
    title: string,
    startDate: Date,
    endDate: Date,
    status: string,
}

export type TestCaseInEnvironment = {
    environment: Environment,
    status: string,
    executor: User,
    cicle: Cicle
}
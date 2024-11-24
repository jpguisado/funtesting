interface ProjectType {
    id?: number,
    title: string,
    description?: string;
    environments: EnvironmentType[];
}

interface User {
    id?: string,
    name?: string,
    email: string,
    assignedTest?: TestCase[]
}

interface StepStatusByEnvironment {
    environment?: Environment,
    step?: Step,
    status: string,
}

interface Step {
    id?: number,
    case?: testCase,
    stepDescription: string,
    expectedResult: string,
    isBlocker?: string,
    order: number,
    stepStatusByEnv?: StepStatusByEnvironment
}

interface Environment {
    id?: number,
    title: string,
    URL: string;
    project?: ProjectType;
}

interface UserEpic {
    id?: number,
    title: string,
    description?: string,
    userStoriesOfThisEpic: userStory[]
}

interface UserStory {
    id?: number,
    title: string,
    description?: string,
    userEpic?: userEpic,
    casesOfThisStory: testCase[]
}

interface TestCase {
    id?: number,
    titleCase: string,
    description?: string,
    executor?: User,
    relatedStory?: userStory
    preconditions: string,
    stepList: Step[],
    executionOrder: number,
    updatedAt?: Date,
    environmentWhereIsExecuted: Environment
}

interface TestCaseTwo {
    id?: number,
    name: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
}

interface StepTwo {
    id?: number,
    description: string,
    testCaseId: number,
    executions: StepExecutionTwo,
    createdAt?: Date,
    updatedAt?: Date,
}

interface StepExecutionTwo {
    id?: number,
    status: string,
    stepId: number,
    environmentId: number,
    executedat?: Date,
    createdAt?: Date,
    updatedAt?: Date,

}
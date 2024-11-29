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
    userStoriesOfThisEpic?: userStory[]
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
    relatedStory?: userStory
    preconditions: string,
    stepList: Step[],
    executionOrder?: number,
    updatedAt?: Date,
    environmentWhereIsExecuted?: TestCaseInEnvironment
}

interface TestCaseInEnvironment {
    environment: Environment,
    testCase?: TestCase,
    status: string,
    executor: User,
}
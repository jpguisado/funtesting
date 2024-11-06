import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchTestCase } from "@/server/data-layer"
import { Terminal } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function Page() {

    const testCase = await fetchTestCase(3)

    return (
        <div>
            <Alert className="bg-blue-200">
                <Terminal className="h-4 w-4" />
                <AlertTitle>{testCase?.titleCase}</AlertTitle>
                <AlertDescription>
                    {testCase?.preconditions}
                </AlertDescription>
            </Alert>
            {testCase?.stepList.map((step) => {
                return (
                    <div key={step.id} className="flex w-full mt-3 gap-3">
                        <Card className="w-3/4">
                            <CardHeader>
                                <CardTitle>{step.id}</CardTitle>
                                <CardDescription>{step.stepDescription}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{step.stepDescription}</p>
                            </CardContent>
                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                        </Card>

                        <Card className="w-3/4">
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                        </Card>

                        <div className="w-24 bg-green-300 flex items-center justify-center border-gray-300 border-2 rounded-lg">
                            pass
                        </div>

                    </div>
                )
            })}

        </div>
    )
}
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchTestCase } from "@/server/data-layer"
import { Terminal } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import EditStepStatus from "./edit-step-status"

export const dynamic = 'force-dynamic'

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) {
    const id = (await searchParams).id
    const testCase = await fetchTestCase(parseInt(id))
    return (
        <div>
            <Alert className="bg-blue-200">
                <Terminal className="h-8 w-8" />
                <AlertTitle className="text-2xl">{testCase?.titleCase}</AlertTitle>
                <AlertDescription className="text-md">
                    {testCase?.preconditions}
                </AlertDescription>
            </Alert>
            {testCase?.stepList.map((step) => {
                return (
                    <div key={step.id} className="flex w-full mt-3 gap-3">
                        <Card className="w-3/4">
                            <CardHeader>
                                <CardTitle>Paso {step.order}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{step.stepDescription}</p>
                            </CardContent>
                        </Card>

                        <Card className="w-3/4">
                            <CardHeader>
                                <CardTitle>Resultado esperado paso {step.order}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{step.expectedResult}</p>
                            </CardContent>
                        </Card>
                        <EditStepStatus stepStatus={step.stepStatus} stepId={step.id}/>
                    </div>
                )
            })}

        </div>
    )
}
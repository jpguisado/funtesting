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
import { currentUser } from "@clerk/nextjs/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const dynamic = 'force-dynamic'

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) {
    const id = (await searchParams).id;
    const testCase = await fetchTestCase(parseInt(id));
    const avatar = await currentUser();
    return (
        <div>
            {/* TODO: pasar a grid */}
            <Alert className="bg-blue-200 mb-12">
                <Terminal className="h-8 w-8" />
                <AlertTitle className="text-2xl">{testCase?.titleCase}</AlertTitle>
                <AlertDescription className="text-md">
                    {testCase?.preconditions}
                </AlertDescription>
            </Alert>
            <div className="flex gap-3">
                <Card className="w-full">
                    <CardHeader className="font-bold text-2xl">Responsable:</CardHeader>
                    <CardContent>
                        <Avatar>
                            <AvatarImage src={avatar?.imageUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader className="font-bold text-2xl">Ejecución:</CardHeader>
                    <CardContent>
                        <div className="bg-blue-200 w-24 h-24 rounded-full flex items-center justify-center">
                            <div className="bg-red-200 w-16 h-16 rounded-full">
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader className="font-bold text-2xl">Última ejecución:</CardHeader>
                    <CardContent>
                        <p>100</p>
                    </CardContent>
                </Card>
            </div>
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
                        <EditStepStatus stepStatus={step.stepStatus} stepId={step.id} />
                    </div>
                )
            })}

        </div>
    )
}
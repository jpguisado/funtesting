import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchTestCaseById } from "@/server/data-layer"
import { CheckCheckIcon, Terminal } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import EditStepStatus from "./edit-step-status"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { clerkClient } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import CertifyCase from "./certify-case"

export const dynamic = 'force-dynamic'

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>
}) {
    const id = (await searchParams).id;
    const testCase = await fetchTestCaseById(parseInt(id));
    const userId = testCase?.executor?.id?.toString() ?? '';
    const avatar = (await (await clerkClient()).users.getUser(userId).then((user) => user).catch(() => console.log('This case does not have a executor'))) ?? {imageUrl: '', fullName: ''}; 
    return (
        <div className="grid grid-cols-12 flex-col gap-3">
            <Alert className="bg-blue-200 col-span-12">
                <Terminal className="h-8 w-8" />
                <AlertTitle className="text-2xl">{testCase?.titleCase}</AlertTitle>
                <AlertDescription className="text-md">
                    {testCase?.preconditions}
                </AlertDescription>
            </Alert>
            <div className="flex gap-3 col-span-12">
                <Card className="w-full">
                    <CardHeader className="font-bold text-2xl">Responsable:</CardHeader>
                    <CardContent className="flex  items-center gap-3">
                        <Avatar>
                            <AvatarImage src={avatar.imageUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {avatar.fullName}
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader className="font-bold text-2xl">Ejecutados con éxito:</CardHeader>
                    <CardContent>
                        <Badge className="text-2xl" variant={"secondary"}>{testCase?.stepList.filter((el) => el.stepStatus === 'pass').length } de {testCase?.stepList.length}</Badge> 
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader className="font-bold text-2xl">Última actualización:</CardHeader>
                    <CardContent>
                        {testCase?.updatedAt.toString()}
                    </CardContent>
                </Card>
            </div>
            {testCase?.stepList.map((step) => {
                return (
                    <div key={step.id} className="flex w-full mt-3 gap-3 col-span-12">
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
                        <EditStepStatus testCaseId={id} stepStatus={step.stepStatus} stepId={step.id} />
                    </div>
                )
            })}
            {/* TODO: solo si se han completado todos los pasos */}
            {<CertifyCase testCaseId={parseInt(id)} />} 
        </div>
    )
}
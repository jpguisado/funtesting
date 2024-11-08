import { fetchTestCases } from "@/server/data-layer";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const testCases = await fetchTestCases();
  return (
    <>
      <div className="text-2xl">Resumen de test:</div>
      <Table>
        <TableCaption>A list of your tests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Test Code</TableHead>
            <TableHead>Execution order</TableHead>
            <TableHead>Asignee</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testCases.map((test) => {
            return (
              <TableRow key={test.id}>
                <TableCell className="font-medium">{test.id}</TableCell>
                <TableCell className="font-medium">{test.executionOrder}</TableCell>
                <TableCell className="font-medium">{test.executor?.name}</TableCell>
                <TableCell>{test.titleCase}</TableCell>
                <TableCell><Badge variant="outline">{test.status}</Badge></TableCell>
                <TableCell className="text-right"><Link href={'/test-case/edit?id=' + test.id.toString()}>Detalles</Link></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {/* {
        testCases.map((epic: userEpicListType) => {
          return <Accordion key={epic.id} type="single" collapsible>
            <AccordionItem value={epic.id.toString()}>
              <AccordionTrigger>{epic.title}</AccordionTrigger>
              <AccordionContent>
                {epic.userStoriesOfThisEpic.map((userStory: userStoryListType) => {
                  return <Accordion key={userStory.id} type="single" collapsible>
                    <AccordionItem value={userStory.id.toString()}>
                      <AccordionTrigger>{userStory.title}</AccordionTrigger>
                      <AccordionContent>
                        {userStory.casesOfThisStory.map((caseOf: newTestCaseType) => {
                          return <Accordion key={caseOf.id} type="single" collapsible>
                            <AccordionItem value={caseOf.titleCase}>
                              <div className="my-3"><Link href={`/test-case/edit?id=${caseOf.id}`}>{caseOf.titleCase}</Link></div>
                            </AccordionItem>
                          </Accordion>
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        })
      } */}
    </>
  );
}

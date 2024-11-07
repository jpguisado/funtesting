import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { fetchStringOfTest } from "@/server/data-layer";
import { newTestCaseType, userEpicListType, userStoryListType } from "@/types/types";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const testCases = await fetchStringOfTest()
  return (
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
                          <div className="my-3"><Link href={`/new-test-case/edit?id=${caseOf.id}`}>{caseOf.titleCase}</Link></div>
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
  );
}

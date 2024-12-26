'use client';

import { Button } from "@/components/ui/button";
import { BookOpenTextIcon, DatabaseZapIcon, FlaskConicalIcon, HomeIcon, MountainSnowIcon, WrenchIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function AsideMenu() {
  const searchParams = useSearchParams();
  const envId = searchParams.get('envId');

  const content = [{
    'icon': <HomeIcon />,
    'option': 'Home',
    'link': `/`,
  }, {
    'icon': <MountainSnowIcon />,
    'option': 'Epics',
    'link': `/user-epic`,
  }, {
    'icon': <BookOpenTextIcon />,
    'option': 'User stories',
    'link': `/user-story`,
  }, {
    'icon': <FlaskConicalIcon />,
    'option': 'Test cases',
    'link': `/test-case`,
  }, {
    'icon': <DatabaseZapIcon />,
    'option': 'Data preparation',
    'link': `/data-preparation`,
  }, {
    'icon': <WrenchIcon />,
    'option': 'Execution',
    'link': `/test-execution?envId=${envId}`,
  }]

  return (
    <ul className="space-y-3">
      {content.map((element) => {
        return <Button
          key={element.option}
          variant={"link"}>{element.icon}
          <Link href={element.link}>{element.option}</Link>
        </Button>
      })}
    </ul>
  )
}
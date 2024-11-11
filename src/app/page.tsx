import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpenTextIcon, CogIcon, DatabaseZapIcon, FlaskConicalIcon, MonitorCogIcon, MountainSnowIcon, WrenchIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export default async function Home() {

  const content = [{
    'icon': <MountainSnowIcon />,
    'title': 'Épicas de usuario',
    'subtitle': 'Creación y edición de las épicas de usuario',
    'link': '/user-epic'

  }, {
    'icon': <BookOpenTextIcon />,
    'title': 'Historias de usuario',
    'subtitle': 'Creación y edición de las historias de usuario',
    'link': '/user-story'

  }, {
    'icon': <FlaskConicalIcon />,
    'title': 'Listado de test',
    'subtitle': 'Diseño y gestión de los test generados en el proyecto',
    'link': '/test-case'

  }, , {
    'icon': <WrenchIcon />,
    'title': 'Ejecución de test',
    'subtitle': 'Ejecución de test',
    'link': '/test-execution'

  }, {
    'icon': <DatabaseZapIcon />,
    'title': 'Preparación de datos',
    'subtitle': 'Preparación de los datos necesarios para lanzar las pruebas de manera controlada',
    'link': '/data-preparation'

  }, {
    'icon': <MonitorCogIcon />,
    'title': 'Administración del proyecto',
    'subtitle': 'Administra los principales valores de configuración del proyecto',
    'link': '/project-config'

  }, {
    'icon': <CogIcon />,
    'title': 'Administración de la herramienta',
    'subtitle': 'Administración de la plataforma',
    'link': '/administrator'
  }]

  return (
    <div className="grid grid-cols-4 gap-12">
      {content.map((element) => {
        return <Link key={element!.title} href={element!.link}>
          <Card className="hover:bg-slate-50">
            <CardHeader>
              <CardTitle className="flex gap-3 flex-col">{element!.icon} {element!.title}</CardTitle>
              <CardDescription>{element!.subtitle}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      })}
    </div>
  );
}

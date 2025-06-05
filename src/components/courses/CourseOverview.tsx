import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Role } from "@/types";

interface Props {
  role: Role;
}

export const CourseOverview: React.FC<Props> = ({ role }) => {
  const renderInfoByRole = () => {
    switch (role) {
      case "teacher":
        return (
          <p className="text-sm text-muted-foreground text-center">
            Ви переглядаєте огляд курсу як <strong>викладач</strong>. Тут ви можете редагувати зміст, додавати матеріали та перевіряти роботи студентів.
          </p>
        );
      case "admin":
        return (
          <p className="text-sm text-muted-foreground text-center">
            Ви переглядаєте курс як <strong>адміністратор</strong>. Адміністратори мають доступ до всіх курсів і статистики.
          </p>
        );
      case "student":
      default:
        return (
          <p className="text-sm text-muted-foreground text-center">
            Ви переглядаєте огляд курсу як <strong>студент</strong>. Ознайомтесь із силабусом, теоретичними матеріалами та практичними завданнями.
          </p>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card className="dark:bg-zinc-900">
          <CardContent className="p-4 space-x-2 flex flex-wrap items-center text-sm text-muted-foreground">
            <span>25 тем</span>
            <span>•</span>
            <span>50 лекцій</span>
            <span>•</span>
            <span>72 години</span>
            <span>•</span>
            <span>залік</span>
          </CardContent>
        </Card>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="syllabus">
            <AccordionTrigger>Силабус</AccordionTrigger>
            <AccordionContent>
              {[1, 2, 3].map((n) => (
                <Card key={n} className="mb-2 dark:bg-zinc-900">
                  <CardContent className="p-4">Посилання. Тема {n}</CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="theory">
            <AccordionTrigger>Теоретичні відомості</AccordionTrigger>
            <AccordionContent>Матеріали по теорії...</AccordionContent>
          </AccordionItem>

          <AccordionItem value="practice">
            <AccordionTrigger>Практичні та індивідуальні завдання</AccordionTrigger>
            <AccordionContent>Опис практичних робіт...</AccordionContent>
          </AccordionItem>

          <AccordionItem value="control">
            <AccordionTrigger>Контроль</AccordionTrigger>
            <AccordionContent>Інформація про контрольні...</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="space-y-4">
        <Card className="dark:bg-zinc-900">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
            <p className="font-semibold">Вакуленко О. В.</p>
            {renderInfoByRole()}
            <Button variant="outline" className="mt-4">
              Написати повідомлення
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

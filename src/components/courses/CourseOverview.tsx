import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Role } from "@/types";
interface Props {
  role: 'student' | 'teacher' | 'admin';
}

export const CourseOverview: React.FC<Props> = ({ role }) => {
    const user: { role: Role } = {
        role: "student",// 'student' 'teacher'
      };
      

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card className= "dark:bg-zinc-900">
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
            <AccordionTrigger >Силабус</AccordionTrigger>
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
        <Card className= "dark:bg-zinc-900">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4" />
            <p className="font-semibold">Вакуленко О. В.</p>
            <div className="flex gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-black" />
              <div className="w-6 h-6 rounded-full bg-black" />
              <div className="w-6 h-6 rounded-full bg-black" />
            </div>
            <Button className="mt-4 w-full">Повідомлення</Button>
          </CardContent>
        </Card>

        <Card className= "dark:bg-zinc-900">
          <CardContent className="p-4 text-sm">
            <h3 className="font-semibold mb-2">Консультації</h3>
            <div>Офлайн: кожна п’ятниця, ауд. М210</div>
            <div>Онлайн: п’ятниця 15:00–16:00</div>
            <Button className="mt-2">Показати</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

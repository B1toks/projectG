"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash } from "lucide-react";
import { Role } from "@/types";

const user: { role: Role } = {
  role: "student", // 'student'  'teacher'
};

const TasksTab = () => {
  const isTeacher = user.role === "teacher";

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 dark:bg-zinc-900">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Завдання</CardTitle>
            {!isTeacher && (
              <span className="text-muted-foreground">15/30</span>
            )}
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {[1, 2, 3].map((t) => (
                <AccordionItem key={t} value={`theme-${t}`}>
                  <AccordionTrigger>
                    Тема {t}: Назва
                    {isTeacher && (
                      <div className="ml-auto flex gap-2">
                        <Pencil className="w-4 h-4 cursor-pointer" />
                        <Trash className="w-4 h-4 cursor-pointer" />
                      </div>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    {!isTeacher ? (
                      <ul className="space-y-1">
                        <li className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox /> Відео
                          </div>
                          <span className="text-sm">4 хв</span>
                        </li>
                        <li className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox /> Текст
                          </div>
                          <span className="text-sm">20 хв</span>
                        </li>
                        <li className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox /> Тест
                          </div>
                          <span className="text-sm">24 питання</span>
                        </li>
                      </ul>
                    ) : (
                      <Button size="sm" variant="outline">
                        Додати матеріал
                      </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {isTeacher && (
          <div className="space-y-2">
            {[
              "Теоретичні відомості",
              "Практичні та індивідуальні завдання",
              "Контроль",
            ].map((block) => (
              <Card key={block}>
                <CardHeader className="flex justify-between">
                  <CardTitle>{block}</CardTitle>
                  <Pencil className="w-4 h-4 cursor-pointer" />
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>

      {!isTeacher && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="text-center relative h-32 w-full">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="10"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#e4e4e7"
                  strokeWidth="10"
                  strokeDasharray="126"
                  strokeDashoffset={126 * (1 - 0.74)}
                  strokeLinecap="butt"
                />
              </svg>
              <div className="absolute pt-10 inset-0 flex flex-col justify-center items-center -mt-4 ">
                <div className="text-2xl font-bold">74</div>
                <div className="text-muted-foreground text-sm">з 100 балів</div>
              </div>
            </div>

            <div className="text-sm justify-between">
              <div>Важливі: <strong>14</strong></div>
              <div>Неважливі: <strong>8</strong></div>
            </div>

            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Button key={i} className="w-full" variant="secondary">
                  Зробити прототип
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TasksTab;

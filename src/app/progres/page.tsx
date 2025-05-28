"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const mockSubjects = [
  { id: 1, title: "UX-UI дизайн", teacher: "Вакуленко О. В.", score: 78, max: 100 },
  { id: 2, title: "Проєктування", teacher: "Кравчук О. І.", score: 9, max: 12 },
  { id: 3, title: "Типографіка", teacher: "Ковальчук С. С.", score: 23, max: 100 },
  { id: 4, title: "UX дослідження", teacher: "Мельник Л. П.", score: 73, max: 100 },
  { id: 5, title: "Прототипування", teacher: "Гончаренко А. Р.", score: 64, max: 100 },
  { id: 6, title: "Анімація", teacher: "Романюк Н. О.", score: 90, max: 100 },
  { id: 7, title: "Історія дизайну", teacher: "Бондаренко І. В.", score: 55, max: 100 },
  { id: 8, title: "Теорія кольору", teacher: "Сидоренко П. М.", score: 88, max: 100 },
  { id: 9, title: "Інтерактивний дизайн", teacher: "Литвиненко Ю. С.", score: 92, max: 100 },
];

const grades = [
  { value: "+8", subject: "Дизайн проєктування" },
  { value: "12", subject: "UX тестування" },
  { value: "+5", subject: "Аналіз UI" },
  { value: "+4", subject: "Прототипування" },
  { value: "+9", subject: "Історія дизайну" },
  { value: "+7", subject: "Теорія кольору" },
  { value: "+6", subject: "Інтерактивний дизайн" },
];

const events = [
  { date: new Date(2025, 4, 21), type: "test" },
  { date: new Date(2025, 4, 23), type: "homework" },
  { date: new Date(2025, 4, 25), type: "exam" },
  { date: new Date(2025, 4, 26), type: "homework" },
  { date: new Date(2025, 4, 27), type: "test" },
  { date: new Date(2025, 4, 29), type: "exam" },
];

const getEventCircleColor = (type: string) => {
  switch (type) {
    case "homework":
      return "bg-neutral-400 text-black";
    case "test":
      return "bg-blue-500 text-white";
    case "exam":
      return "bg-red-500 text-white";
    default:
      return "bg-muted text-foreground";
  }
};

export default function PerformancePage() {
  const [gradeIndex, setGradeIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const gradesContainerRef = useRef<HTMLDivElement>(null);

  const handleDayClick = (date: Date) => {
    const hasEvent = events.some((e) => e.date.toDateString() === date.toDateString());
    if (hasEvent) {
      setSelectedDate(date);
      setIsDialogOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setGradeIndex((i) => {
          const next = (i + 1) % grades.length;
          scrollToGrade(next);
          return next;
        });
      } else if (e.key === "ArrowLeft") {
        setGradeIndex((i) => {
          const prev = i > 0 ? i - 1 : grades.length - 1;
          scrollToGrade(prev);
          return prev;
        });
      } else if (e.key === "Escape") {
        setIsDialogOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToGrade = (index: number) => {
    const container = gradesContainerRef.current;
    if (container) {
      const child = container.children[index] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  useEffect(() => {
    scrollToGrade(gradeIndex);
  }, [gradeIndex]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-background text-foreground p-6 gap-6">
      <div className="space-y-4 overflow-y-auto pr-2 max-h-screen scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-900 animate-fadeInUp">
        <h1 className="text-2xl font-bold">Успішність</h1>
        {mockSubjects.map((subj) => (
          <Card key={subj.id} className="p-4 bg-white dark:bg-zinc-900 animate-fadeInUp">
            <div className="flex items-start gap-4">
              <div className="w-4 h-4 bg-zinc-700 rounded-sm mt-1" />
              <div className="flex-1">
                <div className="text-lg font-semibold">{subj.title}</div>
                <div className="text-sm text-muted-foreground">Викладач: {subj.teacher}</div>
                <Progress value={(subj.score / subj.max) * 100} className="mt-2 h-2" />
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="text-lg">{subj.score}</Badge>
                <div className="text-xs text-muted-foreground">з {subj.max}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Останні оцінки</h1>
        <Card className="bg-white dark:bg-zinc-900 animate-fadeInUp">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Button size="icon" variant="ghost" onClick={() => setGradeIndex((i) => (i > 0 ? i - 1 : grades.length - 1))}>
                <ChevronLeft />
              </Button>
              <div className="relative w-[340px] h-[120px] flex items-center px-5 overflow-hidden">
                <div ref={gradesContainerRef} className="relative flex gap-4 min-w-max items-end">
                  {grades.map((grade, idx) => {
                    const isActive = idx === gradeIndex;
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "flex-shrink-0 flex flex-col items-center justify-center w-[100px] h-[100px] rounded-full transition-all duration-300",
                          "backdrop-blur-sm bg-zinc-800/30 shadow-md",
                          isActive ? "scale-105" : "opacity-40 scale-90"
                        )}
                      >
                        <div className="text-xl font-bold">{grade.value}</div>
                        {isActive && <div className="text-xs text-center mt-1 text-foreground">{grade.subject}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setGradeIndex((i) => (i + 1) % grades.length)}>
                <ChevronRight />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-zinc-900 animate-fadeInUp">
          <CardContent className="p-6 w-full">
            <div className="text-lg font-medium mb-4 text-foreground">Домашні завдання та тести</div>
            <DayPicker
  mode="single"
  selected={selectedDate || undefined}
  onDayClick={handleDayClick}
  className="w-full max-w-[480px] mx-auto" //xzzz
  classNames={{
    day: "relative w-12 h-12 flex items-center justify-center rounded-full text-sm mx-4", // ширші дні
  }}
  components={{
    DayContent: ({ date }) => {
      const dayEvents = events.filter(
        (event) => event.date.toDateString() === date.toDateString()
      );

      const primaryEvent = dayEvents.find((e) => e.type === "exam")
        || dayEvents.find((e) => e.type === "test")
        || dayEvents.find((e) => e.type === "homework");

      if (primaryEvent) {
        const colorClass = getEventCircleColor(primaryEvent.type);
        return (
          <div
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full",
              colorClass
            )}
          >
            <span className="font-semibold text-sm">{date.getDate()}</span>
          </div>
        );
      }

      return <span className="font-semibold text-sm">{date.getDate()}</span>;
    },
  }}
  footer={
    <div className="mt-4 flex gap-2 justify-around text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 bg-neutral-400 rounded-full" /> ДЗ
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 bg-blue-500 rounded-full" /> Тест
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 bg-red-500 rounded-full" /> Екзамен
      </div>
    </div>
  }
/>


          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Події на {selectedDate?.toLocaleDateString()}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {events
              .filter((e) => e.date.toDateString() === selectedDate?.toDateString())
              .map((e, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getEventCircleColor(e.type).split(" ")[0]}`} />
                  <div className="capitalize">
                    {e.type === "homework" ? "Домашнє завдання" : e.type === "test" ? "Тест" : "Екзамен"}
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

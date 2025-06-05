"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  { date: 21, type: "test" },
  { date: 23, type: "homework" },
  { date: 25, type: "exam" },
  { date: 26, type: "homework" },
  { date: 27, type: "test" },
  { date: 29, type: "exam" },
];

const getDaysInMonth = () => {
  const year = 2025;
  const month = 5; // June (0-indexed)
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }
  
  return days;
};

const getEventType = (day: number): string | null => {
  const event = events.find(e => e.date === day);
  return event ? event.type : null;
};

const getEventColor = (type: string): string => {
  switch (type) {
    case "homework":
      return "bg-gray-400 text-black";
    case "test":
      return "bg-blue-500 text-white";
    case "exam":
      return "bg-red-500 text-white";
    default:
      return "";
  }
};

export default function PerformancePage() {
  const [gradeIndex, setGradeIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const gradesContainerRef = useRef<HTMLDivElement>(null);

  const handleDayClick = (day: number): void => {
    const eventType = getEventType(day);
    if (eventType) {
      setSelectedDate(day);
      setIsDialogOpen(true);
    }
  };

  const scrollToGrade = (index: number): void => {
    const container = gradesContainerRef.current;
    if (container && container.children[index]) {
      const child = container.children[index] as HTMLElement;
      child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
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

  useEffect(() => {
    scrollToGrade(gradeIndex);
  }, [gradeIndex]);

  const days = getDaysInMonth();
  const weekDays = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Column - Subjects */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Успішність</h1>
          <div className="space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
            {mockSubjects.map((subj) => (
              <div key={subj.id} className="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-zinc-700">
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 bg-gray-600 dark:bg-zinc-600 rounded-sm mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{subj.title}</div>
                    <div className="text-sm text-gray-600 dark:text-zinc-400">Викладач: {subj.teacher}</div>
                    <div className="mt-2 bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(subj.score / subj.max) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white px-3 py-1 rounded-full text-lg font-semibold">
                      {subj.score}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-zinc-400 mt-1">з {subj.max}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Grades */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Останні оцінки</h2>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-zinc-700">
              <div className="flex justify-between items-center">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                  onClick={() => setGradeIndex((i) => (i > 0 ? i - 1 : grades.length - 1))}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
                </button>
                
                <div className="relative w-80 h-28 flex items-center px-4 overflow-hidden">
                  <div ref={gradesContainerRef} className="flex gap-4 min-w-max items-center">
                    {grades.map((grade, idx) => {
                      const isActive = idx === gradeIndex;
                      return (
                        <div
                          key={idx}
                          className={`flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${
                            isActive 
                              ? "scale-110 bg-blue-100 dark:bg-blue-900" 
                              : "opacity-40 scale-90 bg-gray-100 dark:bg-zinc-700"
                          }`}
                        >
                          <div className={`text-xl font-bold ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-zinc-400"}`}>
                            {grade.value}
                          </div>
                          {isActive && (
                            <div className="text-xs text-center mt-1 text-gray-600 dark:text-zinc-400 px-2">
                              {grade.subject}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                  onClick={() => setGradeIndex((i) => (i + 1) % grades.length)}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-zinc-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-zinc-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Домашні завдання та тести</h3>
              
              {/* Calendar Header */}
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Червень 2025</h4>
              </div>
              
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-zinc-400">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {days.map((day, index: number) => {
                  if (!day) {
                    return <div key={index} className="h-10" />;
                  }
                  
                  const eventType = getEventType(day);
                  const hasEvent = eventType !== null;
                  
                  return (
                    <button
                      key={day}
                      onClick={() => hasEvent && handleDayClick(day)}
                      className={`h-10 w-full flex items-center justify-center text-sm rounded-md transition-all duration-200 ${
                        hasEvent 
                          ? `${getEventColor(eventType)} cursor-pointer hover:scale-105 font-semibold` 
                          : "text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                      } ${day === 6 ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold" : ""}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex gap-6 justify-center text-sm text-gray-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-gray-400 rounded-full" />
                  <span>ДЗ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded-full" />
                  <span>Тест</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-red-500 rounded-full" />
                  <span>Екзамен</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Події на {selectedDate} червня
            </h3>
            <div className="space-y-2">
              {events
                .filter((e) => e.date === selectedDate)
                .map((e, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getEventColor(e.type).split(" ")[0]}`} />
                    <div className="text-gray-700 dark:text-zinc-300">
                      {e.type === "homework" ? "Домашнє завдання" : e.type === "test" ? "Тест" : "Екзамен"}
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Закрити
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
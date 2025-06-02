"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import type { Role } from '@/types';
import { cn } from '@/lib/utils';

interface JournalTabProps {
  role: Role;
}

const mockStudents = [
  {
    name: 'Момко Софія Леонідівна',
    details: '022 Дизайн',
    email: 'fnogsoul@gmail.com',
    phone: '+380193908103'
  },
  {
    name: 'Афанасьєва Дарʼя Олександрівна',
    details: '022 Дизайн',
    email: 'fnogsoul@gmail.com',
    phone: '+380193908103'
  },
  {
    name: 'Матюшевська-Комісарчук Наталія Михайлівна',
    details: '022 Дизайн',
    email: 'fnogsoul@gmail.com',
    phone: '+380193908103'
  },
];

const mockTopics = [
  'Тема 1. Назва...',
  'Тема 2. Назва...',
  'Тема 3. Назва...',
  'Тема 4. Назва...',
  'Тема 5. Назва...',
  'Тема 6. Назва...',
  'Тема 7. Назва...',
  'Тема 8. Назва...',
  'Тема 9. Назва...',
  'Тема 10. Назва...',
  'Тема 11. Назва...',
  'Тема 12. Назва...',
];

const mockDates = [
  { date: '17.03.2025' },
  { date: '24.03.2025' },
  { date: '31.03.2025' },
  { date: '07.04.2025' },
  { date: '14.04.2025' },
  { date: '21.04.2025' },
  { date: '28.04.2025' },
  { date: '05.05.2025' },
  { date: '12.05.2025' },
  { date: '19.05.2025' },
  { date: '26.05.2025' },
  { date: '02.06.2025' },
];

type AttendanceMark = '✔' | '✘' | null;
type AttendanceState = Record<number, Record<number, AttendanceMark>>;

type GradeEntry = {
  value: number;
  max: number;
};

type GradesState = Record<number, Record<number, GradeEntry>>;

export default function JournalTab({ role }: JournalTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<'grades' | 'attendance' | 'students'>('grades');
  const [editMode, setEditMode] = useState<Record<'grades' | 'attendance', boolean>>({
    grades: false,
    attendance: false,
  });
  const [moduleIndex, setModuleIndex] = useState(0);
  
  const visibleTopics = mockTopics.slice(moduleIndex, moduleIndex + 4);
  const visibleDates = mockDates.slice(moduleIndex, moduleIndex + 4);

  const [grades, setGrades] = useState<GradesState>(() => {
    const initial: GradesState = {};
    mockStudents.forEach((_, sIdx) => {
      initial[sIdx] = {};
      mockTopics.forEach((_, tIdx) => {
        initial[sIdx][tIdx] = { value: Math.floor(Math.random() * 12) + 1, max: 12 };
      });
    });
    return initial;
  });

  const [attendance, setAttendance] = useState<AttendanceState>(() => {
    const initial: AttendanceState = {};
    mockStudents.forEach((_, sIdx) => {
      initial[sIdx] = {};
      mockDates.forEach((_, dIdx) => {
        initial[sIdx][dIdx] = Math.random() > 0.3 ? '✔' : (Math.random() > 0.5 ? '✘' : null);
      });
    });
    return initial;
  });

  const isInEditMode = editMode.grades || editMode.attendance;

  const handleTabChange = (tab: 'grades' | 'attendance' | 'students') => {
    if (isInEditMode) {
      const confirmSwitch = window.confirm('У вас є незбережені зміни. Перейти без збереження?');
      if (!confirmSwitch) return;
      setEditMode({ grades: false, attendance: false });
    }
    setActiveSubTab(tab);
  };

  const handleGradeChange = (sIdx: number, tIdx: number, value: string) => {
    const newValue = Number(value);
    setGrades((prev) => {
      const current = prev[sIdx][tIdx];
      return {
        ...prev,
        [sIdx]: {
          ...prev[sIdx],
          [tIdx]: {
            ...current,
            value: newValue > current.max ? current.max : newValue,
          },
        },
      };
    });
  };

  const handleMaxChange = (sIdx: number, tIdx: number, value: string) => {
    const newMax = Number(value);
    setGrades((prev) => {
      const current = prev[sIdx][tIdx];
      return {
        ...prev,
        [sIdx]: {
          ...prev[sIdx],
          [tIdx]: {
            value: Math.min(current.value, newMax),
            max: newMax,
          },
        },
      };
    });
  };

  const markAttendance = (sIdx: number, dIdx: number, value: AttendanceMark) => {
    setAttendance((prev) => ({
      ...prev,
      [sIdx]: {
        ...prev[sIdx],
        [moduleIndex + dIdx]: value,
      },
    }));
  };

  const calculateTotalGrade = (sIdx: number) => {
    const studentGrades = grades[sIdx];
    let totalValue = 0;
    let totalMax = 0;
    
    Object.values(studentGrades).forEach(grade => {
      totalValue += grade.value;
      totalMax += grade.max;
    });
    
    return { value: totalValue, max: totalMax };
  };

  const nextModule = () => {
    const maxIndex = activeSubTab === 'grades' ? mockTopics.length : mockDates.length;
    if (moduleIndex + 4 < maxIndex) {
      setModuleIndex(moduleIndex + 4);
    }
  };

  const prevModule = () => {
    if (moduleIndex > 0) {
      setModuleIndex(moduleIndex - 4);
    }
  };

  const handleEditToggle = () => {
    if (activeSubTab === 'grades') {
      setEditMode(prev => ({ ...prev, grades: !prev.grades }));
    } else if (activeSubTab === 'attendance') {
      setEditMode(prev => ({ ...prev, attendance: !prev.attendance }));
    }
  };

  const exitEditMode = () => {
    setEditMode({ grades: false, attendance: false });
  };

  const CustomTabs = () => (
    <div className="flex border-b border-gray-200 dark:border-zinc-700 mb-6">
      {[
        { value: 'grades', label: 'Оцінки' },
        { value: 'attendance', label: 'Відвідуваність' },
        { value: 'students', label: 'Студенти' }
      ].map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value as any)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeSubTab === tab.value
              ? "text-gray-900 dark:text-white border-b-2 border-blue-500"
              : "text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-xl overflow-x-auto border dark:border-white    ">
      <CustomTabs />

      {/* Students Tab */}
      {activeSubTab === 'students' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Список студентів</h2>
          <div className="space-y-3">
            {mockStudents.map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-300 dark:bg-zinc-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {student.name.split(' ').map(name => name[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                    <div className="text-sm text-gray-500 dark:text-zinc-400">{student.details}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500 dark:text-zinc-400">
                    <div>{student.email}</div>
                    <div>{student.phone}</div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-300 dark:border-zinc-600">
                    Підтвердження →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance Tab */}
      {activeSubTab === 'attendance' && (
        <div className="min-w-[800px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {isInEditMode && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevModule}
                    disabled={moduleIndex === 0}
                    className="p-2 border-gray-300 dark:border-zinc-600"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    onClick={exitEditMode}
                    className="flex items-center gap-1 text-gray-600 dark:text-zinc-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    <ArrowLeft size={16} /> Вийти
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextModule}
                    disabled={moduleIndex + 4 >= mockDates.length}
                    className="p-2 border-gray-300 dark:border-zinc-600"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </>
              )}
              
              {!isInEditMode && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevModule}
                    disabled={moduleIndex === 0}
                    className="p-2 border-gray-300 dark:border-zinc-600"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  
                  <div className="font-medium text-lg text-gray-900 dark:text-white">
                    Змістовний модуль {Math.floor(moduleIndex / 4) + 1}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextModule}
                    disabled={moduleIndex + 4 >= mockDates.length}
                    className="p-2 border-gray-300 dark:border-zinc-600"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </>
              )}
            </div>
            
            {!isInEditMode && (
              <Button 
                onClick={handleEditToggle}
                variant="outline"
                className="border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Редагувати
              </Button>
            )}
            {isInEditMode && (
              <Button 
                onClick={exitEditMode}
                variant="outline"
                className="border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Зберегти зміни
              </Button>
            )}
          </div>

          <div className="overflow-auto rounded-lg border border-gray-200 dark:border-zinc-700">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-50 dark:bg-zinc-800">
                <tr>
                  <th className="p-3 text-left text-gray-900 dark:text-white whitespace-nowrap border-b border-gray-200 dark:border-zinc-700">ПІБ Студента</th>
                  {visibleDates.map((d, i) => (
                    <th key={i} className="p-3 text-center text-gray-900 dark:text-white whitespace-nowrap border-b border-gray-200 dark:border-zinc-700">
                      {d.date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((student, sIdx) => (
                  <tr key={sIdx} className="border-t border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="p-3 text-gray-900 dark:text-white whitespace-nowrap">{student.name}</td>
                    {visibleDates.map((_, dIdx) => {
                      const actualDateIdx = moduleIndex + dIdx;
                      return (
                        <td key={dIdx} className="p-3 text-center">
                          {editMode.attendance ? (
                            <div className="flex justify-center gap-2">
                              <Button
                                size="sm"
                                variant={attendance[sIdx][actualDateIdx] === '✔' ? 'default' : 'outline'}
                                onClick={() => markAttendance(sIdx, dIdx, '✔')}
                                className="w-8 h-8 p-0 border-gray-300 dark:border-zinc-600"
                              >
                                <Check size={14} className="text-gray-900 dark:text-white" />
                              </Button>
                              <Button
                                size="sm"
                                variant={attendance[sIdx][actualDateIdx] === '✘' ? 'default' : 'outline'}
                                onClick={() => markAttendance(sIdx, dIdx, '✘')}
                                className="w-8 h-8 p-0 border-gray-300 dark:border-zinc-600"
                              >
                                <X size={14} className="text-gray-900 dark:text-white" />
                              </Button>
                            </div>
                          ) : (
                            <span>
                              {attendance[sIdx][actualDateIdx] === '✔' ? 
                                <Check size={16} className="inline text-gray-900 dark:text-white" /> : 
                                attendance[sIdx][actualDateIdx] === '✘' ?
                                <X size={16} className="inline text-gray-900 dark:text-white" /> :
                                <span className="text-gray-400 dark:text-zinc-500">-</span>
                              }
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grades Tab */}
      {activeSubTab === 'grades' && (
        <div className="min-w-[800px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {isInEditMode && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevModule}
                    disabled={moduleIndex === 0}
                    className="p-2 border-gray-300 dark:border-zinc-600"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    onClick={exitEditMode}
                    className="flex items-center gap-1 text-gray-600 dark:text-zinc-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    <ArrowLeft size={16} /> Вийти
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextModule}
                    disabled={moduleIndex + 4 >= mockTopics.length}
                    className="p-2 border-gray-300 dark:border-zinc-600"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </>
              )}
              
              {!isInEditMode && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevModule}
                    disabled={moduleIndex === 0}
                    className="p-2 border-gray-300 dark:border-zinc-600"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  
                  <div className="font-medium text-lg text-gray-900 dark:text-white">
                    Змістовний модуль {Math.floor(moduleIndex / 4) + 1}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextModule}
                    disabled={moduleIndex + 4 >= mockTopics.length}
                    className="p-2 border-gray-300 dark:border-zinc-600"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </>
              )}
            </div>
            
            {!isInEditMode && (
              <Button 
                onClick={handleEditToggle}
                variant="outline"
                className="border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Редагувати
              </Button>
            )}
            {isInEditMode && (
              <Button 
                onClick={exitEditMode}
                variant="outline"
                className="border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                Зберегти зміни
              </Button>
            )}
          </div>

          <div className="overflow-auto rounded-lg border border-gray-200 dark:border-zinc-700">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-50 dark:bg-zinc-800">
                <tr>
                  <th className="p-3 text-left text-gray-900 dark:text-white whitespace-nowrap border-b border-gray-200 dark:border-zinc-700">ПІБ Студента</th>
                  {visibleTopics.map((t, tIdx) => (
                    <th key={tIdx} className="p-3 text-center text-gray-900 dark:text-white whitespace-nowrap border-b border-gray-200 dark:border-zinc-700">
                      {t}
                    </th>
                  ))}
                  <th className="p-3 text-center text-gray-900 dark:text-white whitespace-nowrap border-b border-gray-200 dark:border-zinc-700">Загальна оцінка</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((student, sIdx) => {
                  const totalGrade = calculateTotalGrade(sIdx);
                  return (
                    <tr key={sIdx} className="border-t border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                      <td className="p-3 text-gray-900 dark:text-white whitespace-nowrap">{student.name}</td>
                      {visibleTopics.map((_, tIdx) => {
                        const topicIndex = moduleIndex + tIdx;
                        const entry = grades[sIdx][topicIndex];
                        return (
                          <td key={tIdx} className="p-3 text-center">
                            {editMode.grades ? (
                              <div className="flex items-center gap-1 justify-center">
                                <Input
                                  type="number"
                                  value={entry.value}
                                  onChange={(e) => handleGradeChange(sIdx, topicIndex, e.target.value)}
                                  className="w-16 text-center bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white"
                                  min="0"
                                  max={entry.max}
                                />
                                <span className="text-gray-400 dark:text-zinc-500">/</span>
                                <Input
                                  type="number"
                                  value={entry.max}
                                  onChange={(e) => handleMaxChange(sIdx, topicIndex, e.target.value)}
                                  className="w-16 text-center bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white"
                                  min="1"
                                />
                              </div>
                            ) : (
                              <span className="text-gray-900 dark:text-white">
                                {entry.value} / {entry.max}
                              </span>
                            )}
                          </td>
                        );
                      })}
                      <td className="p-3 text-center">
                        <div className="bg-blue-50 dark:bg-zinc-800 px-3 py-1 rounded-md font-medium text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700">
                          {totalGrade.value} / {totalGrade.max}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
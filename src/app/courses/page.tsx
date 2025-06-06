'use client';

import CourseCard from '../../components/courses/CourseCard';
import type { Role } from '@/types'; 
import Link from "next/link";

export default function MyCoursesPage() {
  // Тимчасовий користувач
  const user: { role: Role } = {
    role: 'student', // 'student', 'teacher' 'admin'
  };

  if (user.role !== 'teacher' && user.role !== 'student') {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <h1 className="text-xl font-semibold">Мої курси</h1>
        <p className="mt-2 text-sm">Ця сторінка доступна лише студентам та викладачам.</p>
      </div>
    );
  }

  const courses = [
    {
      id: "ux-ui-design-1",
      title: 'UX-UI дизайн',
      teacher: 'Вакуленко О. В.',
      startDate: '4 Вересня',
      endDate: '16 Травня',
      groupName: '1Д-21',
      topics: 25,
      lectures: 50,
      hours: 72,
      studentsCount: 19,
      progress: 84,
    },

  ];
 
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Мої курси</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, idx) => (
           <Link key={idx} href={`/courses/${course.id}`} className="block" >    
            <CourseCard 
              role={user.role as "student" | "teacher"} 
              title={course.title}
              teacher={user.role === "student" ? course.teacher : undefined}
              startDate={user.role === "teacher" ? course.startDate : undefined}
              endDate={user.role === "teacher" ? course.endDate : undefined}
              groupName={user.role === "teacher" ? course.groupName : undefined}
              topics={user.role === "teacher" ? course.topics : undefined}
              lectures={user.role === "teacher" ? course.lectures : undefined}
              hours={user.role === "teacher" ? course.hours : undefined}
              studentsCount={user.role === "teacher" ? course.studentsCount : undefined}
              progress={course.progress}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
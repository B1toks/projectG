'use client';

import { useState } from 'react';
import { CourseTabs } from '../../../components/courses/CourseTabs';
import { CourseOverview } from '../../../components/courses/CourseOverview';
import TasksTab from '../../../components/courses/TasksTab';
import NewsTab from '../../../components/courses/NewsTab';
import JournalTab from '../../../components/courses/JournalTab';
import type { Role } from '@/types';

export default function CoursePage() {
  const [tab, setTab] = useState<'overview' | 'tasks' | 'news' | 'journal'>('overview');

  const user = {
    role: 'teacher' as Role, // або 'student'
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">UI/UX дизайн</h1>
      <CourseTabs activeTab={tab} onTabChange={setTab} />
      
      {tab === 'overview' && <CourseOverview role={user.role} />}
      {tab === 'tasks' && <TasksTab />}
      {tab === 'news' && <NewsTab />}
      {tab === 'journal' && <JournalTab role={user.role} />}
    </div>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CourseCardProps {
  role: 'student' | 'teacher';
  title: string;
  teacher?: string;
  startDate?: string;
  endDate?: string;
  groupName?: string;
  topics?: number;
  lectures?: number;
  hours?: number;
  studentsCount?: number;
  progress: number;
}

export default function CourseCard({
  role,
  title,
  teacher,
  startDate,
  endDate,
  groupName,
  topics,
  lectures,
  hours,
  studentsCount,
  progress,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {title}
          {role === 'teacher' && groupName ? ` (${groupName})` : ''}
        </CardTitle>
        {role === 'teacher' && (
          <p className="text-muted-foreground text-sm">
            {startDate} – {endDate}
          </p>
        )}
        {role === 'student' && teacher && (
          <p className="text-muted-foreground text-sm">Викладач: {teacher}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {role === 'teacher' && (
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">📘 {topics} тем</Badge>
            <Badge variant="secondary">🎓 {lectures} лекцій</Badge>
            <Badge variant="secondary">⏱ {hours} годин</Badge>
          </div>
        )}

        <div className="space-y-1">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Прогрес</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {role === 'teacher' && (
          <div className="text-sm text-muted-foreground">👥 {studentsCount} учасників</div>
        )}
      </CardContent>
    </Card>
  );
}

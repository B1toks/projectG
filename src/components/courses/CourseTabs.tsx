'use client';

import { Button } from "@/components/ui/button";

interface Props {
  activeTab: 'overview' | 'tasks' | 'news' | 'journal';
  onTabChange: (tab: 'overview' | 'tasks' | 'news' | 'journal' ) => void;
}

export const CourseTabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2">
      <Button variant={activeTab === 'overview' ? 'default' : 'outline'} onClick={() => onTabChange('overview')}>
        Про курс
      </Button>
      <Button variant={activeTab === 'tasks' ? 'default' : 'outline'} onClick={() => onTabChange('tasks')}>
        Завдання
      </Button>
      <Button variant={activeTab === 'news' ? 'default' : 'outline'} onClick={() => onTabChange('news')}>
        Новини
      </Button>
      <Button
        variant={activeTab === 'journal' ? 'default' : 'outline'}
        onClick={() => onTabChange('journal')}
      >
        Журнал
      </Button>
    </div>
  );
};

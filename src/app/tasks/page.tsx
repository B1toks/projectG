'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

type TaskStatus = 'todo' | 'inReview' | 'done'

const statuses: { label: string; value: TaskStatus }[] = [
  { label: 'До виконання', value: 'todo' },
  { label: 'На перевірці', value: 'inReview' },
  { label: 'Виконані', value: 'done' },
]

const mockTasks = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  subject: 'Графічний дизайн',
  teacher: 'Овчаренко А.О.',
  deadline: '2024-06-01',
  status: i < 3 ? 'todo' : i < 6 ? 'inReview' : 'done',
  mark: i >= 6 ? [12, 10, 9, 6][i - 6] : undefined,
}))

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState<TaskStatus>('todo')
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')

  const filtered = mockTasks.filter(task =>
    task.status === activeTab &&
    (!search || task.subject.toLowerCase().includes(search.toLowerCase())) &&
    (!subjectFilter || task.subject === subjectFilter)
  )

  return (
    <div className="p-6 md:p-10 w-full max-w-screen-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 dark:text-white">Мої завдання</h1>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {statuses.map((status) => (
          <Button
            key={status.value}
            variant={activeTab === status.value ? 'default' : 'outline'}
            onClick={() => setActiveTab(status.value)}
            className="capitalize"
          >
            {status.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Пошук"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64"
        />
        <Select onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Предмет" />
          </SelectTrigger>
          <SelectContent className='dark:border-zinc-700 bg-white dark:bg-zinc-900'>
            <SelectItem  value="Графічний дизайн">Графічний дизайн</SelectItem>
            <SelectItem  value="Основи типографії">Основи типографії</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((task) => (
          <div
            key={task.id}
            className={cn(
              'rounded-lg border dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900 relative transition-all',
              'hover:shadow-md'
            )}
          >
            {activeTab === 'done' && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-zinc-700 text-white text-xs flex items-center justify-center">
                {task.mark}
              </div>
            )}
            <div className="h-32 bg-zinc-400/30 rounded mb-4" />
            <div className="text-sm text-muted-foreground mb-1">До здачі</div>
            <div className="text-sm font-medium dark:text-white">{task.subject}</div>
            <div className="text-xs text-muted-foreground">{task.teacher}</div>
            <div className="text-xs text-muted-foreground">До {task.deadline}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-muted-foreground text-center py-10">
            Немає завдань у цьому статусі
          </div>
        )}
      </div>
    </div>
  )
}

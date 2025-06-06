'use client';

import { useState } from 'react';
import { BellIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Notification = {
  type: 'schedule' | 'event' | 'alert';
  message: string;
  date: string;
};

const initialNotifications: Notification[] = [
  {
    type: 'schedule',
    message: '📅 Змінено розклад для групи 1Д-21 на 10 червня.',
    date: '5 червня, 12:15',
  },
  {
    type: 'event',
    message: '🎉 Новий івент: День відкритих дверей 12 червня.',
    date: '4 червня, 09:00',
  },
  {
    type: 'alert',
    message: '❗ Відключення електроенергії 6 червня.',
    date: '3 червня, 14:00',
  },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [unread, setUnread] = useState(true);

  const markAllAsRead = () => {
    setUnread(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      markAllAsRead();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className={`relative p-2 rounded-full transition cursor-pointer ${
            unread ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <BellIcon className="w-6 h-6 text-blue-500" />
          {unread && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          )}
        </span>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg">Сповіщення</DialogTitle>
        </DialogHeader>

        {notifications.length > 0 ? (
          <div className="space-y-3 mt-2 max-h-80 overflow-y-auto">
            {notifications.map((notif, idx) => (
              <div
                key={idx}
                className="border-l-4 p-3 bg-muted rounded-md shadow-sm"
                style={{
                  borderColor:
                    notif.type === 'schedule'
                      ? '#3B82F6'
                      : notif.type === 'event'
                      ? '#10B981'
                      : '#F59E0B',
                }}
              >
                <p className="text-sm">{notif.message}</p>
                <span className="text-xs text-muted-foreground">{notif.date}</span>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                setNotifications([]);
                setUnread(false);
              }}
            >
              Позначити всі як прочитані
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mt-4">Немає нових сповіщень</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ChatMessage.tsx
import React from 'react';
import { Message } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwn }) => {
  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow 
          ${isOwn
            ? 'bg-blue-500 text-white dark:bg-blue-600'
            : 'bg-gray-200 dark:bg-gray-800 dark:text-white'}`}
      >
        {message.content}
      </div>
      <div
        className="text-xs text-gray-500 mt-1"
        title={new Date(message.timestamp).toLocaleString('uk-UA')}
      >
        {formatDistanceToNow(new Date(message.timestamp), {
          addSuffix: true,
          locale: uk,
        })}{' '}
        • {message.status === 'read' ? 'Прочитано' : 'Відправлено'}
      </div>
    </div>
  );
};

export default ChatMessage;

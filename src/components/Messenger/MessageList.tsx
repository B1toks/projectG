import React, { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';

const MessageList: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  return (
    <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-xs px-4 py-2 rounded-lg ${
            msg.senderId === '1' ? 'bg-blue-600 self-end ml-auto' : 'bg-zinc-800 self-start'
          }`}
        >
          <p>{msg.content}</p>
          <p className="text-xs text-gray-300 mt-1 text-right">{msg.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;

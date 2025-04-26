import React from 'react';
import { User, Message } from '@/types/chat';

interface Props {
  user: User;
  messages: Message[];
  onBack: () => void;
}

const ChatView: React.FC<Props> = ({ user, messages, onBack }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-white dark:bg-zinc-800 p-4 transition-transform transform translate-x-0 z-10">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="mr-2">←</button>
        <h2 className="text-lg font-bold">{user.fullName}</h2>
        <div className="ml-auto">⋮</div>
      </div>
      <div className="flex flex-col space-y-2 mb-20 overflow-y-auto h-[calc(100vh-160px)]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] p-2 rounded text-sm ${
              msg.senderId === 'me' ? 'bg-blue-600 text-white self-end' : 'bg-gray-200 dark:bg-gray-700 self-start'
            }`}
          >
            {msg.content}
            <div className="text-xs text-right mt-1 opacity-70">{msg.timestamp.toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 left-4 right-4 flex items-center">
        <input
          className="flex-1 p-2 rounded-l bg-gray-100 dark:bg-gray-800"
          placeholder="Напишіть повідомлення..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r">📨</button>
      </div>
    </div>
  );
};

export default ChatView;

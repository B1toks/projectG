'use client';

import React from 'react';
import { User } from '@/types/chat';

interface Props {
  users: User[];
  onSelectUser: (user: User) => void;
}

const ChatSidebar: React.FC<Props> = ({ users, onSelectUser }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 text-black dark:text-white">
      <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
        <h2 className="text-xl font-semibold">Повідомлення</h2>
        <input
          type="text"
          placeholder="Пошук..."
          className="mt-2 w-full px-3 py-2 rounded bg-gray-100 dark:bg-zinc-800 text-black dark:text-white"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="flex items-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{user.fullName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Lorem ipsum
              </p>
            </div>
            <span className="ml-auto text-xs text-gray-400">12:34</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;

'use client';

import React, { useState, useMemo } from 'react';
import { User } from '@/types/chat';

interface Props {
  users: User[];
  onBack: () => void;
  onSelectUser: (user: User) => void;
  recentUsers: User[]; 
}

const SearchComponent: React.FC<Props> = ({
  users,
  onBack,
  onSelectUser,
  recentUsers,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [users, searchQuery]
  );

  const handleUserClick = (user: User) => {
    onSelectUser(user);
  };

  const handleRecentUserClick = (user: User, e: React.MouseEvent) => {
    e.preventDefault();
    onSelectUser(user);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-xl text-gray-500 dark:text-gray-400"
          >
            ←
          </button>
          <h2 className="text-lg font-bold text-center flex-1">Пошук</h2>
        </div>

        <input
          type="text"
          placeholder="Введіть ім’я..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 mb-2 rounded bg-gray-100 dark:bg-zinc-800 text-black dark:text-white outline-none"
          autoFocus
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {recentUsers.length > 0 && searchQuery.length === 0 && (
          <div className="px-4 py-3 border-b border-gray-200 dark:border-zinc-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Недавні
            </h3>
            <div className="flex overflow-x-auto gap-4 pb-2">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={(e) => handleRecentUserClick(user, e)}
                  className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                  title={user.fullName}
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full mb-1"
                  />
                  <span className="text-xs text-center">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <ul className="p-4 space-y-2">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="flex items-center p-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-medium">{user.fullName}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;

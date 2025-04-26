'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { User, Message } from '@/types/chat';

interface Props {
  users: User[];
  onSelectUser: (user: User) => void;
  onSearchClick: () => void;
  onTogglePinChat: (userId: string) => void;
  messages: { [key: string]: Message[] };
  currentUserId: string;
  activeUsers: string[];
  recentUsers: User[];  
}

const ChatSidebar: React.FC<Props> = ({ 
  users, 
  onSelectUser, 
  onSearchClick, 
  onTogglePinChat,
  messages, 
  currentUserId,
  activeUsers,
  recentUsers
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [readStatus, setReadStatus] = useState<{[key: string]: number}>({});

  const filteredUsers = useMemo(() => 
    users.filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [users, searchQuery]
  );

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      const aMessages = messages[a.id] || [];
      const bMessages = messages[b.id] || [];
      
      const aLastMsg = aMessages.length > 0 ? aMessages[aMessages.length - 1].timestamp : new Date(0);
      const bLastMsg = bMessages.length > 0 ? bMessages[bMessages.length - 1].timestamp : new Date(0);
      
      return new Date(bLastMsg).getTime() - new Date(aLastMsg).getTime();
    });
  }, [users, messages]);

  const getLastMessage = (userId: string) => {
    const userMessages = messages[userId] || [];
    return userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;
  };

  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const unreadCounts: {[key: string]: number} = {};
    
    users.forEach(user => {
      const userMessages = messages[user.id] || [];
      const unreadCount = userMessages.filter(msg => 
        msg.senderId === user.id && msg.status !== 'read'
      ).length;
      
      unreadCounts[user.id] = unreadCount;
    });
    
    setReadStatus(unreadCounts);
  }, [messages, users]);

  const handleUserClick = (user: User) => {
    onSelectUser(user);
  };

  const isUserOnline = (userId: string) => {
    return activeUsers.includes(userId);
  };

  const handlePinToggle = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation(); 
    onTogglePinChat(userId);
  };

  const handleRecentUserClick = (user: User, e: React.MouseEvent) => {
    e.preventDefault();
    onSelectUser(user);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
    onSearchClick(); 
  };

  const renderUserItem = (user: User) => {
    const lastMessage = getLastMessage(user.id);
    const unreadCount = readStatus[user.id] || 0;
    const hasUnread = unreadCount > 0;
    
    return (
      <div
        key={user.id}
        onClick={() => handleUserClick(user)}
        className={`flex items-center p-4 cursor-pointer transition-colors duration-200 ${
          hasUnread 
            ? 'bg-orange-50 dark:bg-orange-900/20' 
            : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
        } ${user.isPinned ? 'border-l-4 border-blue-500' : ''}`}
      >
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-10 h-10 rounded-full mr-4"
          />
          {isUserOnline(user.id) && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <p className={`font-medium ${hasUnread ? 'font-bold' : ''}`}>{user.fullName}</p>
            <div className="flex items-center">
              <button
                onClick={(e) => handlePinToggle(e, user.id)}
                className={`mr-2 text-sm ${user.isPinned ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                title={user.isPinned ? "Відкріпити чат" : "Закріпити чат"}
              >
                📌
              </button>
              <span className="text-xs text-gray-400">
                {lastMessage ? formatTime(lastMessage.timestamp) : ''}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className={`text-sm ${hasUnread ? 'text-black dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'} truncate`}>
              {lastMessage ? (
                <>
                  {lastMessage.senderId === currentUserId ? 'Ви: ' : `${user.name}: `}
                  {lastMessage.content}
                  {lastMessage.senderId === currentUserId && (
                    <span className="ml-1 text-xs">
                      {lastMessage.status === 'sent' && '✓'}
                      {lastMessage.status === 'delivered' && '✓✓'}
                      {lastMessage.status === 'read' && (
                        <span className="text-blue-500">✓✓</span>
                      )}
                    </span>
                  )}
                </>
              ) : 'Немає повідомлень'}
            </p>
            {hasUnread && (
              <span className="ml-2 flex-shrink-0 w-5 h-5 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-900 text-black dark:text-white transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
        {isSearching ? (
          <div className="flex items-center mb-2">
            <button
              onClick={() => {
                setIsSearching(false);
                setSearchQuery('');
              }}
              className="text-xl mr-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
              title="Назад"
            >
              ←
            </button>
            <h2 className="text-lg font-semibold">Пошук</h2>
          </div>
        ) : (
          <div className="flex justify-center items-center mb-2">
            <h2 className="text-lg font-semibold">Повідомлення</h2>
          </div>
        )}

        <input
          type="text"
          placeholder="Пошук..."
          value={searchQuery}
          onFocus={handleSearchClick}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-zinc-800 text-black dark:text-white outline-none transition-all duration-200"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {isSearching && recentUsers.length > 0 && (
          <div className="flex overflow-x-auto p-4 gap-4 border-b border-gray-200 dark:border-zinc-700">
            {recentUsers.map((user) => (
              <div 
                key={user.id} 
                className="flex-shrink-0 text-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={(e) => handleRecentUserClick(user, e)}
              >
                <div className="relative">
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full mx-auto mb-1"
                  />
                  {isUserOnline(user.id) && (
                    <div className="absolute bottom-1 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                  )}
                  {readStatus[user.id] > 0 && (
                    <div className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center border border-white dark:border-zinc-900">
                      {readStatus[user.id] > 9 ? '9+' : readStatus[user.id]}
                    </div>
                  )}
                </div>
                <p className="text-xs truncate max-w-[60px]">{user.fullName.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        )}

        {isSearching ? (
          filteredUsers.map(renderUserItem)
        ) : (
          sortedUsers.map(renderUserItem)
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
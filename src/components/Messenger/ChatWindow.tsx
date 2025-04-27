'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, Message } from '@/types/chat';
import Image from 'next/image';
// Додаємо імпорти для роботи з датами
import { format, isToday, isYesterday, isSameDay } from 'date-fns';
import { uk } from 'date-fns/locale';

interface Props {
  currentUser: User;
  selectedUser: User;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onBack: () => void;
  isUserActive: boolean;
}

const ChatWindow: React.FC<Props> = ({
  currentUser,
  selectedUser,
  messages,
  onSendMessage,
  onDeleteMessage,
  onBack,
  isUserActive,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [longPressActive, setLongPressActive] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [messageWithDeleteButton, setMessageWithDeleteButton] = useState<string | null>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setIsContextMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onSendMessage(trimmedValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, messageId: string) => {
    e.preventDefault();
    
    const message = messages.find(msg => msg.id === messageId);
    if (message?.senderId !== currentUser.id) return;
    
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setSelectedMessageId(messageId);
    setIsContextMenuOpen(true);
  };

  const handleMouseDown = (e: React.MouseEvent, messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message?.senderId !== currentUser.id) return;
    
    const timer = setTimeout(() => {
      setLongPressActive(true);
      setMessageWithDeleteButton(messageId);
    }, 500); 
    
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setLongPressActive(false);
  };

  const handleMouseLeave = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setLongPressActive(false);
  };

  const handleTouchStart = (e: React.TouchEvent, messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message?.senderId !== currentUser.id) return;
    
    const timer = setTimeout(() => {
      setLongPressActive(true);
      setMessageWithDeleteButton(messageId);
    }, 500); 
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setLongPressActive(false);
  };

  const handleDeleteMessage = (messageId: string) => {
    onDeleteMessage(messageId);
    setIsContextMenuOpen(false);
    setMessageWithDeleteButton(null);
  };

  useEffect(() => {
    if (messageWithDeleteButton) {
      const timer = setTimeout(() => {
        setMessageWithDeleteButton(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [messageWithDeleteButton]);

  // Функція для форматування дати повідомлень
  const formatMessageDate = (date: Date) => {
    if (isToday(date)) {
      return 'Сьогодні';
    } else if (isYesterday(date)) {
      return 'Вчора';
    } else {
      return format(date, 'd MMMM yyyy', { locale: uk });
    }
  };

  // Функція для рендерингу повідомлень з розділювачами дат
  const renderMessagesWithDateSeparators = () => {
    if (messages.length === 0) {
      return (
        <div className="text-center text-zinc-500 dark:text-zinc-400 mt-10">
          Немає повідомлень. Почніть розмову!
        </div>
      );
    }

    let lastMessageDate: Date | null = null;
    
    return messages.map((message, index) => {
      const messageDate = new Date(message.timestamp);
      const isCurrentUser = message.senderId === currentUser.id;
      
      // Перевіряємо, чи потрібно показати дату
      let showDateSeparator = false;
      if (!lastMessageDate || !isSameDay(lastMessageDate, messageDate)) {
        showDateSeparator = true;
        lastMessageDate = messageDate;
      }
      
      return (
        <React.Fragment key={message.id}>
          {showDateSeparator && (
            <div className="flex justify-center my-4">
              <div className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-full text-xs text-zinc-600 dark:text-zinc-300">
                {formatMessageDate(messageDate)}
              </div>
            </div>
          )}
          
          <div 
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}
            onContextMenu={(e) => handleContextMenu(e, message.id)}
            onMouseDown={(e) => handleMouseDown(e, message.id)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={(e) => handleTouchStart(e, message.id)}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                isCurrentUser 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100'
              } ${
                longPressActive && selectedMessageId === message.id ? 'opacity-70' : ''
              } relative`}
            >
              <div className="break-words">
                {message.content}
                {isCurrentUser && messageWithDeleteButton === message.id && (
                  <button 
                    onClick={() => handleDeleteMessage(message.id)}
                    className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-red-500 rounded-full text-white text-xs"
                    aria-label="Видалити повідомлення"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="text-xs mt-1 flex justify-end gap-1">
                <span className={`${isCurrentUser ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {isCurrentUser && (
                  <span>
                    {message.status === 'sent' && '✓'}
                    {message.status === 'delivered' && '✓✓'}
                    {message.status === 'read' && '✓✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center p-4 bg-zinc-200 dark:bg-zinc-800 border-b border-zinc-300 dark:border-zinc-700">
        <button 
          onClick={onBack}
          className="mr-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          ←
        </button>
        <div className="relative">
          <Image 
            src={selectedUser.avatarUrl || '/default-avatar.png'} 
            alt={selectedUser.name} 
            width={40} 
            height={40} 
            className="rounded-full object-cover w-10 h-10" 
          />
          {isUserActive && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-800"></div>
          )}
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
            {selectedUser.fullName}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {isUserActive ? 'В мережі' : 'Не в мережі'}
          </p>
        </div>
      </div>

      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {renderMessagesWithDateSeparators()}
      </div>

      <form className="p-4 bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-300 dark:border-zinc-700" onSubmit={handleSubmit}>
        <div className="flex">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Напишіть повідомлення..."
            className="flex-1 p-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Відправити
          </button>
        </div>
      </form>

      {isContextMenuOpen && (
        <div
          ref={contextMenuRef}
          className="fixed bg-white dark:bg-zinc-800 shadow-lg rounded-md overflow-hidden z-50"
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
        >
          <ul>
            <li 
              className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-zinc-800 dark:text-zinc-100"
              onClick={() => handleDeleteMessage(selectedMessageId || '')}
            >
              Видалити повідомлення
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
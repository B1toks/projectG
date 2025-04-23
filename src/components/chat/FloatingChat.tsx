'use client';

import React, { useState } from 'react';
import ChatWindow from './ChatWindow'; // або з правильного шляху
import { User, Message } from '@/types/chat';

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUserId = '1'; // Твій поточний користувач

  const selectedUser = {
    id: '2',
    name: 'Марина',
    avatarUrl: '/avatars/user2.png',
    fullName: 'Марина Петрова',
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Math.random().toString(),
      senderId: currentUserId,
      content,
      timestamp: new Date(),
      status: 'sent',
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-900 shadow-lg rounded-lg w-80 p-2">
          <ChatWindow
            user={selectedUser}
            messages={messages}
            onSendMessage={handleSendMessage}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />

        </div>
      )}
    </div>
  );
};

export default FloatingChat;

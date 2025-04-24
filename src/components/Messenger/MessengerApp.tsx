'use client';

import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import FloatingButton from './FloatingButton';
import { User, Message } from '@/types/chat';


const dummyUsers: User[] = [
  { id: '1', name: 'Олександр',  avatarUrl: '/f1.jpg', fullName: 'Олександр Гончар' },
  { id: '2', name: 'Міша', avatarUrl: '/f1.jpg', fullName: 'Міша Ванін' },
];

const MessengerApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '1', // Поточний користувач
      content,
      timestamp: new Date(),
      status: 'sent',
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40">
          <div className="w-full sm:w-96 bg-zinc-900 text-white h-full transition-transform transform translate-x-0">
            <ChatSidebar users={dummyUsers} onSelectUser={setSelectedUser} />
            {selectedUser && (
              <ChatWindow
                user={selectedUser}
                messages={messages}
                onSendMessage={handleSendMessage}
                onClose={() => setIsOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MessengerApp;

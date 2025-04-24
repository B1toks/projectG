'use client';

import React, { useState } from 'react';
import { User, Message } from '@/types/chat';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

interface Props {
  user: User;
  messages: Message[];
  onClose: () => void;
  onSendMessage: (content: string) => void;
}

const ChatWindow: React.FC<Props> = ({ user, messages, onClose, onSendMessage }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-zinc-700">
        <div className="flex items-center space-x-3">
          <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
          <span>{user.fullName}</span>
        </div>
        <button onClick={onClose} className="text-sm text-red-400">
          Закрити
        </button>
      </div>

      <MessageList messages={messages} />

      <div className="p-3 border-t border-zinc-700">
        <MessageInput onSend={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;

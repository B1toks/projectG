'use client';

import React from 'react';
import { Input } from '@/components/ui/input';

const ChatHeader: React.FC = () => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <Input placeholder="Пошук користувачів..." />
    </div>
  );
};

export default ChatHeader;

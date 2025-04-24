'use client';

import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="flex items-center bg-gray-100 dark:bg-zinc-800 rounded-lg px-3 py-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Напишіть повідомлення..."
        className="flex-1 bg-transparent outline-none text-black dark:text-white"
      />
      <button
        onClick={handleSend}
        className="ml-2 text-blue-600 dark:text-blue-400 font-semibold"
      >
        Надіслати
      </button>
    </div>
  );
};

export default MessageInput;

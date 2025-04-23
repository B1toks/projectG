import React from 'react';
import { User, Message } from '@/types/chat';

interface Props {
  user: User;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<Props> = ({ user, messages, onSendMessage, isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <strong>{msg.senderId === user.id ? user.name : 'Ви'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem('message') as HTMLInputElement;
            if (input.value.trim()) {
              onSendMessage(input.value);
              input.value = '';
            }
          }}
        >
          <input
            name="message"
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Введіть повідомлення..."
          />
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;

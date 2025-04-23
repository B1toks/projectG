import React from 'react';
import { User } from '@/types/chat'; // Імпортуємо тип User

interface ChatSidebarProps {
  onUserSelect: (user: User) => void; // Визначаємо тип пропса onUserSelect
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onUserSelect }) => {
  const dummyUsers: User[] = [
    { id: '1', name: 'Олександр', avatarUrl: '/avatars/user1.png', fullName: 'Олександр Іванов' },
    { id: '2', name: 'Марина', avatarUrl: '/avatars/user2.png', fullName: 'Марина Петрова' },
    // Додайте інших користувачів
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {dummyUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          onClick={() => onUserSelect(user)} // Відправляємо користувача назад до батьківського компонента
        >
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.fullName}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;

import React from 'react';
import { User } from '@/types/chat';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ChatUserListProps {
  onUserSelect: (user: User) => void;
}

const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Олександр',
    avatarUrl: '/avatars/user1.png',
    fullName: 'Олександр Іванов',
  },
  {
    id: '2',
    name: 'Марина',
    avatarUrl: '/avatars/user2.png',
    fullName: 'Марина Петрова',
  },
  // адд інших користувачів
];

const ChatUserList: React.FC<ChatUserListProps> = ({ onUserSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {dummyUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          onClick={() => onUserSelect(user)}
        >
          <Avatar className="mr-4">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.fullName}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatUserList;

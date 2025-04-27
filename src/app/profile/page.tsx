export default function Profile() {
  return <h1>Панель Profile</h1>;
}

// 'use client';

// import React, { useState } from 'react';
// import ProfileForm from '@/components/ProfileForm';
// import ChatSidebar from '@/components/chat/ChatSidebar';
// import ChatWindow from '@/components/chat/ChatWindow';
// import { User, Message } from '@/types/chat';
// import FloatingChat from '@/components/chat/FloatingChat';

// const dummyUsers: User[] = [
//   { id: '1', name: 'Олександр', avatarUrl: '/avatars/user1.png', fullName: 'Олександр Іванов' },
//   { id: '2', name: 'Марина', avatarUrl: '/avatars/user2.png', fullName: 'Марина Петрова' },
// ];


// const ProfilePage: React.FC = () => {
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { id: '1', senderId: '1', content: 'Привіт!', timestamp: new Date(), status: 'sent' },
//     { id: '2', senderId: '2', content: 'Привіт, як справи?', timestamp: new Date(), status: 'sent' },
//   ]);

//   const handleUserSelect = (user: User) => {
//     setSelectedUser(user);
//     setChatOpen(true);
//   };
  
//   const handleSendMessage = (messageText: string) => {
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       senderId: '1', // Твій ID
//       content: messageText,
//       timestamp: new Date(),
//       status: 'sent',
//     };
//     setMessages((prev) => [...prev, newMessage]);
//   };

//   return (
//     <div className="flex">
//       {/* Сайдбар чату */}
//       <div className="w-1/4">
//         <ChatSidebar onUserSelect={handleUserSelect} />
//       </div>

//       <div className="flex-1 p-6">
//         {/* Вміст профілю */}
//         <h1 className="text-2xl font-bold mb-4">Налаштування профілю</h1>
//         <ProfileForm />
//         <FloatingChat />

//         {selectedUser && (
//           <ChatWindow
//             user={selectedUser}
//             messages={messages}
//             onSendMessage={handleSendMessage}
//             isOpen={chatOpen}
//             onClose={() => {
//               setChatOpen(false);
//               setSelectedUser(null);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

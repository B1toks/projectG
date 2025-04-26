// 'use client';

// import { useDispatch } from 'react-redux';
// import { setSelectedUser } from '@/store/chatSlice';
// import { User } from '@/types/chat';

// // const dummyUsers: User[] = [
// //     {
// //       id: '1',
// //       name: 'Олександр',
// //       avatarUrl: '/f1.jpg',
// //       fullName: 'Олександр Гончар',
// //     },
// //     {
// //       id: '2',
// //       name: 'Міша',
// //       avatarUrl: '/f1.jpg',
// //       fullName: 'Міша Ванін',
// //     }
// //   ];
  
// const UserList = () => {
//   const dispatch = useDispatch();

//   const handleUserClick = (user: User) => {
//     dispatch(setSelectedUser(user));
//   };

//   return (
//     <div className="border-b border-zinc-300 dark:border-zinc-700 p-2 bg-zinc-100 dark:bg-zinc-800">
//       <h2 className="text-sm font-bold text-zinc-700 dark:text-zinc-200 mb-2">Доступні користувачі</h2>
//       <ul className="space-y-1">
//         {dummyUsers.map((user) => (
//           <li
//             key={user.id}
//             className="cursor-pointer px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm"
//             onClick={() => handleUserClick(user)}
//           >
//             {user.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

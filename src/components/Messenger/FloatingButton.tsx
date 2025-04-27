'use client';

interface FloatingButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

export default function FloatingButton({ onClick, unreadCount = 0 }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-40 bg-zinc-900 dark:bg-white text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
    >
      <span className="text-xl">💬</span>
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
}
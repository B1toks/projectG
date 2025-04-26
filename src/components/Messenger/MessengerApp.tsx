'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import FloatingButton from './FloatingButton';
import SearchComponent from './SearchComponent';
import { User, Message } from '@/types/chat';
import { useWebSocket } from '@/lib/useWebSocket';

const dummyUsers: User[] = [
  { id: '1', name: 'Олександр', avatarUrl: '/f1.jpg', fullName: 'Олександр Гончар', isPinned: false },
  { id: '2', name: 'Міша', avatarUrl: '/f1.jpg', fullName: 'Міша Ванін', isPinned: false },
];

const MessengerApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [viewMode, setViewMode] = useState<'chats' | 'search' | 'dialog'>('chats');
  const { connect, sendMessage, receiveMessage } = useWebSocket();
  const [animationClass, setAnimationClass] = useState('animate-slide-in');
  const [closingAnimation, setClosingAnimation] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);
  const [activeUserIds, setActiveUserIds] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('1');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pinnedChats, setPinnedChats] = useState<string[]>([]);
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);
  const [lastStatusUpdate, setLastStatusUpdate] = useState<number>(0);
  const [recentContacts, setRecentContacts] = useState<string[]>([]);

  const updateRecentContacts = useCallback((userId: string) => {
    setRecentContacts(prev => {
      const filtered = prev.filter(id => id !== userId);
      return [userId, ...filtered].slice(0, 5); 
    });
  }, []);

  useEffect(() => {
    const getUserId = () => {
      const userId = prompt('Enter your user ID (1 or 2):', '1');
      if (userId === '1' || userId === '2') {
        return userId;
      }
      alert('Невірний ID, буде використано 1 за замовчуванням.');
      return '1';
    };

    const userId = getUserId();
    setCurrentUserId(userId);
    const user = dummyUsers.find(u => u.id === userId) || null;
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsUserActive(document.visibilityState === 'visible');
    };
    
    const handleFocus = () => {
      setIsUserActive(true);
    };
    
    const handleBlur = () => {
      setIsUserActive(false);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const sendStatusUpdate = () => {
      const now = Date.now();
      if (now - lastStatusUpdate > 5000) { 
        const statusMessage = {
          id: `status-${now}`,
          senderId: currentUserId,
          receiverId: 'broadcast',
          content: 'status_update',
          timestamp: new Date(),
          status: 'sent' as const,
          metadata: { isActive: isUserActive }
        };
        
        sendMessage(statusMessage);
        setLastStatusUpdate(now);
      }
    };

    sendStatusUpdate();
    
    const intervalId = setInterval(() => {
      sendStatusUpdate();
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, [currentUser, currentUserId, isUserActive, lastStatusUpdate, sendMessage]);

  useEffect(() => {
    let count = 0;
    
    Object.keys(messages).forEach(userId => {
      const userMessages = messages[userId] || [];
      count += userMessages.filter(msg => 
        msg.senderId !== currentUserId && msg.status !== 'read'
      ).length;
    });
    
    setTotalUnreadCount(count);
  }, [messages, currentUserId]);

  const handleReceiveMessage = useCallback((message: Message) => {
    const { senderId, receiverId, content, metadata } = message;

    if (content === 'status_update' && metadata) {
      setActiveUserIds(prev => {
        const isActive = metadata.isActive;
        
        if (isActive && !prev.includes(senderId)) {
          return [...prev, senderId];
        } else if (!isActive) {
          return prev.filter(id => id !== senderId);
        }
        
        return prev;
      });
      return; 
    }

    if (content === 'read_receipt' && metadata?.messageId) {
      if (senderId !== currentUserId) {
        const messageId = metadata.messageId;
        const chatPartnerId = senderId;
        
        setMessages(prev => {
          const userMessages = [...(prev[chatPartnerId] || [])];
          const updatedMessages = userMessages.map(msg => {
            if (msg.id === messageId) {
              return { ...msg, status: 'read' as const };
            }
            return msg;
          });
          
          return {
            ...prev,
            [chatPartnerId]: updatedMessages
          };
        });
      }
      return;
    }

    if (content === 'delete_message' && metadata?.messageId) {
      const messageId = metadata.messageId;
      const chatPartnerId = senderId;
      
      setMessages(prev => {
        const userMessages = [...(prev[chatPartnerId] || [])];
        const updatedMessages = userMessages.filter(msg => msg.id !== messageId);
        
        return {
          ...prev,
          [chatPartnerId]: updatedMessages
        };
      });
      return;
    }

    if (senderId === currentUserId) return;

    if (receiverId === currentUserId) {
      const chatPartnerId = senderId;
      
      const deliveredMessage: Message = {
        ...message,
        status: 'delivered'
      };
      
      setMessages(prev => {
        const userMessages = prev[chatPartnerId] || [];
        return {
          ...prev,
          [chatPartnerId]: [...userMessages, deliveredMessage],
        };
      });
      
      updateRecentContacts(senderId);
    }
  }, [currentUserId, updateRecentContacts]);

  useEffect(() => {
    if (!selectedUser || !isUserActive) return;
    
    const userMessages = messages[selectedUser.id] || [];
    
    const unreadMessages = userMessages.filter(msg => 
      msg.senderId === selectedUser.id && msg.status !== 'read'
    );
    
    if (unreadMessages.length === 0) return;
    
    const sendReadReceipts = () => {
      const currentUserMessages = messages[selectedUser.id] || [];
      const currentUnread = currentUserMessages.filter(msg => 
        msg.senderId === selectedUser.id && msg.status !== 'read'
      );
      
      if (currentUnread.length === 0) return;
      
      setMessages(prev => {
        const updatedMessages = currentUserMessages.map(msg => {
          if (msg.senderId === selectedUser.id && msg.status !== 'read') {
            sendMessage({
              id: `read-${msg.id}`,
              senderId: currentUserId,
              receiverId: selectedUser.id,
              content: 'read_receipt',
              timestamp: new Date(),
              status: 'sent' as const,
              metadata: { messageId: msg.id }
            });
            
            return { ...msg, status: 'read' as const };
          }
          return msg;
        });
        
        return {
          ...prev,
          [selectedUser.id]: updatedMessages
        };
      });
    };
    
    const timeoutId = setTimeout(sendReadReceipts, 500);
    return () => clearTimeout(timeoutId);
  }, [selectedUser?.id, isUserActive, messages, currentUserId, sendMessage]);

  useEffect(() => {
    connect();
    
    const cleanupFn = receiveMessage(handleReceiveMessage);
    
    return () => {
      if (typeof cleanupFn === 'function') {
        cleanupFn();
      }
    };
  }, [connect, receiveMessage, handleReceiveMessage]);

  const handleSendMessage = useCallback((content: string) => {
    if (!selectedUser) return;

    const newMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      senderId: currentUserId,
      receiverId: selectedUser.id,
      content,
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages((prev) => {
      const userMessages = prev[selectedUser.id] || [];
      return {
        ...prev,
        [selectedUser.id]: [...userMessages, newMessage],
      };
    });

    sendMessage(newMessage);
    
    updateRecentContacts(selectedUser.id);
  }, [selectedUser, sendMessage, currentUserId, updateRecentContacts]);

  const handleDeleteMessage = useCallback((messageId: string) => {
    if (!selectedUser) return;
    
    const messageToDelete = messages[selectedUser.id]?.find(msg => msg.id === messageId);
    if (!messageToDelete) return;
    
    if (messageToDelete.senderId !== currentUserId) return;
    
    setMessages(prev => {
      const userMessages = [...(prev[selectedUser.id] || [])];
      const updatedMessages = userMessages.filter(msg => msg.id !== messageId);
      
      return {
        ...prev,
        [selectedUser.id]: updatedMessages
      };
    });
    
    sendMessage({
      id: `delete-${messageId}`,
      senderId: currentUserId,
      receiverId: selectedUser.id,
      content: 'delete_message',
      timestamp: new Date(),
      status: 'sent',
      metadata: { messageId }
    });
  }, [currentUserId, messages, selectedUser, sendMessage]);

  const closeMessenger = useCallback(() => {
    setClosingAnimation(true);
    setAnimationClass('animate-slide-out animate-fade-out');
    
    setTimeout(() => {
      setIsOpen(false);
      setAnimationClass('animate-slide-in');
      setClosingAnimation(false);
    }, 300);  
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'messenger-overlay') {
      closeMessenger();
    }
  }, [closeMessenger]);

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
    setViewMode('dialog');
    
    updateRecentContacts(user.id);
  }, [updateRecentContacts]);

  const handleBackToChats = useCallback(() => {
    setViewMode('chats');
    setSelectedUser(null);
  }, []);

  const handleTogglePinChat = useCallback((userId: string) => {
    setPinnedChats(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  }, []);

  const filteredUsers = useMemo(() => 
    dummyUsers.filter((u) => u.id !== currentUserId),
    [currentUserId]
  );

  const usersWithPinStatus = useMemo(() => 
    filteredUsers.map(user => ({
      ...user,
      isPinned: pinnedChats.includes(user.id)
    })),
    [filteredUsers, pinnedChats]
  );

  const recentUsers = useMemo(() => {
    return recentContacts
      .map(id => usersWithPinStatus.find(user => user.id === id))
      .filter((user): user is User => user !== undefined);
  }, [recentContacts, usersWithPinStatus]);

  if (!currentUser && isOpen) {
    return (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
          <p className="text-center">Завантаження...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)} unreadCount={totalUnreadCount} />
      {isOpen && (
        <div
          id="messenger-overlay"
          className="fixed inset-0 bg-black/40 flex justify-end z-50"
          onClick={handleOverlayClick}
        >
          <div
            className={`relative w-full sm:w-[400px] max-w-[500px] bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white h-full transition-all duration-300 transform ${animationClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {viewMode !== 'dialog' && (
              <button
                onClick={closeMessenger}
                className="absolute top-4 right-4 text-xl font-bold z-10"
              >
                ×
              </button>
            )}
            
            <div className="h-full">
              {viewMode === 'search' && !closingAnimation && (
                <div className="h-full animate-fade-in">
                  <SearchComponent 
                    users={usersWithPinStatus}
                    onBack={handleBackToChats} 
                    onSelectUser={handleSelectUser} 
                    recentUsers={recentUsers as User[]} 
                  />
                </div>
              )}
              
              {viewMode === 'chats' && !closingAnimation && (
                <div className="h-full animate-fade-in">
                  <ChatSidebar
                    users={usersWithPinStatus as User[]}
                    onSelectUser={handleSelectUser}
                    onSearchClick={() => setViewMode('search')}
                    onTogglePinChat={handleTogglePinChat}
                    messages={messages}
                    currentUserId={currentUserId}
                    activeUsers={activeUserIds}
                    recentUsers={[]} 
                  />
                </div>
              )}
              
              {viewMode === 'dialog' && selectedUser && currentUser && !closingAnimation && (
                <div className="h-full animate-fade-in">
                  <ChatWindow
                    currentUser={currentUser}
                    selectedUser={selectedUser}
                    messages={messages[selectedUser.id] || []}
                    onSendMessage={handleSendMessage}
                    onBack={handleBackToChats}
                    isUserActive={activeUserIds.includes(selectedUser.id)}
                    onDeleteMessage={handleDeleteMessage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessengerApp;
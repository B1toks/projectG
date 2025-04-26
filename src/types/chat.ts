export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  fullName: string;
  isPinned: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  metadata?: {
    messageId?: string;
    isActive?: boolean;
    deleted?: boolean;
    [key: string]: any;
  };
}
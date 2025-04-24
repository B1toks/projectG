export interface User {
    id: string;
    name: string;
    avatarUrl: string;
    fullName: string;
  }
  
  export type Message = {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
  };

  
import { useState, useCallback } from 'react';
import { Message } from '@/types/chat';  

const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => console.log('WebSocket connected');
    ws.onclose = () => console.log('WebSocket disconnected');
    setSocket(ws);
  }, []);

  const sendMessage = (message: Message) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  const receiveMessage = useCallback((callback: (message: Message) => void) => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        callback(message);
      };
    }
  }, [socket]);

  return { connect, sendMessage, receiveMessage };
};

export { useWebSocket };

import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';

type CallbackFn = (message: Message) => void;

export const useWebSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const messageCallback = useRef<CallbackFn | null>(null);

  const connect = () => {
    if (socketRef.current) return; 

    const ws = new WebSocket('ws://localhost:8080');
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.onclose = () => {
      console.log('❌ WebSocket disconnected');
      socketRef.current = null;

    };

    ws.onmessage = async (event) => {
      try {
        const data = event.data;
        const json = typeof data === 'string'
          ? JSON.parse(data)
          : JSON.parse(await data.text());

        if (messageCallback.current) {
          messageCallback.current(json);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  };

  const sendMessage = (message: Message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('⛔ WebSocket is not open');
    }
  };

  const receiveMessage = (callback: CallbackFn) => {
    messageCallback.current = callback;
    
    return () => {
      messageCallback.current = null;
    };
  };

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { connect, sendMessage, receiveMessage };
};
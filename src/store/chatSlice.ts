import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Message } from '@/types/chat';

interface ChatState {
  selectedUser: User | null;
  messages: Message[];
}

const initialState: ChatState = {
  selectedUser: null,
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
  },
});

export const { setSelectedUser, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;

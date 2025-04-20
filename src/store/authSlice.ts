import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "@/types";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  role: Role | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ username: string; role: Role }>
    ) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

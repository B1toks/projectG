import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarEvent } from "@/types";

type CalendarState = {
  events: CalendarEvent[];
};

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<CalendarEvent[]>) {
      state.events = action.payload;
    },
    addEvent(state, action: PayloadAction<CalendarEvent>) {
      state.events.push(action.payload);
    },
  },
});

export const { setEvents, addEvent } = calendarSlice.actions;
export default calendarSlice.reducer;

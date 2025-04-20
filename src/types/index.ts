export type Role = "admin" | "teacher" | "student";

export interface User {
  username: string;
  password: string;
  role: Role;
}
  
  export type CalendarEvent = {
    id: string;
    title: string;
    date: string;
    type: "lesson" | "assignment" | "exam";
  };
  
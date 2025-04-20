import { Role } from "@/types";

export const USERS: Record<string, { password: string; role: Role }> = {
  admin: { password: "admin", role: "admin" },
  teacher: { password: "teacher", role: "teacher" },
  student: { password: "student", role: "student" },
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  CALENDAR: "/calendar",
  PROFILE: "/profile",
};

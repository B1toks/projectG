"use client";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const roleRoutes: Record<string, string> = {
  admin: "/role/admin",
  teacher: "/role/teacher",
  student: "/role/student",
};

export default function DashboardRedirect() {
  const auth = useAppSelector((state) => state.auth);
  const role = auth?.role || '';
  const isAuthenticated = auth?.isAuthenticated || false;
  
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isAuthenticated) {
        router.push("/login"); 
        return;
      }

      if (role && roleRoutes[role]) {
        router.push(roleRoutes[role]);
      } else {
        router.push("/register");
      }
    }
  }, [role, isAuthenticated, router]);

  return <p>Redirecting...</p>;
}
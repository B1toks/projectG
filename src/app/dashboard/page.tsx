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
  const { role, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); 
      return;
    }

    if (!role) {
      return; 
    }

    const destination = roleRoutes[role] || "/register";
    router.push(destination);
  }, [role, isAuthenticated, router]);

  return <p>Redirecting...</p>;
}

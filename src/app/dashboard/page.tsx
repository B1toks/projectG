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
  const { role } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!role) return;

    const destination = roleRoutes[role] || "/register";
    router.push(destination);
  }, [role, router]);

  return <p>Redirecting...</p>;
}

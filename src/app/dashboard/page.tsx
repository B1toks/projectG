"use client";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const { role } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (role === "admin") router.push("/role/admin");
    else if (role === "teacher") router.push("/role/teacher");
    else if (role === "student") router.push("/role/student");
    else router.push("/register"); // якщо ще не залогінився (negadyai)
  }, [role]);

  return <p>Redirecting...</p>;
}

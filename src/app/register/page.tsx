"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/authSlice";
import { USERS } from "@/lib/constants";
import "../globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorTrigger, setErrorTrigger] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      setUsername(rememberedUser);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorTrigger]);

  const handleLogin = () => {
    const user = USERS[username as keyof typeof USERS];
    if (user && user.password === password) {
      dispatch(login({ username, role: user.role }));
      if (rememberMe) {
        localStorage.setItem("rememberedUser", username);
      } else {
        localStorage.removeItem("rememberedUser");
      }
      router.push(`/role/${user.role}`);
    } else {
      setError("Невірне ім’я користувача або пароль.");
      setErrorTrigger((prev) => prev + 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-zinc-900 px-4">
      {error && <ErrorMessage message={error} trigger={errorTrigger} />}

      <Card className="w-full max-w-md p-6 bg-white dark:bg-zinc-900 shadow-lg rounded-xl">
        <CardHeader>
          <h2 className="text-center text-2xl font-semibold">Вхід</h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Ім’я користувача</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ваш логін"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ваш пароль"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
            />
            <Label htmlFor="remember">Запам'ятати мене</Label>
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={handleLogin} className="w-full">
            Увійти
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

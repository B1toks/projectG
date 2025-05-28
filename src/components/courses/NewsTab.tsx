"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Role } from "@/types";

const user: { role: Role } = {
  role: "student", //  'student'  'teacher'
};

const NewsTab = () => {
  const isTeacher = user.role === "teacher";

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 dark:bg-zinc-900">
      <div className="lg:col-span-2 space-y-4">
        {isTeacher && (
          <Card>
            <CardHeader>
              <Textarea placeholder="Створити тред..." />
              <div className="flex justify-between items-center pt-2">
                <Switch />
                <Button>Надіслати</Button>
              </div>
            </CardHeader>
          </Card>
        )}

        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Перенесення лекції</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.png" />
                  <AvatarFallback>ОВ</AvatarFallback>
                </Avatar>
                Вакуленко Ольга Вікторівна • 6 годин тому
              </div>
              <p className="mt-2 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <Avatar className="w-20 h-20 mx-auto">
              <AvatarImage src="/placeholder.png" />
              <AvatarFallback>ОВ</AvatarFallback>
            </Avatar>
            <div className="mt-2 font-semibold">Вакуленко О. В.</div>
            <div className="flex justify-center gap-2 mt-2">
              <Button size="icon" variant="outline" className="rounded-full w-8 h-8">🔗</Button>
              <Button size="icon" variant="outline" className="rounded-full w-8 h-8">📧</Button>
              <Button size="icon" variant="outline" className="rounded-full w-8 h-8">💬</Button>
            </div>
            <Button className="w-full mt-4">Повідомлення</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Консультації</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>
              <strong>Очні:</strong><br />Кожна пʼятниця 13:30–15:10, аудиторія КП219
            </div>
            <div>
              <strong>Онлайн:</strong><br />Кожна середа 18:00–19:00
            </div>
            <Button variant="link" className="p-0 h-auto text-sm">Посилання</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsTab;

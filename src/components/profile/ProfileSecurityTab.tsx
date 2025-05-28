import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProfileSecurityTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border dark:border-zinc-700 p-4">
        <h2 className="font-semibold mb-4 dark:text-white">Змінити пароль</h2>

        <div className="space-y-2">
          <Input type="password" placeholder="Поточний пароль" />
          <Input type="password" placeholder="Новий пароль" />
          <Input type="password" placeholder="Підтвердити новий пароль" />
        </div>

        <ul className="text-sm mt-2 list-disc list-inside text-muted-foreground">
          <li>Пароль має містити: великі/малі літери</li>
          <li>Щонайменше 1 символ</li>
          <li>Тривалість 8+ символів</li>
        </ul>
      </div>

      <div className="rounded-lg border dark:border-zinc-700 p-4">
        <h2 className="font-semibold mb-4 dark:text-white">2-етапна аутентифікація</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg dark:border-zinc-700">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-400 rounded-full" />
              <div>
                <div className="font-medium dark:text-white">Google</div>
                <div className="text-sm text-muted-foreground">fr0gg0cat1@gmail.com</div>
              </div>
            </div>
            <Button variant="ghost">Відключити</Button>
          </div>

          <div className="flex justify-between items-center p-4 border rounded-lg dark:border-zinc-700">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-400 rounded-full" />
              <div>
                <div className="font-medium dark:text-white">Google</div>
                <div className="text-sm text-muted-foreground">fr0gg0cat1@gmail.com</div>
              </div>
            </div>
            <Button>Підключити</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ProfileSettingsTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border dark:border-zinc-700 p-4">
        <h2 className="font-semibold mb-4 dark:text-white">Персональна інформація</h2>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-zinc-400" />
          <div className="flex gap-2">
            <Button variant="default">Змінити фото</Button>
            <Button variant="secondary">Видалити</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input placeholder="User Name" />
          <Input placeholder="Прізвище" />
          <Input placeholder="Email" disabled />
          <Input placeholder="Номер телефону" disabled />
        </div>
      </div>

      <div className="rounded-lg border dark:border-zinc-700 p-4">
        <h2 className="font-semibold mb-4 dark:text-white">Налаштування теми</h2>
        <RadioGroup defaultValue="system" className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <RadioGroupItem value="system" id="system" />
            <label htmlFor="system">Системна</label>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RadioGroupItem value="light" id="light" />
            <label htmlFor="light">Світла</label>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RadioGroupItem value="dark" id="dark" />
            <label htmlFor="dark">Темна</label>
          </div>
        </RadioGroup>
      </div>

      <div className="rounded-lg border dark:border-zinc-700 p-4">
        <h2 className="font-semibold mb-4 dark:text-white">Налаштування сповіщень</h2>
        <div className="space-y-2">
          {["Про новини та зміни в розкладі", "Про початок надсилання завдань", "Про перевірку завдань", "Про появу нових завдань", "Про повідомлення від викладача"].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span>{item}</span>
              <input type="checkbox" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

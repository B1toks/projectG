import ScheduleCalendar from "@/components/ScheduleCalendar";


export default function AdminPage() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Робочий календар</h1>
        <h1>Панель Адміністратора</h1>
        <ScheduleCalendar />

      </div>
    
    );
  }
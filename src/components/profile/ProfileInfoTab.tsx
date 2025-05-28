export function ProfileInfoTab() {
  return (
    <div className="space-y-6 w-full">
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-zinc-400 shrink-0" />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold dark:text-white">Монько Софія Леонідівна</h2>
            <p className="text-sm text-muted-foreground">Студентка групи ЦД-21</p>
            <p className="text-sm text-muted-foreground">fr0gg0cat1@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 bg-white dark:bg-zinc-900 shadow-sm">
        <h3 className="text-md font-semibold mb-4 dark:text-white">Персональні дані</h3>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-muted-foreground mb-1">Ім’я</div>
            <div className="text-white">Софія</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Прізвище</div>
            <div className="text-white">Монько</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">По батькові</div>
            <div className="text-white">Леонідівна</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Email</div>
            <div className="text-white">fr0gg0cat1@gmail.com</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Номер телефону</div>
            <div className="text-white">+ (380) 93 109 18 03</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Спеціальність</div>
            <div className="text-white">022 Дизайн</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Група</div>
            <div className="text-white">ЦД-21</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Зареєстрована з</div>
            <div className="text-white">11 вересня 2020 року</div>
          </div>
        </div>
      </div>
    </div>
  )
}

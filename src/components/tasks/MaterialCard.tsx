import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function MaterialCard({ type, name }: { type: "file" | "video"; name: string }) {
  return (
    <Card className="bg-zinc-100 dark:bg-zinc-800">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <div className="text-sm text-muted-foreground">{type === "file" ? "Файл" : "Відео"}</div>
          <div className="font-medium">{name}</div>
        </div>
        <Button size="sm" variant="outline">
          {type === "file" ? "Завантажити" : "Переглянути"}
        </Button>
      </CardContent>
    </Card>
  )
}

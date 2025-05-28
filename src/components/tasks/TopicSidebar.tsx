import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const topics = [
  "Тема 1: Назва",
  "Тема 2: Назва",
  "Тема 3: Назва",
  "Тема 4: Назва",
  "Тема 5: Назва",
  "Тема 6: Назва",
  "Тема 7: Назва",
  "Тема 8: Назва",
  "Тема 9: Назва",
  "Тема 10: Назва",
  "Тема 11: Назва",
]

export function TopicSidebar({ selected, onSelect }: { selected: string; onSelect: (topic: string) => void }) {
  return (
    <Card className="w-64 p-2">
      <ScrollArea className="h-full">
        <div className="space-y-2">
          {topics.map((topic, idx) => (
            <Button
              key={idx}
              variant={selected === topic ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelect(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
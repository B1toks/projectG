'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const dummyNews = [
  {
    author: "Андрій Сергійович Гордєнко",
    date: "25 травня 2025",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor...",
    image: null,
  },
  {
    author: "Андрій Сергійович Гордєнко",
    date: "24 травня 2025",
    text: "Aenean massa. Cum sociis natoque penatibus...",
    image: "/placeholder-image.jpg",
  },
]

export default function NewsPage() {
  return (
    <div className="px-6 py-6 space-y-4">
      <h2 className="text-2xl font-semibold">Новини</h2>

      {dummyNews.map((news, idx) => (
        <Card key={idx}>
          <CardHeader className="flex flex-row items-start gap-4">
            <Avatar>
              <AvatarImage src="/avatar.png" alt={news.author} />
              <AvatarFallback>{news.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{news.author}</p>
              <p className="text-xs text-muted-foreground">{news.date}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>{news.text}</p>
            {news.image && (
              <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Фото</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

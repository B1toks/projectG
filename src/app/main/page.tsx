'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import ScheduleCalendar from '@/components/ScheduleCalendar'
import PageWrapper from "@/components/PageWrapper";

function getTimeLeft(endDate: Date) {
  const now = new Date()
  const totalSeconds = Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / 1000))
  const totalDuration = Math.floor((endDate.getTime() - new Date('2024-09-01').getTime()) / 1000)

  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, totalSeconds, totalDuration }
}

export default function MainPage() {
  const semesterEnd = new Date('2025-06-30T00:00:00')
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(semesterEnd))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(semesterEnd))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const progress = 1 - timeLeft.totalSeconds / timeLeft.totalDuration

  return (
    <PageWrapper>
      <div className="flex flex-col p-6 gap-6 bg-background">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3 bg-zinc-100 dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="text-lg">До кінця семестру</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center relative h-32 w-full">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#e4e4e7"
                  strokeWidth="10"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="10"
                  strokeDasharray="126"
                  strokeDashoffset={126 * (1 - progress)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute pt-10 inset-0 flex flex-col justify-center items-center -mt-4">
                <div className="text-2xl font-bold">{timeLeft.days} днів</div>
                <div className="text-muted-foreground text-sm">
                  {timeLeft.hours}г {timeLeft.minutes}хв {timeLeft.seconds}с
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:w-2/3 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-zinc-100 dark:bg-zinc-900 justify-center">
              <CardHeader className="flex flex-row justify-between items-center ">
                
                <CardTitle className="text-lg">Мої курси</CardTitle>
                <Link href="/courses">
                  
                  <Button variant="outline" className="text-sm">
                    Переглянути <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Переглянь свої активні курси
              </CardContent>
            </Card>

            <Card className="bg-zinc-100 dark:bg-zinc-900">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-lg">Невиконані завдання</CardTitle>
                <Link href="/tasks">
                  <Button variant="outline" className="text-sm">
                    Переглянути <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Перевір, що ще залишилось зробити
              </CardContent>
            </Card>
          </div>
          <Card className="bg-zinc-100 dark:bg-zinc-900">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-lg">Кисленко В.В.</CardTitle>
              <Link href="/news">
                <Button variant="outline" className="text-sm">
                  Переглянути <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Цього тижня (26 травня – 1 червня) в коледжі буде відбуватись...
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="bg-zinc-100 dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-lg">Календар</CardTitle>
        </CardHeader>
        <CardContent>
          <ScheduleCalendar />
        </CardContent>
      </Card>
    </div>
    </PageWrapper>
    
  )
}

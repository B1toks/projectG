"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event as CalendarEvent,
  View,
} from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addWeeks,
  subWeeks,
  isAfter,
} from "date-fns";
import { uk } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import lessons from "@/data/lessons.json";

const locales = { uk };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

type ColoredEvent = CalendarEvent & {
  color?: string;
};

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<ColoredEvent[]>([]);
  const [defaultView, setDefaultView] = useState<View>("week");
  const [currentView, setCurrentView] = useState<View>("week");
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const newView: View = isMobile ? "day" : "week";
      setDefaultView(newView);
      setCurrentView(newView);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Loading lessons...");

    const parsedEvents: ColoredEvent[] = lessons
      .filter((event: any) => {
        const hasAllFields = event.title && event.start && event.end;
        const start = new Date(event.start);
        const end = new Date(event.end);

        console.log("Event:", event);
        console.log("Parsed start:", start);
        console.log("Parsed end:", end);

        return hasAllFields && isAfter(end, start);
      })
      .map((event: any) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

    console.log("Parsed events:", parsedEvents);
    setEvents(parsedEvents);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.querySelector(".rbc-allday-cell");
      if (el) el.remove();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[calc(100vh-100px)] p-4">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <Button onClick={() => setDate(new Date())}>Сьогодні</Button>
        <div className="flex gap-2">
          <Button onClick={() => setDate((prev) => subWeeks(prev, 1))}>
            Назад
          </Button>
          <Button onClick={() => setDate((prev) => addWeeks(prev, 1))}>
            Вперед
          </Button>
        </div>
      </div>
      <div className="h-full overflow-x-auto">
        <Calendar
          toolbar={true}
          ref={calendarRef}
          localizer={localizer}
          events={events}
          defaultView={defaultView}
          view={currentView}
          onView={(view) => setCurrentView(view)}
          views={["day", "week"]}
          step={30}
          timeslots={2}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          style={{ height: "100%" }}
          scrollToTime={new Date(1970, 1, 1, 8, 0, 0)}
          min={new Date(1970, 1, 1, 8, 0, 0)}
          max={new Date(1970, 1, 1, 19, 0, 0)}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color || "#2563eb",
              borderRadius: "6px",
              color: "white",
              border: "none",
              display: "block",
              padding: "2px 4px",
            },
          })}
          className="border border-border rounded-md"
        />
      </div>
    </div>
  );
}

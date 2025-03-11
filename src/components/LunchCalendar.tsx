import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format, isSameDay, addMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Users, Utensils } from "lucide-react";

interface LunchEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  capacity: number;
  registered: number;
  menu?: string;
  description: string;
}

interface LunchCalendarProps {
  events?: LunchEvent[];
  onEventSelect?: (event: LunchEvent) => void;
  month?: Date;
  onMonthChange?: (date: Date) => void;
}

const LunchCalendar = ({
  events = [
    {
      id: "1",
      title: "Italian Pasta Day",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: "12:30",
      capacity: 30,
      registered: 18,
      menu: "Spaghetti Carbonara, Garlic Bread, Tiramisu",
      description:
        "Authentic Italian pasta dishes prepared by our guest chef from Milan.",
    },
    {
      id: "2",
      title: "Taco Tuesday",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: "12:00",
      capacity: 40,
      registered: 40,
      menu: "Beef Tacos, Chicken Quesadillas, Churros",
      description:
        "Mexican fiesta with a variety of tacos and traditional sides.",
    },
    {
      id: "3",
      title: "Sushi Experience",
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      time: "12:15",
      capacity: 25,
      registered: 12,
      menu: "California Rolls, Nigiri, Miso Soup",
      description: "Fresh sushi prepared by our skilled sushi chefs.",
    },
    {
      id: "4",
      title: "Vegetarian Delight",
      date: new Date(new Date().setDate(new Date().getDate() + 12)),
      time: "12:30",
      capacity: 35,
      registered: 20,
      menu: "Quinoa Salad, Vegetable Curry, Fruit Parfait",
      description: "Healthy and delicious vegetarian options for everyone.",
    },
    {
      id: "5",
      title: "BBQ Bonanza",
      date: new Date(new Date().setDate(new Date().getDate() + 17)),
      time: "12:00",
      capacity: 50,
      registered: 35,
      menu: "Pulled Pork, Beef Brisket, Cornbread",
      description: "Southern-style BBQ with all the fixings.",
    },
  ],
  onEventSelect = (event) => console.log("Event selected:", event),
  month = new Date(),
  onMonthChange = (date) => console.log("Month changed:", date),
}: LunchCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(month);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handlePreviousMonth = () => {
    const newMonth = addMonths(currentMonth, -1);
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // Get events for the selected date
  const selectedDateEvents = selectedDate
    ? events.filter((event) => isSameDay(event.date, selectedDate))
    : [];

  // Function to determine if a date has events
  const hasEvents = (date: Date) => {
    return events.some((event) => isSameDay(event.date, date));
  };

  // Function to determine if an event is full
  const isEventFull = (event: LunchEvent) => {
    return event.registered >= event.capacity;
  };

  // Custom day renderer for the calendar
  const renderDay = (day: Date) => {
    const dayEvents = events.filter((event) => isSameDay(event.date, day));
    const hasFullEvents = dayEvents.some(isEventFull);
    const hasAvailableEvents = dayEvents.some((event) => !isEventFull(event));

    return (
      <div className="relative w-full h-full">
        <div>{format(day, "d")}</div>
        {dayEvents.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1">
            {hasAvailableEvents && (
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
            )}
            {hasFullEvents && (
              <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-background p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Lunch Calendar</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span>Full</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousMonth}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="md:col-span-5">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={currentMonth}
            className="border rounded-md"
            components={{
              Day: ({ date, ...props }) => {
                return (
                  <div
                    {...props}
                    className={`${props.className} h-12 w-12 p-0 font-normal aria-selected:opacity-100`}
                  >
                    {renderDay(date)}
                  </div>
                );
              },
            }}
          />
        </div>

        <div className="md:col-span-2">
          <div className="h-full border rounded-md p-4 overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">
              {selectedDate
                ? format(selectedDate, "MMMM d, yyyy")
                : "Select a date"}
            </h3>

            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <Card
                    key={event.id}
                    className={`cursor-pointer hover:border-primary transition-colors ${isEventFull(event) ? "border-red-200" : "border-green-200"}`}
                    onClick={() => onEventSelect(event)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge
                          variant={
                            isEventFull(event) ? "destructive" : "default"
                          }
                          className="ml-2"
                        >
                          {isEventFull(event) ? "Full" : "Available"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <Users className="h-3.5 w-3.5" />
                        <span>
                          {event.registered}/{event.capacity}
                        </span>
                      </div>
                      {event.menu && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Utensils className="h-3.5 w-3.5" />
                          <span className="truncate">{event.menu}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : selectedDate ? (
              <div className="text-center py-8 text-muted-foreground">
                No lunch events scheduled for this date
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Select a date to view scheduled lunch events
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LunchCalendar;

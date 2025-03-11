import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Users, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface LunchEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  menu: string;
  capacity: number;
  registered: number;
  attendees?: string[];
  description: string;
}

interface LunchSignupProps {
  events?: LunchEvent[];
  onSignUp?: (eventId: string, date: Date) => void;
  currentUser?: string;
}

const LunchSignup = ({
  events = [],
  onSignUp = () => {},
  currentUser = "",
}: LunchSignupProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [lunchEvents, setLunchEvents] = useState<LunchEvent[]>(
    events.length > 0
      ? events
      : [
          {
            id: "1",
            title: "Italian Pasta Day",
            date: new Date(new Date().setDate(new Date().getDate() + 3)),
            time: "12:30 PM",
            location: "Main Cafeteria",
            menu: "Spaghetti Carbonara, Garlic Bread, Tiramisu",
            capacity: 30,
            registered: 18,
            attendees: ["John Doe", "Jane Smith", "Bob Johnson"],
            description:
              "Authentic Italian pasta dishes prepared by our guest chef from Milan.",
          },
          {
            id: "2",
            title: "Taco Tuesday",
            date: new Date(new Date().setDate(new Date().getDate() + 5)),
            time: "12:00 PM",
            location: "Main Cafeteria",
            menu: "Beef Tacos, Chicken Quesadillas, Churros",
            capacity: 40,
            registered: 40,
            attendees: ["Alice Brown", "Charlie Davis", "Eva Fisher"],
            description:
              "Mexican fiesta with a variety of tacos and traditional sides.",
          },
          {
            id: "3",
            title: "Sushi Experience",
            date: new Date(new Date().setDate(new Date().getDate() + 10)),
            time: "12:15 PM",
            location: "Main Cafeteria",
            menu: "California Rolls, Nigiri, Miso Soup",
            capacity: 25,
            registered: 12,
            attendees: ["Grace Hill", "Ian Jones", "Kate Lee"],
            description: "Fresh sushi prepared by our skilled sushi chefs.",
          },
          {
            id: "4",
            title: "Vegetarian Delight",
            date: new Date(new Date().setDate(new Date().getDate() + 12)),
            time: "12:30 PM",
            location: "Main Cafeteria",
            menu: "Quinoa Salad, Vegetable Curry, Fruit Parfait",
            capacity: 35,
            registered: 20,
            attendees: ["Mike Nelson", "Olivia Parker", "Quinn Roberts"],
            description:
              "Healthy and delicious vegetarian options for everyone.",
          },
          {
            id: "5",
            title: "BBQ Bonanza",
            date: new Date(new Date().setDate(new Date().getDate() + 17)),
            time: "12:00 PM",
            location: "Main Cafeteria",
            menu: "Pulled Pork, Beef Brisket, Cornbread",
            capacity: 50,
            registered: 35,
            attendees: ["Sam Turner", "Uma Vincent", "Will Xavier"],
            description: "Southern-style BBQ with all the fixings.",
          },
        ],
  );

  const handleSignUp = (eventId: string, eventDate: Date) => {
    // Update the local state to show the event as registered
    setLunchEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            registered: event.registered + 1,
            attendees: [...(event.attendees || []), currentUser || "You"],
          };
        }
        return event;
      }),
    );

    // Call the external handler
    onSignUp(eventId, eventDate);
  };

  // Get the selected day's events
  const selectedDayEvents = date
    ? lunchEvents.filter(
        (event) => event.date.toDateString() === date.toDateString(),
      )
    : [];

  // Get attendee avatars
  const getAttendeeAvatar = (name: string) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/ /g, "")}`;
  };

  // Function to determine if an event is full
  const isEventFull = (event: LunchEvent) => {
    return event.registered >= event.capacity;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 rounded-full"></div>
            <div className="flex items-center justify-center bg-white/10 rounded-full p-2">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Company"
                alt="Company Logo"
                className="h-8 w-8"
              />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-1">Company Lunch Signup</h1>
        <p className="text-sm opacity-90">
          Sign up for our delicious company-provided lunches. Join your
          colleagues for good food and great conversation!
        </p>
        <div className="text-xs mt-4 opacity-70">
          Organized by{" "}
          <span className="inline-flex items-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=HR"
              alt="HR Department"
              className="h-4 w-4 mr-1 inline"
            />
            HR Department
          </span>
        </div>
        <div className="text-xs mt-2">
          Already signed up?{" "}
          <button className="underline hover:text-white/80">
            View your registrations
          </button>
        </div>
      </div>

      {/* Calendar and Events */}
      <div className="p-4">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="border rounded-md p-3">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="w-full"
                    modifiers={{
                      hasEvent: (day) =>
                        lunchEvents.some(
                          (event) =>
                            event.date.toDateString() === day.toDateString(),
                        ),
                      registered: (day) =>
                        lunchEvents.some(
                          (event) =>
                            event.date.toDateString() === day.toDateString() &&
                            event.attendees?.includes(currentUser || "You"),
                        ),
                    }}
                    modifiersClassNames={{
                      hasEvent: "bg-primary/10 font-medium",
                      registered:
                        "bg-green-100 font-bold text-green-800 ring-2 ring-green-500",
                    }}
                  />
                </div>
              </div>

              <div className="md:w-2/3">
                {date ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Available Lunches for {format(date, "EEEE, MMMM d, yyyy")}
                    </h2>
                    {selectedDayEvents.length > 0 ? (
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="py-2 px-4 text-left font-medium text-gray-700 w-1/4">
                                Date
                              </th>
                              <th className="py-2 px-4 text-left font-medium text-gray-700 w-1/4">
                                Time
                              </th>
                              <th className="py-2 px-4 text-left font-medium text-gray-700 w-2/4">
                                Lunch Event
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedDayEvents.map((event, index) => {
                              const isFull = isEventFull(event);
                              const bgColor =
                                index % 2 === 0 ? "bg-muted/10" : "bg-muted/5";

                              return (
                                <tr key={event.id} className={bgColor}>
                                  <td className="py-3 px-4 border-t border-gray-200">
                                    {format(event.date, "MM/dd/yyyy")}
                                  </td>
                                  <td className="py-3 px-4 border-t border-gray-200">
                                    {event.time}
                                  </td>
                                  <td className="py-3 px-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-medium flex items-center gap-2">
                                          {event.title}
                                          {isFull && (
                                            <Badge
                                              variant="destructive"
                                              className="text-xs"
                                            >
                                              Full
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          {event.menu}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                          <Users className="h-3 w-3" />
                                          <span>
                                            {event.registered}/{event.capacity}{" "}
                                            registered
                                          </span>
                                        </div>
                                      </div>
                                      {event.attendees?.includes(
                                        currentUser || "You",
                                      ) ? (
                                        <div className="flex items-center gap-2">
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            Registered
                                          </Badge>
                                        </div>
                                      ) : isFull ? (
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          disabled
                                        >
                                          Full
                                        </Button>
                                      ) : (
                                        <Button
                                          size="sm"
                                          className="bg-primary hover:bg-primary/90"
                                          onClick={() =>
                                            handleSignUp(event.id, event.date)
                                          }
                                        >
                                          Sign Up
                                        </Button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-md">
                        No lunch events available for this date.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-md">
                    Please select a date to view available lunch events.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Date
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Time
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Event
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Menu
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Capacity
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lunchEvents.map((event, index) => {
                    const isFull = isEventFull(event);
                    const bgColor =
                      index % 2 === 0 ? "bg-muted/10" : "bg-muted/5";

                    return (
                      <tr key={event.id} className={bgColor}>
                        <td className="py-3 px-4 border-t border-gray-200">
                          {format(event.date, "MM/dd/yyyy")}
                        </td>
                        <td className="py-3 px-4 border-t border-gray-200">
                          {event.time}
                        </td>
                        <td className="py-3 px-4 border-t border-gray-200">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.location}
                          </div>
                        </td>
                        <td className="py-3 px-4 border-t border-gray-200">
                          <div className="flex items-center gap-1">
                            <Utensils className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm truncate max-w-[200px]">
                              {event.menu}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-t border-gray-200">
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">
                              {event.registered}/{event.capacity}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-t border-gray-200">
                          {event.attendees?.includes(currentUser || "You") ? (
                            <Badge variant="outline" className="text-xs">
                              Registered
                            </Badge>
                          ) : isFull ? (
                            <Button size="sm" variant="outline" disabled>
                              Full
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => handleSignUp(event.id, event.date)}
                            >
                              Sign Up
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LunchSignup;

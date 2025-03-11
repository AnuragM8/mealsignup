import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Recipient {
  id: string;
  name: string;
  address: string;
  avatarUrl?: string;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  recipient: Recipient;
  volunteer?: string;
}

interface DeliveryDay {
  date: Date;
  timeSlots: TimeSlot[];
}

interface VolunteerSignupProps {
  initialDeliveryDays?: DeliveryDay[];
  onSignUp?: (slotId: string, date: Date) => void;
  currentUser?: string;
}

const VolunteerSignup = ({
  initialDeliveryDays = [],
  onSignUp = () => {},
  currentUser = "",
}: VolunteerSignupProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [deliveryDays, setDeliveryDays] = useState<DeliveryDay[]>(
    initialDeliveryDays.length > 0
      ? initialDeliveryDays
      : [
          {
            date: new Date(2023, 11, 1), // December 1, 2023 (Thu)
            timeSlots: [
              {
                id: "1",
                startTime: "12:00",
                endTime: "1:00",
                recipient: {
                  id: "1",
                  name: "Mr. Davis",
                  address: "215 Center St",
                  avatarUrl: "",
                },
              },
              {
                id: "2",
                startTime: "12:00",
                endTime: "1:00",
                recipient: {
                  id: "2",
                  name: "Ms. Carter",
                  address: "Rolling Hills Apt 4",
                  avatarUrl: "",
                },
              },
              {
                id: "3",
                startTime: "12:00",
                endTime: "1:00",
                recipient: {
                  id: "3",
                  name: "Dr. Zeke",
                  address: "505 High St",
                  avatarUrl: "",
                },
              },
              {
                id: "4",
                startTime: "3:00",
                endTime: "4:00",
                recipient: {
                  id: "1",
                  name: "Mr. Davis",
                  address: "215 Center St",
                  avatarUrl: "",
                },
              },
              {
                id: "5",
                startTime: "3:00",
                endTime: "4:00",
                recipient: {
                  id: "2",
                  name: "Ms. Carter",
                  address: "Rolling Hills Apt 4",
                  avatarUrl: "",
                },
              },
              {
                id: "6",
                startTime: "3:00",
                endTime: "4:00",
                recipient: {
                  id: "3",
                  name: "Dr. Zeke",
                  address: "505 High St",
                  avatarUrl: "",
                },
              },
            ],
          },
          {
            date: new Date(2023, 11, 8), // December 8, 2023 (Fri)
            timeSlots: [
              {
                id: "7",
                startTime: "12:00",
                endTime: "1:00",
                recipient: {
                  id: "1",
                  name: "Mr. Davis",
                  address: "215 Center St",
                  avatarUrl: "",
                },
              },
              {
                id: "8",
                startTime: "12:00",
                endTime: "1:00",
                recipient: {
                  id: "2",
                  name: "Ms. Carter",
                  address: "Rolling Hills Apt 4",
                  avatarUrl: "",
                },
              },
              {
                id: "9",
                startTime: "12:00",
                endTime: "1:00",
                recipient: {
                  id: "3",
                  name: "Dr. Zeke",
                  address: "505 High St",
                  avatarUrl: "",
                },
              },
              {
                id: "10",
                startTime: "3:00",
                endTime: "4:00",
                recipient: {
                  id: "1",
                  name: "Mr. Davis",
                  address: "215 Center St",
                  avatarUrl: "",
                },
              },
              {
                id: "11",
                startTime: "3:00",
                endTime: "4:00",
                recipient: {
                  id: "2",
                  name: "Ms. Carter",
                  address: "Rolling Hills Apt 4",
                  avatarUrl: "",
                },
              },
              {
                id: "12",
                startTime: "3:00",
                endTime: "4:00",
                recipient: {
                  id: "3",
                  name: "Dr. Zeke",
                  address: "505 High St",
                  avatarUrl: "",
                },
              },
            ],
          },
        ],
  );

  const handleSignUp = (slotId: string, slotDate: Date) => {
    // Update the local state to show the slot as taken
    setDeliveryDays((prevDays) =>
      prevDays.map((day) => {
        if (day.date.toDateString() === slotDate.toDateString()) {
          return {
            ...day,
            timeSlots: day.timeSlots.map((slot) => {
              if (slot.id === slotId) {
                return { ...slot, volunteer: currentUser || "You" };
              }
              return slot;
            }),
          };
        }
        return day;
      }),
    );

    // Call the external handler
    onSignUp(slotId, slotDate);
  };

  // Get the selected day's slots
  const selectedDaySlots = date
    ? deliveryDays.find(
        (day) => day.date.toDateString() === date.toDateString(),
      )?.timeSlots || []
    : [];

  // Group slots by time
  const groupedSlots: Record<string, TimeSlot[]> = {};
  selectedDaySlots.forEach((slot) => {
    const timeKey = `${slot.startTime} - ${slot.endTime}`;
    if (!groupedSlots[timeKey]) {
      groupedSlots[timeKey] = [];
    }
    groupedSlots[timeKey].push(slot);
  });

  // Get volunteer avatars
  const getVolunteerAvatar = (name: string) => {
    if (name === "Bob Minor") {
      return "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob";
    } else if (name === "Rob Lechner") {
      return "https://api.dicebear.com/7.x/avataaars/svg?seed=Rob";
    } else if (name === "Sue Fayer") {
      return "https://api.dicebear.com/7.x/avataaars/svg?seed=Sue";
    } else if (name === "Felicia Navidad") {
      return "https://api.dicebear.com/7.x/avataaars/svg?seed=Felicia";
    }
    return "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown";
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#6d3636] text-white p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 rounded-full"></div>
            <div className="flex items-center justify-center bg-white/10 rounded-full p-2">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Church"
                alt="Church/Temple Logo"
                className="h-8 w-8"
              />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-1">Meal Deliveries for Elderly</h1>
        <p className="text-sm opacity-90">
          Thank you for your help visiting and delivering regular meals to our
          sweet elderly neighbors. We appreciate it!
        </p>
        <div className="text-xs mt-4 opacity-70">
          Created by{" "}
          <span className="inline-flex items-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=SignUpGenius"
              alt="SignUpGenius"
              className="h-4 w-4 mr-1 inline"
            />
            SignUpGenius Staff
          </span>
        </div>
        <div className="text-xs mt-2">
          Already signed up?{" "}
          <button className="underline hover:text-white/80">
            You can change your sign up
          </button>
        </div>
      </div>

      {/* Calendar and Slots */}
      <div className="p-4">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="md:w-2/3">
                {date ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Available Slots for {format(date, "EEEE, MMMM d, yyyy")}
                    </h2>
                    {Object.keys(groupedSlots).length > 0 ? (
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-orange-100">
                              <th className="py-2 px-4 text-left font-medium text-gray-700 w-1/4">
                                Date (mm/dd/yy)
                              </th>
                              <th className="py-2 px-4 text-left font-medium text-gray-700 w-1/4">
                                Time (EDT)
                              </th>
                              <th className="py-2 px-4 text-left font-medium text-gray-700 w-2/4">
                                Available Slot
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(groupedSlots).map(
                              ([timeKey, slots], timeIndex) => (
                                <React.Fragment key={timeKey}>
                                  {slots.map((slot, slotIndex) => {
                                    const isVolunteered =
                                      slot.volunteer !== undefined;
                                    const isFirstInTimeGroup = slotIndex === 0;
                                    const bgColor =
                                      timeIndex % 2 === 0
                                        ? "bg-[#6d3636]/10"
                                        : "bg-[#6d3636]/5";

                                    return (
                                      <tr key={slot.id} className={bgColor}>
                                        {isFirstInTimeGroup && (
                                          <td
                                            className="py-3 px-4 border-t border-gray-200"
                                            rowSpan={slots.length}
                                          >
                                            {format(date, "MM/dd/yyyy")}
                                          </td>
                                        )}
                                        {isFirstInTimeGroup && (
                                          <td
                                            className="py-3 px-4 border-t border-gray-200"
                                            rowSpan={slots.length}
                                          >
                                            {timeKey}
                                          </td>
                                        )}
                                        <td className="py-3 px-4 border-t border-gray-200">
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <div className="font-medium">
                                                Visit/Deliver to{" "}
                                                {slot.recipient.name}
                                              </div>
                                              <div className="text-sm text-gray-600">
                                                {slot.recipient.address}
                                              </div>
                                            </div>
                                            {isVolunteered ? (
                                              <div className="flex items-center gap-2">
                                                <Avatar>
                                                  <img
                                                    src={getVolunteerAvatar(
                                                      slot.volunteer || "",
                                                    )}
                                                    alt={slot.volunteer}
                                                  />
                                                </Avatar>
                                                <span className="text-sm">
                                                  {slot.volunteer}
                                                </span>
                                              </div>
                                            ) : (
                                              <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700"
                                                onClick={() =>
                                                  handleSignUp(slot.id, date)
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
                                </React.Fragment>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-md">
                        No delivery slots available for this date.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-md">
                    Please select a date to view available slots.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Date
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Time
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Recipient
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Address
                    </th>
                    <th className="py-2 px-4 text-left font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryDays.flatMap((day, dayIndex) =>
                    day.timeSlots.map((slot, slotIndex) => {
                      const isVolunteered = slot.volunteer !== undefined;
                      const bgColor =
                        dayIndex % 2 === 0
                          ? "bg-[#6d3636]/10"
                          : "bg-[#6d3636]/5";

                      return (
                        <tr
                          key={`${day.date.toISOString()}-${slot.id}`}
                          className={bgColor}
                        >
                          <td className="py-3 px-4 border-t border-gray-200">
                            {format(day.date, "MM/dd/yyyy")}
                          </td>
                          <td className="py-3 px-4 border-t border-gray-200">
                            {slot.startTime} - {slot.endTime}
                          </td>
                          <td className="py-3 px-4 border-t border-gray-200">
                            {slot.recipient.name}
                          </td>
                          <td className="py-3 px-4 border-t border-gray-200">
                            {slot.recipient.address}
                          </td>
                          <td className="py-3 px-4 border-t border-gray-200">
                            {isVolunteered ? (
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <img
                                    src={getVolunteerAvatar(
                                      slot.volunteer || "",
                                    )}
                                    alt={slot.volunteer}
                                  />
                                </Avatar>
                                <span className="text-sm">
                                  {slot.volunteer}
                                </span>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleSignUp(slot.id, day.date)}
                              >
                                Sign Up
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    }),
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VolunteerSignup;

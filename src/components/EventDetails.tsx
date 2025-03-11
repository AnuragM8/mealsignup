import React, { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Users,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { cn } from "@/lib/utils";

interface EventDetailsProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  event?: {
    id: string;
    title: string;
    date: Date;
    time: string;
    description: string;
    menu: string;
    capacity: number;
    registeredCount: number;
  };
  onSignUp?: () => void;
}

const EventDetails = ({
  isOpen = true,
  onOpenChange = () => {},
  event = {
    id: "1",
    title: "Italian Pasta Day",
    date: new Date(),
    time: "12:00",
    description:
      "Join us for a delicious Italian pasta lunch featuring various pasta dishes, garlic bread, and salad. Vegetarian options available.",
    menu: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    capacity: 30,
    registeredCount: 18,
  },
  onSignUp = () => console.log("Sign up clicked"),
}: EventDetailsProps) => {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const availableSlots = event.capacity - event.registeredCount;
  const isFull = availableSlots <= 0;

  const handleSignUpClick = () => {
    setConfirmationVisible(true);
  };

  const handleConfirmSignUp = () => {
    onSignUp();
    setConfirmationVisible(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Event Image/Menu Preview */}
          <div className="w-full h-48 rounded-md overflow-hidden bg-gray-100">
            <img
              src={event.menu}
              alt={`Menu for ${event.title}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>{format(event.date, "EEEE, MMMM d, yyyy")}</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-500" />
              <div className="flex flex-col">
                <span>
                  {event.registeredCount} / {event.capacity} registered
                </span>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      isFull
                        ? "bg-red-500"
                        : availableSlots < 5
                          ? "bg-amber-500"
                          : "bg-green-500",
                    )}
                    style={{
                      width: `${Math.min(
                        (event.registeredCount / event.capacity) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 mt-1">
                  {isFull
                    ? "Event is full"
                    : `${availableSlots} ${availableSlots === 1 ? "spot" : "spots"} remaining`}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-700">{event.description}</p>
            </div>
          </div>

          {/* Sign Up Button or Full Message */}
          {isFull ? (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span>This event is at full capacity</span>
            </div>
          ) : confirmationVisible ? (
            <div className="space-y-4 p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium">Confirm Registration</h3>
              <p>
                Are you sure you want to register for {event.title} on{" "}
                {format(event.date, "MMMM d")} at {event.time}?
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setConfirmationVisible(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleConfirmSignUp}>Confirm</Button>
              </div>
            </div>
          ) : (
            <Button
              className="w-full flex items-center justify-center gap-2"
              onClick={handleSignUpClick}
            >
              Sign Up for This Lunch
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <DialogFooter className="sm:justify-start">
          <div className="text-sm text-gray-500">
            Please sign up at least 24 hours in advance
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetails;

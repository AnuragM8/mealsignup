import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import LunchPortalHeader from "./LunchPortalHeader";
import LunchSignup from "./LunchSignup";
import ConfirmationDialog from "./ConfirmationDialog";
import { format } from "date-fns";
import { fetchLunchEvents, registerForEvent, LunchEvent } from "@/lib/api";

interface HomeProps {
  isLoggedIn?: boolean;
  username?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Home = ({
  isLoggedIn = false,
  username = "Guest User",
  onLogin = () => console.log("Login clicked"),
  onLogout = () => console.log("Logout clicked"),
}: HomeProps) => {
  const [selectedEvent, setSelectedEvent] = useState<LunchEvent | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [lunchEvents, setLunchEvents] = useState<LunchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch lunch events from the .NET backend
  useEffect(() => {
    const getLunchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetchLunchEvents();
        if (response.success && response.data) {
          // Convert string dates to Date objects
          const events = response.data.map((event) => ({
            ...event,
            date: new Date(event.date),
          }));
          setLunchEvents(events);
          setError(null);
        } else {
          setError(response.error || "Failed to fetch events");
          // Fall back to sample data if API fails
          setLunchEvents([
            {
              id: "1",
              title: "Italian Pasta Day",
              date: new Date(new Date().setDate(new Date().getDate() + 3)),
              time: "12:30 PM",
              location: "Main Cafeteria",
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
              time: "12:00 PM",
              location: "Main Cafeteria",
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
              time: "12:15 PM",
              location: "Main Cafeteria",
              capacity: 25,
              registered: 12,
              menu: "California Rolls, Nigiri, Miso Soup",
              description: "Fresh sushi prepared by our skilled sushi chefs.",
            },
          ]);
        }
      } catch (err) {
        setError("An error occurred while fetching events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getLunchEvents();
  }, []);

  const handleConfirmRegistration = async () => {
    if (!selectedEvent || !isLoggedIn) return;

    try {
      const response = await registerForEvent({
        eventId: selectedEvent.id,
        userId: username, // In a real app, this would be a user ID
        userName: username,
      });

      if (response.success) {
        console.log("Registration confirmed for event:", selectedEvent.id);

        // Update the local state to reflect the new registration
        setLunchEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id
              ? {
                  ...event,
                  registered: event.registered + 1,
                  attendees: [...(event.attendees || []), username],
                }
              : event,
          ),
        );
      } else {
        console.error("Registration failed:", response.error);
        // Show error message to user
      }
    } catch (err) {
      console.error("Error during registration:", err);
      // Show error message to user
    } finally {
      setConfirmationOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Company Event Managment branc1</title>
      </Helmet>

      <LunchPortalHeader
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Company Lunch Portal</h1>
          <p className="text-muted-foreground">
            Browse and sign up for upcoming company-provided lunches or{" "}
            <a
              href="/volunteer-signup"
              className="text-primary hover:underline"
            >
              volunteer to deliver meals
            </a>
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 border rounded-md bg-red-50 text-red-600">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <LunchSignup
              events={lunchEvents}
              onSignUp={(eventId, date) => {
                const event = lunchEvents.find((e) => e.id === eventId);
                if (event) {
                  if (!isLoggedIn) {
                    // Prompt user to log in
                    onLogin();
                    return;
                  }
                  setSelectedEvent(event);
                  setConfirmationOpen(true);
                }
              }}
              currentUser={isLoggedIn ? username : ""}
            />
          </div>
        )}
      </main>

      {/* Confirmation dialog */}
      {selectedEvent && (
        <ConfirmationDialog
          open={confirmationOpen}
          onOpenChange={setConfirmationOpen}
          eventTitle={selectedEvent.title}
          eventDate={format(selectedEvent.date, "MMMM d, yyyy")}
          eventTime={selectedEvent.time}
          eventLocation="Main Cafeteria"
          onConfirm={handleConfirmRegistration}
          onCancel={() => setConfirmationOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;

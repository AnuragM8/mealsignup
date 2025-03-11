import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Calendar, BarChart, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminHeader from "@/components/admin/AdminHeader";
import EventForm from "@/components/admin/EventForm";
import RegistrationList from "@/components/admin/RegistrationList";

interface DashboardProps {
  username?: string;
  onLogout?: () => void;
}

const Dashboard = ({
  username = "Admin User",
  onLogout = () => console.log("Logout clicked"),
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewEventForm, setShowNewEventForm] = useState(false);

  // Mock data for dashboard stats
  const stats = {
    upcomingEvents: 5,
    totalRegistrations: 87,
    averageAttendance: 17,
    popularMeals: [
      { name: "Italian Pasta", count: 24 },
      { name: "Taco Tuesday", count: 22 },
      { name: "Sushi Platter", count: 19 },
      { name: "Mediterranean Feast", count: 12 },
    ],
    recentEvents: [
      {
        id: "1",
        title: "Italian Pasta Day",
        date: "2023-06-20",
        registrations: 18,
        capacity: 25,
      },
      {
        id: "2",
        title: "Taco Tuesday",
        date: "2023-06-13",
        registrations: 22,
        capacity: 20,
      },
      {
        id: "3",
        title: "Sushi Platter",
        date: "2023-06-06",
        registrations: 19,
        capacity: 20,
      },
    ],
  };

  const handleCreateEvent = (data: any) => {
    console.log("Creating new event:", data);
    setShowNewEventForm(false);
    // In a real app, this would save the event to the database
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader username={username} onLogout={onLogout} />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button
            onClick={() => setShowNewEventForm(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Create New Event
          </Button>
        </div>

        {showNewEventForm ? (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Create New Event</h2>
              <Button
                variant="ghost"
                onClick={() => setShowNewEventForm(false)}
              >
                Cancel
              </Button>
            </div>
            <EventForm onSubmit={handleCreateEvent} />
          </div>
        ) : (
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Events
              </TabsTrigger>
              <TabsTrigger
                value="registrations"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Registrations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {stats.upcomingEvents}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Registrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {stats.totalRegistrations}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Average Attendance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {stats.averageAttendance}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Meals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {stats.popularMeals.map((meal, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span>{meal.name}</span>
                          <span className="text-muted-foreground">
                            {meal.count} registrations
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Events</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/admin/events">View All</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {stats.recentEvents.map((event) => (
                        <li
                          key={event.id}
                          className="border-b pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{event.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(event.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-sm">
                              <span
                                className={`${event.registrations > event.capacity ? "text-red-500" : "text-green-500"}`}
                              >
                                {event.registrations}/{event.capacity}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex justify-between items-center p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <span
                              className={`${event.registrations > event.capacity ? "text-red-500" : "text-green-500"}`}
                            >
                              {event.registrations}/{event.capacity}
                            </span>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/admin/events/${event.id}`}>Edit</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="registrations">
              <RegistrationList />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

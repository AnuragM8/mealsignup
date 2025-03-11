import React, { useState } from "react";
import { Helmet } from "react-helmet";
import LunchPortalHeader from "@/components/LunchPortalHeader";
import VolunteerSignup from "@/components/VolunteerSignup";

interface VolunteerSignupPageProps {
  isLoggedIn?: boolean;
  username?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

const VolunteerSignupPage = ({
  isLoggedIn = false,
  username = "Guest User",
  onLogin = () => console.log("Login clicked"),
  onLogout = () => console.log("Logout clicked"),
}: VolunteerSignupPageProps) => {
  const [signedUpSlots, setSignedUpSlots] = useState<string[]>([]);

  const handleSignUp = (slotId: string, date: Date) => {
    console.log(`Signed up for slot ${slotId} on ${date.toDateString()}`);
    setSignedUpSlots((prev) => [...prev, slotId]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Volunteer Signup - Meal Deliveries for Elderly</title>
      </Helmet>

      <LunchPortalHeader
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Volunteer Signup</h1>
          <p className="text-muted-foreground">
            Sign up to deliver meals to elderly neighbors in need
          </p>
        </div>

        <VolunteerSignup
          onSignUp={handleSignUp}
          currentUser={isLoggedIn ? username : ""}
        />
      </main>
    </div>
  );
};

export default VolunteerSignupPage;

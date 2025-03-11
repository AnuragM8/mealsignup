// API client for .NET backend

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.example.com";

export interface LunchEvent {
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

export interface RegistrationRequest {
  eventId: string;
  userId: string;
  userName: string;
  dietaryRestrictions?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Fetch all lunch events
export async function fetchLunchEvents(): Promise<ApiResponse<LunchEvent[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    console.error("Error fetching lunch events:", error);
    return { error: error.message, success: false };
  }
}

// Register for a lunch event
export async function registerForEvent(
  registration: RegistrationRequest,
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/registrations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registration),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    console.error("Error registering for event:", error);
    return { error: error.message, success: false };
  }
}

// Get user registrations
export async function getUserRegistrations(
  userId: string,
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/${userId}/registrations`,
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    return { error: error.message, success: false };
  }
}

// Cancel registration
export async function cancelRegistration(
  registrationId: string,
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/registrations/${registrationId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error canceling registration:", error);
    return { error: error.message, success: false };
  }
}

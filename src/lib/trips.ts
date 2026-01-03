import { places } from "@/data/places";

export interface Trip {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    image: string;
    status: "ongoing" | "upcoming" | "completed";
    guests?: number;
    placeId?: string; // Link to the place details
}

const INITIAL_TRIPS: Trip[] = [
    {
        id: "trip-1",
        name: "Rajasthan Heritage Tour",
        destination: "Jaipur, Udaipur, Jodhpur",
        startDate: "Jan 02, 2026",
        endDate: "Jan 12, 2026",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop&q=80",
        status: "ongoing",
        placeId: "jaipur"
    },
    {
        id: "trip-2",
        name: "Himalayan Adventure",
        destination: "Manali, Leh, Ladakh",
        startDate: "Jan 10, 2026",
        endDate: "Jan 25, 2026",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop&q=80",
        status: "upcoming",
        placeId: "manali"
    },
    {
        id: "trip-3",
        name: "Lakshadweep Island Escape",
        destination: "Agatti, Bangaram, Kavaratti",
        startDate: "Feb 05, 2026",
        endDate: "Feb 12, 2026",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80",
        status: "upcoming",
        placeId: "lakshadweep"
    },
    {
        id: "trip-4",
        name: "Kerala Ayurveda Retreat",
        destination: "Kochi, Munnar, Alleppey",
        startDate: "Dec 15, 2024",
        endDate: "Dec 25, 2024",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&q=80",
        status: "completed",
        placeId: "kerala-backwaters"
    },
    {
        id: "trip-5",
        name: "Golden Triangle Tour",
        destination: "Delhi, Agra, Jaipur",
        startDate: "Nov 10, 2024",
        endDate: "Nov 18, 2024",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80",
        status: "completed",
        placeId: "jaipur" // Fallback to Jaipur for now
    },
];

const STORAGE_KEY = "globetrotter_trips";

export const getTrips = (): Trip[] => {
    if (typeof window === "undefined") return INITIAL_TRIPS;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // Initialize with mock data if empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRIPS));
        return INITIAL_TRIPS;
    }

    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Failed to parse trips", e);
        return INITIAL_TRIPS;
    }
};

export const addTrip = (trip: Omit<Trip, "id" | "status">) => {
    const trips = getTrips();

    // Determine status based on dates
    const now = new Date();
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);

    let status: Trip["status"] = "upcoming";
    if (now > end) {
        status = "completed";
    } else if (now >= start && now <= end) {
        status = "ongoing";
    }

    const newTrip: Trip = {
        ...trip,
        id: Date.now().toString(),
        status,
    };

    const updatedTrips = [newTrip, ...trips];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));

    // Dispatch a custom event so components can listen for updates
    window.dispatchEvent(new Event("tripsUpdated"));

    return newTrip;
};

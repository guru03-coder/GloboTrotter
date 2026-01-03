import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { TripCard } from "@/components/TripCards";
import { Button } from "@/components/ui/button";
import { getTrips, Trip } from "@/lib/trips";

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    // Initial load
    setTrips(getTrips());

    // Listen for updates
    const handleTripsUpdate = () => {
      setTrips(getTrips());
    };

    window.addEventListener("tripsUpdated", handleTripsUpdate);
    return () => window.removeEventListener("tripsUpdated", handleTripsUpdate);
  }, []);

  const ongoingTrips = trips.filter(t => t.status === "ongoing");
  const upcomingTrips = trips.filter(t => t.status === "upcoming");
  const completedTrips = trips.filter(t => t.status === "completed");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 space-y-8">
          {/* Search Bar */}
          <SearchBar placeholder="Search your trips..." />

          {/* Ongoing Section */}
          <section className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Ongoing</h2>
            <div className="space-y-4">
              {ongoingTrips.length > 0 ? (
                ongoingTrips.map((trip) => (
                  <TripCard key={trip.id} {...trip} />
                ))
              ) : (
                <div className="text-muted-foreground text-sm italic py-4">No ongoing trips at the moment.</div>
              )}
            </div>
          </section>

          {/* Upcoming Section */}
          <section className="animate-slide-up">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Up-coming</h2>
            <div className="space-y-4">
              {upcomingTrips.length > 0 ? (
                upcomingTrips.map((trip) => (
                  <TripCard key={trip.id} {...trip} />
                ))
              ) : (
                <div className="text-muted-foreground text-sm italic py-4">No upcoming trips planned yet.</div>
              )}
            </div>
          </section>

          {/* Completed Section */}
          <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Completed</h2>
            <div className="space-y-4">
              {completedTrips.length > 0 ? (
                completedTrips.map((trip) => (
                  <TripCard key={trip.id} {...trip} />
                ))
              ) : (
                <div className="text-muted-foreground text-sm italic py-4">No completed trips history.</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TripsPage;

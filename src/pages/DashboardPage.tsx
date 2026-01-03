import { Link } from "react-router-dom";
import { Plus, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { DestinationCard, TripCard } from "@/components/TripCards";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/india-hero.jpg";

import { places } from "@/data/places";

const destinations = places.map(({ id, name, country, image, rating }) => ({
  id,
  name,
  country,
  image,
  rating,
}));

const previousTrips = [
  {
    name: "Kerala Ayurveda Retreat",
    destination: "Kochi, Munnar, Alleppey",
    startDate: "Dec 15, 2024",
    endDate: "Dec 25, 2024",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&q=80",
    status: "completed" as const,
  },
  {
    name: "Himalayan Adventure",
    destination: "Manali, Leh, Ladakh",
    startDate: "Jan 10, 2026",
    endDate: "Jan 25, 2026",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop&q=80",
    status: "upcoming" as const,
  },
  {
    name: "Rajasthan Heritage Tour",
    destination: "Jaipur, Udaipur, Jodhpur",
    startDate: "Jan 02, 2026",
    endDate: "Jan 12, 2026",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop&q=80",
    status: "ongoing" as const,
  },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Hero Banner */}
        <div className="relative h-[350px] overflow-hidden">
          <img
            src={heroImage}
            alt="Explore India"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in text-foreground drop-shadow-lg">
              Explore <span className="gradient-text">Incredible India</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-xl mb-6 animate-fade-in drop-shadow" style={{ animationDelay: "0.2s" }}>
              Discover the beauty of diverse landscapes, rich heritage & vibrant culture
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 space-y-10">
          {/* Search Bar */}
          <SearchBar />

          {/* Top Regional Selections */}
          <section className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="text-primary" size={24} />
                <h2 className="text-xl font-semibold">Top Regional Selections</h2>
              </div>
              <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                View All
                <ArrowRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {destinations.map((destination) => (
                <DestinationCard key={destination.name} {...destination} />
              ))}
            </div>
          </section>

          {/* Previous Trips */}
          <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Previous Trips</h2>
              <Link to="/trips">
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                  View All
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousTrips.map((trip) => (
                <TripCard key={trip.name} {...trip} />
              ))}
            </div>
          </section>

          {/* Plan a Trip Button */}
          <div className="flex justify-end">
            <Link to="/create-trip">
              <Button variant="glow" size="lg" className="gap-2">
                <Plus size={20} />
                Plan a trip
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

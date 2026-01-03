import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, Edit2, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const preplannedTrips = [
  {
    name: "Himalayan Adventure",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Lakshadweep Escape",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Northeast Explorer",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80",
  },
];

const previousTrips = [
  {
    name: "Kerala Backwaters",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Golden Triangle",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop&q=80",
  },
  {
    name: "Goa Beach Holiday",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop&q=80",
  },
];

import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const [profileImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const userData = {
    firstName: user?.user_metadata?.first_name || "Traveler",
    lastName: user?.user_metadata?.last_name || "",
    email: user?.email || "No email",
    phone: user?.user_metadata?.phone || "Not provided",
    city: user?.user_metadata?.city || "Not provided",
    country: user?.user_metadata?.country || "Not provided",
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 space-y-8">
          {/* Profile Header */}
          <Card glass className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full bg-muted border-4 border-primary/30 flex items-center justify-center overflow-hidden shadow-lg">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-bold gradient-text">
                        {userData.firstName[0]}{userData.lastName?.[0]}
                      </span>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={14} />
                  </button>
                </div>

                {/* User Details */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
                    <div className="flex gap-2 self-center md:self-auto">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit2 size={14} />
                        Edit Profile
                      </Button>
                      <Button variant="destructive" size="sm" className="gap-2" onClick={handleLogout}>
                        <LogOut size={14} />
                        Logout
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Email:</span> {userData.email}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Phone:</span> {userData.phone}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">City:</span> {userData.city}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">Country:</span> {userData.country}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preplanned Trips */}
          <section className="animate-slide-up">
            <h2 className="text-xl font-semibold mb-4">Preplanned Trips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {preplannedTrips.map((trip) => (
                <Card key={trip.name} glass className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="h-32 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-medium text-foreground mb-2">{trip.name}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Previous Trips */}
          <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl font-semibold mb-4">Previous Trips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {previousTrips.map((trip) => (
                <Card key={trip.name} glass className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="h-32 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-medium text-foreground mb-2">{trip.name}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

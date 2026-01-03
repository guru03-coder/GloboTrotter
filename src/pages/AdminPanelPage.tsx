import { useState } from "react";
import { Users, MapPin, Activity, TrendingUp, BarChart3, PieChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AdminTab = "users" | "cities" | "activities" | "analytics";

const adminTabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: "users", label: "Manage Users", icon: Users },
  { id: "cities", label: "Popular Cities", icon: MapPin },
  { id: "activities", label: "Popular Activities", icon: Activity },
  { id: "analytics", label: "User Trends and Analytics", icon: TrendingUp },
];

const mockUsers = [
  { id: 1, name: "Priya Sharma", email: "priya.sharma@gmail.com", trips: 15, status: "active" },
  { id: 2, name: "Rahul Verma", email: "rahul.v@gmail.com", trips: 12, status: "active" },
  { id: 3, name: "Ananya Patel", email: "ananya.p@gmail.com", trips: 8, status: "active" },
  { id: 4, name: "Vikram Singh", email: "vikram.s@gmail.com", trips: 5, status: "inactive" },
];

const mockCities = [
  { name: "Manali", state: "Himachal Pradesh", visits: 45678, trend: "+18%" },
  { name: "Kerala Backwaters", state: "Kerala", visits: 38920, trend: "+22%" },
  { name: "Jaipur", state: "Rajasthan", visits: 35456, trend: "+12%" },
  { name: "Lakshadweep", state: "Lakshadweep", visits: 28900, trend: "+45%" },
  { name: "Goa", state: "Goa", visits: 52340, trend: "+8%" },
];

const mockActivities = [
  { name: "Houseboat Stay", category: "Experience", bookings: 12450, rating: 4.9 },
  { name: "Paragliding", category: "Adventure", bookings: 8900, rating: 4.8 },
  { name: "Desert Safari", category: "Cultural", bookings: 7650, rating: 4.7 },
  { name: "Scuba Diving", category: "Water Sports", bookings: 5430, rating: 4.8 },
  { name: "Tea Plantation Tour", category: "Nature", bookings: 4200, rating: 4.6 },
];

const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 space-y-6">
          {/* Search Bar */}
          <SearchBar placeholder="Search users, cities, activities..." />

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 animate-fade-in">
            {adminTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "gap-2",
                  activeTab === tab.id && "shadow-lg"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === "users" && (
                <Card glass>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{user.trips} trips</p>
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                user.status === "active"
                                  ? "bg-accent/20 text-accent"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {user.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "cities" && (
                <Card glass>
                  <CardHeader>
                    <CardTitle>Popular Indian Destinations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCities.map((city, index) => (
                        <div
                          key={city.name}
                          className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-medium text-foreground">{city.name}</p>
                              <p className="text-sm text-muted-foreground">{city.state}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">{city.visits.toLocaleString()} visits</p>
                            <span className="text-sm text-accent">{city.trend}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "activities" && (
                <Card glass>
                  <CardHeader>
                    <CardTitle>Popular Activities in India</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockActivities.map((activity) => (
                        <div
                          key={activity.name}
                          className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                        >
                          <div>
                            <p className="font-medium text-foreground">{activity.name}</p>
                            <p className="text-sm text-muted-foreground">{activity.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">{activity.bookings.toLocaleString()} bookings</p>
                            <span className="text-sm text-primary">⭐ {activity.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "analytics" && (
                <Card glass>
                  <CardHeader>
                    <CardTitle>User Trends and Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Chart placeholders */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/50 h-48 flex items-center justify-center">
                        <div className="text-center">
                          <PieChart size={48} className="mx-auto text-primary mb-2" />
                          <p className="text-sm text-muted-foreground">User Demographics</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/50 h-48 flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp size={48} className="mx-auto text-accent mb-2" />
                          <p className="text-sm text-muted-foreground">Growth Trends</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 h-48 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 size={48} className="mx-auto text-secondary mb-2" />
                        <p className="text-sm text-muted-foreground">Monthly Bookings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-4">
              <Card glass className="p-4">
                <h3 className="font-semibold mb-3">Admin Section Info</h3>
                {activeTab === "users" && (
                  <p className="text-sm text-muted-foreground">
                    Manage Indian travelers and their trip activities. View user journeys across different states and regions.
                  </p>
                )}
                {activeTab === "cities" && (
                  <p className="text-sm text-muted-foreground">
                    Track popular destinations across India - from Kerala backwaters to Himalayan peaks.
                  </p>
                )}
                {activeTab === "activities" && (
                  <p className="text-sm text-muted-foreground">
                    Monitor trending activities like houseboats, paragliding, and cultural experiences.
                  </p>
                )}
                {activeTab === "analytics" && (
                  <p className="text-sm text-muted-foreground">
                    Comprehensive analytics on Indian travel trends and user behavior patterns.
                  </p>
                )}
              </Card>

              {/* Quick Stats */}
              <Card glass className="p-4">
                <h3 className="font-semibold mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Users</span>
                    <span className="font-semibold text-foreground">1,24,567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Trips</span>
                    <span className="font-semibold text-foreground">8,934</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">States Covered</span>
                    <span className="font-semibold text-foreground">29</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-semibold text-accent">₹2.34 Cr</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanelPage;

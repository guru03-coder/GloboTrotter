import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const suggestedPlaces = [
  { name: "Hawa Mahal", type: "Monument", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop&q=80" },
  { name: "Alleppey Backwaters", type: "Nature", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop&q=80" },
  { name: "Rohtang Pass", type: "Adventure", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop&q=80" },
  { name: "Taj Mahal", type: "Heritage", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop&q=80" },
  { name: "Munnar Tea Gardens", type: "Scenic", image: "https://images.unsplash.com/photo-1596422846543-75c11a6f1f6a?w=400&h=300&fit=crop&q=80" },
  { name: "Varanasi Ghats", type: "Spiritual", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop&q=80" },
];

const CreateTripPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: "",
    place: "",
    tripStartDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/build-itinerary");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Create a new <span className="gradient-text">Trip</span>
              </h1>
              <p className="text-muted-foreground">
                Plan your next Indian adventure with personalized suggestions
              </p>
            </div>

            {/* Form Section */}
            <Card glass className="animate-slide-up">
              <CardHeader>
                <CardTitle>Plan a new trip</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Start Date:</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Select a Place:</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          type="text"
                          name="place"
                          placeholder="e.g., Kerala, Manali, Lakshadweep"
                          value={formData.place}
                          onChange={handleChange}
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Start Date:</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          type="date"
                          name="tripStartDate"
                          value={formData.tripStartDate}
                          onChange={handleChange}
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">End Date:</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className="pl-12"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" variant="glow" size="lg">
                    Continue to Itinerary
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Suggestions Section */}
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-semibold mb-6">
                Suggestion for Places to Visit / Activities to Perform
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {suggestedPlaces.map((place) => (
                  <Card 
                    key={place.name} 
                    glass 
                    className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground text-sm">{place.name}</p>
                          <p className="text-xs text-muted-foreground">{place.type}</p>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTripPage;

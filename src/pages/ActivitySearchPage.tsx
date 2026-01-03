import { useState } from "react";
import { Search, MapPin, Clock, DollarSign, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: number;
  name: string;
  type: "city" | "activity";
  location: string;
  description: string;
  duration?: string;
  price?: string;
  rating: number;
}

const searchResults: SearchResult[] = [
  {
    id: 1,
    name: "Houseboat Stay in Alleppey",
    type: "activity",
    location: "Alleppey, Kerala",
    description: "Experience the serene backwaters of Kerala on a traditional houseboat",
    duration: "1-2 days",
    price: "₹8,000",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Paragliding in Bir Billing",
    type: "activity",
    location: "Himachal Pradesh",
    description: "Soar above the Himalayan valleys at Asia's highest paragliding site",
    duration: "2-3 hours",
    price: "₹3,500",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Desert Safari in Jaisalmer",
    type: "activity",
    location: "Jaisalmer, Rajasthan",
    description: "Camel safari through the golden sand dunes of the Thar Desert",
    duration: "Half day",
    price: "₹2,500",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Scuba Diving in Lakshadweep",
    type: "activity",
    location: "Lakshadweep Islands",
    description: "Explore vibrant coral reefs and marine life in crystal clear waters",
    duration: "3-4 hours",
    price: "₹6,000",
    rating: 4.9,
  },
  {
    id: 5,
    name: "River Rafting in Rishikesh",
    type: "activity",
    location: "Rishikesh, Uttarakhand",
    description: "White water rafting adventure on the holy Ganges river",
    duration: "3-4 hours",
    price: "₹1,500",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Tea Plantation Tour in Munnar",
    type: "activity",
    location: "Munnar, Kerala",
    description: "Walk through lush green tea estates and learn about tea making",
    duration: "2-3 hours",
    price: "₹800",
    rating: 4.5,
  },
  {
    id: 7,
    name: "Sunrise at Tiger Hill",
    type: "activity",
    location: "Darjeeling, West Bengal",
    description: "Witness breathtaking sunrise views of Kanchenjunga peak",
    duration: "3 hours",
    price: "₹500",
    rating: 4.8,
  },
];

const ActivitySearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("Adventure");
  const [filteredResults, setFilteredResults] = useState(searchResults);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredResults(searchResults);
    } else {
      setFilteredResults(
        searchResults.filter(
          (r) =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.location.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 space-y-6">
          {/* Header */}
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Activity & City <span className="gradient-text">Search</span>
            </h1>
            <p className="text-muted-foreground">
              Discover activities, cities, and experiences across India
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar 
            placeholder="Search activities, cities, experiences..."
            onSearch={handleSearch}
          />

          {/* Results */}
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-xl font-semibold">
              Results{" "}
              <span className="text-muted-foreground font-normal text-base">
                ({filteredResults.length} found)
              </span>
            </h2>

            <div className="space-y-3">
              {filteredResults.map((result) => (
                <Card
                  key={result.id}
                  glass
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">
                            {result.name}
                          </h3>
                          <span className="flex items-center gap-1 text-sm text-primary">
                            <Star size={14} fill="currentColor" />
                            {result.rating}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <MapPin size={14} />
                          {result.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {result.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        {result.duration && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock size={14} />
                            {result.duration}
                          </div>
                        )}
                        {result.price && (
                          <div className="flex items-center gap-1 text-accent font-medium">
                            {result.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivitySearchPage;

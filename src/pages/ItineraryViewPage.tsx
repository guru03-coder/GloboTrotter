import { useState } from "react";
import { Plus, ArrowDown, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Activity {
  id: number;
  name: string;
  expense: string;
}

interface DayItinerary {
  day: number;
  activities: Activity[];
}

const ItineraryViewPage = () => {
  const [itinerary, setItinerary] = useState<DayItinerary[]>([
    {
      day: 1,
      activities: [
        { id: 1, name: "Arrival at Cochin Airport", expense: "₹500" },
        { id: 2, name: "Transfer to Munnar Hill Station", expense: "₹2,500" },
        { id: 3, name: "Tea Garden Walk", expense: "₹300" },
      ],
    },
    {
      day: 2,
      activities: [
        { id: 4, name: "Visit Eravikulam National Park", expense: "₹800" },
        { id: 5, name: "Mattupetty Dam Boating", expense: "₹500" },
        { id: 6, name: "Local Kerala Sadhya Dinner", expense: "₹600" },
      ],
    },
  ]);

  const [selectedPlace] = useState("Kerala, India");

  const addActivity = (dayIndex: number) => {
    const newItinerary = [...itinerary];
    const newId = Math.max(...itinerary.flatMap(d => d.activities.map(a => a.id))) + 1;
    newItinerary[dayIndex].activities.push({
      id: newId,
      name: "",
      expense: "",
    });
    setItinerary(newItinerary);
  };

  const updateActivity = (dayIndex: number, activityId: number, field: keyof Activity, value: string) => {
    const newItinerary = [...itinerary];
    const activity = newItinerary[dayIndex].activities.find(a => a.id === activityId);
    if (activity) {
      (activity as any)[field] = value;
    }
    setItinerary(newItinerary);
  };

  const addDay = () => {
    const newDay = itinerary.length + 1;
    setItinerary([
      ...itinerary,
      {
        day: newDay,
        activities: [{ id: Date.now(), name: "", expense: "" }],
      },
    ]);
  };

  const totalBudget = itinerary.reduce((total, day) => {
    return total + day.activities.reduce((dayTotal, activity) => {
      const expense = parseFloat(activity.expense.replace(/[^0-9.]/g, "")) || 0;
      return dayTotal + expense;
    }, 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 space-y-6">
          {/* Search Bar */}
          <SearchBar placeholder="Search activities in your itinerary..." />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Itinerary for <span className="gradient-text">{selectedPlace}</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Day-wise activities with budget tracking
              </p>
            </div>
            <Card glass className="px-4 py-2">
              <div className="flex items-center gap-2">
                <DollarSign className="text-accent" size={20} />
                <span className="text-muted-foreground">Total Budget:</span>
                <span className="text-xl font-bold text-accent">₹{totalBudget.toLocaleString()}</span>
              </div>
            </Card>
          </div>

          {/* Itinerary Days */}
          <div className="space-y-6 animate-slide-up">
            {itinerary.map((day, dayIndex) => (
              <Card key={day.day} glass>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm">
                      Day {day.day}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Column Headers */}
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground pb-2 border-b border-border">
                    <div className="col-span-8">Physical Activity</div>
                    <div className="col-span-4">Expense</div>
                  </div>

                  {/* Activities */}
                  {day.activities.map((activity, actIndex) => (
                    <div key={activity.id}>
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-8">
                          <Input
                            placeholder="Enter activity name..."
                            value={activity.name}
                            onChange={(e) =>
                              updateActivity(dayIndex, activity.id, "name", e.target.value)
                            }
                            className="bg-muted/30"
                          />
                        </div>
                        <div className="col-span-4">
                          <Input
                            placeholder="₹0"
                            value={activity.expense}
                            onChange={(e) =>
                              updateActivity(dayIndex, activity.id, "expense", e.target.value)
                            }
                            className="bg-muted/30"
                          />
                        </div>
                      </div>
                      {actIndex < day.activities.length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowDown size={16} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Activity Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addActivity(dayIndex)}
                    className="w-full mt-2 border border-dashed border-border hover:border-primary"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Activity
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Day Button */}
          <div className="flex justify-center">
            <Button variant="outline" size="lg" onClick={addDay} className="gap-2">
              <Plus size={20} />
              Add Another Day
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItineraryViewPage;

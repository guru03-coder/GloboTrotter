import { useState } from "react";
import {
  Plus,
  Trash2,
  Calendar,
  IndianRupee,
  MapPin,
  Hotel,
  Utensils,
  Plane,
  Camera,
  Clock,
  MoreVertical,
  Sparkles,
  Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { generateGeminiItinerary } from "@/lib/gemini";
import { useToast } from "@/components/ui/use-toast";

type ActivityType = "travel" | "stay" | "food" | "activity" | "other";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  cost: string;
}

interface DayPlan {
  id: number;
  date: string; // YYYY-MM-DD
  activities: Activity[];
}

const ACTIVITY_ICONS = {
  travel: Plane,
  stay: Hotel,
  food: Utensils,
  activity: Camera,
  other: MapPin,
};

const ACTIVITY_COLORS = {
  travel: "text-blue-500 bg-blue-500/10",
  stay: "text-indigo-500 bg-indigo-500/10",
  food: "text-orange-500 bg-orange-500/10",
  activity: "text-green-500 bg-green-500/10",
  other: "text-gray-500 bg-gray-500/10",
};

const BuildItineraryPage = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [days, setDays] = useState<DayPlan[]>([
    {
      id: 1,
      date: "",
      activities: [
        {
          id: "1",
          type: "travel",
          title: "Flight to Destination",
          description: "Arrive at airport by 10 AM",
          time: "12:00",
          cost: "5000"
        },
        {
          id: "2",
          type: "stay",
          title: "Check-in at Hotel",
          description: "Grand Plaza Hotel",
          time: "14:00",
          cost: "0"
        }
      ]
    }
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setGenerating(true);
    try {
      const data = await generateGeminiItinerary(prompt);

      // Transform the AI response to our state format
      const newDays: DayPlan[] = data.days.map((day: any, index: number) => ({
        id: index + 1,
        date: "", // User can set dates
        activities: day.activities.map((act: string) => ({
          id: Math.random().toString(36).substr(2, 9),
          type: "activity", // Default type
          title: act,
          description: "AI Suggested Activity",
          time: "10:00",
          cost: ""
        }))
      }));

      setDays(newDays);
      toast({
        title: "Itinerary Generated!",
        description: `Created a ${newDays.length} day plan based on your request.`,
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate itinerary. Please try again.",
      });
    } finally {
      setGenerating(false);
    }
  };

  const addDay = () => {
    setDays([
      ...days,
      {
        id: days.length + 1,
        date: "",
        activities: []
      }
    ]);
  };

  const removeDay = (dayId: number) => {
    setDays(days.filter(d => d.id !== dayId));
  };

  const addActivity = (dayId: number) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: [
            ...day.activities,
            {
              id: Math.random().toString(36).substr(2, 9),
              type: "activity",
              title: "New Activity",
              description: "",
              time: "09:00",
              cost: ""
            }
          ]
        };
      }
      return day;
    }));
  };

  const updateActivity = (dayId: number, activityId: string, field: keyof Activity, value: string) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.map(act =>
            act.id === activityId ? { ...act, [field]: value } : act
          )
        };
      }
      return day;
    }));
  };

  const removeActivity = (dayId: number, activityId: string) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.filter(act => act.id !== activityId)
        };
      }
      return day;
    }));
  };

  const updateDayDate = (dayId: number, date: string) => {
    setDays(days.map(day => day.id === dayId ? { ...day, date } : day));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Plan Your <span className="gradient-text">Journey</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Map out your trip day by day. Add flights, stays, and adventures to create the perfect itinerary.
              </p>

              {/* AI Input Section */}
              <div className="max-w-2xl mx-auto bg-card/50 p-4 rounded-xl border border-primary/20 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex gap-2">
                  <Input
                    placeholder="e.g. Plan a 3-day trip to Goa for a couple with a budget of 20k..."
                    className="bg-background/80 border-primary/20 focus-visible:ring-primary/50"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={generating}
                  />
                  <Button
                    onClick={handleGenerate}
                    disabled={generating || !prompt.trim()}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white shadow-lg shadow-primary/25"
                  >
                    {generating ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-left px-1">
                  ✨ Powered by Gemini AI. Describe your destination, duration, and budget.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-8 animate-slide-up">
              {days.map((day, dayIndex) => (
                <div key={day.id} className="relative pl-8 md:pl-0">
                  {/* Desktop Timeline Line */}
                  <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-border -z-10" />

                  <Card className="glass relative overflow-hidden border-primary/20">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />

                    <div className="p-6">
                      {/* Day Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 text-primary font-bold px-4 py-2 rounded-lg">
                            Day {dayIndex + 1}
                          </div>
                          <Input
                            type="date"
                            className="w-40 bg-background/50"
                            value={day.date}
                            onChange={(e) => updateDayDate(day.id, e.target.value)}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 self-end md:self-auto"
                          onClick={() => removeDay(day.id)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Remove Day
                        </Button>
                      </div>

                      {/* Activities Timeline */}
                      <div className="space-y-4 relative">
                        {/* Mobile Timeline Line */}
                        <div className="md:hidden absolute left-[19px] top-2 bottom-2 w-px bg-border" />

                        {day.activities.map((activity) => {
                          const Icon = ACTIVITY_ICONS[activity.type];
                          return (
                            <div key={activity.id} className="group relative flex gap-4 animate-fade-in">
                              {/* Timeline Node */}
                              <div className={`
                                       relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                                       border border-border shadow-sm bg-background 
                                       ${ACTIVITY_COLORS[activity.type]}
                                    `}>
                                <Icon size={18} />
                              </div>

                              {/* Activity Card */}
                              <div className="flex-1 min-w-0 bg-card/50 hover:bg-card border border-border/50 rounded-xl p-4 transition-all duration-300">
                                <div className="flex flex-col md:flex-row gap-4">
                                  {/* Time & Type Input */}
                                  <div className="flex flex-row md:flex-col gap-2 md:w-32 flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                      <Clock size={14} className="text-muted-foreground" />
                                      <Input
                                        type="time"
                                        className="h-8 text-xs"
                                        value={activity.time}
                                        onChange={(e) => updateActivity(day.id, activity.id, "time", e.target.value)}
                                      />
                                    </div>
                                    <Select
                                      value={activity.type}
                                      onValueChange={(val) => updateActivity(day.id, activity.id, "type", val as ActivityType)}
                                    >
                                      <SelectTrigger className="h-8 text-xs capitalize">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="travel">Travel</SelectItem>
                                        <SelectItem value="stay">Stay</SelectItem>
                                        <SelectItem value="food">Food</SelectItem>
                                        <SelectItem value="activity">Activity</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Content Inputs */}
                                  <div className="flex-1 space-y-2">
                                    <Input
                                      className="font-medium h-9 bg-transparent border-none hover:bg-accent/10 focus:bg-accent/10 p-0 px-2 -ml-2 transition-colors"
                                      placeholder="Activity Title"
                                      value={activity.title}
                                      onChange={(e) => updateActivity(day.id, activity.id, "title", e.target.value)}
                                    />
                                    <Textarea
                                      className="min-h-[40px] text-sm bg-transparent border-none resize-none hover:bg-accent/10 focus:bg-accent/10 p-0 px-2 -ml-2 transition-colors focus-visible:ring-0 shadow-none"
                                      placeholder="Add details, notes, or location..."
                                      value={activity.description}
                                      onChange={(e) => updateActivity(day.id, activity.id, "description", e.target.value)}
                                    />
                                    <div className="flex items-center gap-2 mt-2">
                                      <IndianRupee size={14} className="text-muted-foreground" />
                                      <Input
                                        className="h-7 w-24 text-xs bg-transparent border-b border-0 rounded-none focus-visible:ring-0 px-1"
                                        placeholder="Cost"
                                        value={activity.cost}
                                        onChange={(e) => updateActivity(day.id, activity.id, "cost", e.target.value)}
                                      />
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                      onClick={() => removeActivity(day.id, activity.id)}
                                    >
                                      <Trash2 size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add Activity Button */}
                      <div className="mt-6 flex justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addActivity(day.id)}
                          className="rounded-full border-dashed gap-2 hover:border-primary hover:text-primary transition-colors"
                        >
                          <Plus size={16} />
                          Add Activity
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            {/* Global Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/50">
              <Button
                variant="outline"
                size="lg"
                onClick={addDay}
                className="w-full md:w-auto gap-2"
              >
                <Plus size={18} />
                Add Another Day
              </Button>

              <div className="flex gap-4 w-full md:w-auto">
                <div className="flex-1 md:flex-none text-right mr-4">
                  <div className="text-sm text-muted-foreground">Total Estimated Cost</div>
                  <div className="text-2xl font-bold text-primary flex items-center justify-end">
                    <IndianRupee size={20} />
                    {days.reduce((total, day) =>
                      total + day.activities.reduce((dayTotal, act) => dayTotal + (parseInt(act.cost) || 0), 0)
                      , 0).toLocaleString()}
                  </div>
                </div>
                <Button variant="glow" size="lg" className="w-full md:w-auto min-w-[150px]">
                  Save Itinerary
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default BuildItineraryPage;

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TripEvent {
  id: number;
  name: string;
  startDay: number;
  endDay: number;
  color: string;
}

const CalendarViewPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026

  const trips: TripEvent[] = [
    { id: 1, name: "RAJASTHAN TOUR", startDay: 2, endDay: 12, color: "bg-secondary/40" },
    { id: 2, name: "MANALI - LEH", startDay: 10, endDay: 25, color: "bg-primary/40" },
    { id: 3, name: "KERALA RETREAT", startDay: 18, endDay: 22, color: "bg-accent/40" },
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const getTripForDay = (day: number | null) => {
    if (!day) return null;
    return trips.find((trip) => day >= trip.startDay && day <= trip.endDay);
  };

  const isFirstDayOfTrip = (day: number | null, trip: TripEvent | null) => {
    if (!day || !trip) return false;
    return day === trip.startDay;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 space-y-6">
          {/* Search Bar */}
          <SearchBar placeholder="Search trips in calendar..." />

          {/* Header */}
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Calendar <span className="gradient-text">View</span>
            </h1>
            <p className="text-muted-foreground">
              Visualize your Indian travel schedule at a glance
            </p>
          </div>

          {/* Calendar Card */}
          <Card glass className="max-w-4xl mx-auto animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft size={20} />
                </Button>
                <CardTitle className="text-xl">
                  {monthName} {year}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => navigateMonth("next")}>
                  <ChevronRight size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const trip = getTripForDay(day);
                  const isFirstDay = isFirstDayOfTrip(day, trip);

                  return (
                    <div
                      key={index}
                      className={cn(
                        "min-h-[80px] p-1 rounded-lg border border-border/50 relative",
                        day && "hover:bg-muted/50 cursor-pointer transition-colors",
                        trip && trip.color
                      )}
                    >
                      {day && (
                        <>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              trip ? "text-foreground" : "text-muted-foreground"
                            )}
                          >
                            {day}
                          </span>
                          {isFirstDay && trip && (
                            <div className="absolute bottom-1 left-1 right-1">
                              <span className="text-xs font-medium text-foreground block truncate">
                                {trip.name}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
                {trips.map((trip) => (
                  <div key={trip.id} className="flex items-center gap-2">
                    <div className={cn("w-4 h-4 rounded", trip.color)} />
                    <span className="text-sm text-muted-foreground">{trip.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CalendarViewPage;

import { Newspaper, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const NEWS = [
    {
        id: 1,
        title: "Top 10 Destinations for 2025 Revealed",
        source: "Travel Weekly",
        date: "2h ago",
        category: "Trends",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=150&fit=crop"
    },
    {
        id: 2,
        title: "New Visa Rules for European Travel Starting Soon",
        source: "Global News",
        date: "5h ago",
        category: "Policy",
        image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=200&h=150&fit=crop"
    },
    {
        id: 3,
        title: "Hidden Gems: Exploring the Unseen Asia",
        source: "Wanderlust",
        date: "1d ago",
        category: "Guide",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=150&fit=crop"
    },
    {
        id: 4,
        title: "Sustainable Travel: How to Reduce Carbon Footprint",
        source: "EcoTravel",
        date: "2d ago",
        category: "Eco",
        image: "https://images.unsplash.com/photo-1542601906990-24d4c16419d9?w=200&h=150&fit=crop"
    }
];

export function TravelNews() {
    return (
        <Card className="glass border-primary/20 h-full flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Newspaper size={18} className="text-primary" />
                        Travel Briefing
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">Live Updates</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[300px] px-6">
                    <div className="space-y-6 pb-6">
                        {NEWS.map((item) => (
                            <div key={item.id} className="group cursor-pointer">
                                <div className="flex gap-4">
                                    <div className="h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-primary">{item.source}</span>
                                            <span className="text-[10px] text-muted-foreground">{item.date}</span>
                                        </div>
                                        <h4 className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h4>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

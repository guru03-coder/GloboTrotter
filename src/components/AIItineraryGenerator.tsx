import { useState } from "react";
import { Sparkles, Loader2, Map, Calendar, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export function AIItineraryGenerator() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const generate = async () => {
        setLoading(true);
        setResult(null);
        // Simulate AI processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
        setResult({
            destination: "Goa, India",
            duration: "3 Days",
            budget: "₹15,000",
            highlights: ["Beaches", "Nightlife", "Seafood"],
            summary: "A perfect 3-day getaway exploring North Goa's vibrant energy and South Goa's serene beaches. Includes scooter rental and seafood extravaganza."
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-background/50 p-6 hover:border-primary/50 transition-all cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">AI Trip Planner</h3>
                            <p className="text-sm text-muted-foreground">Generate your perfect trip in seconds</p>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] glass border-primary/20">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Sparkles className="text-primary" />
                        AI Itinerary Generator
                    </DialogTitle>
                    <DialogDescription>
                        Tell us your preferences and let our AI finish the plan for you.
                    </DialogDescription>
                </DialogHeader>

                {!result ? (
                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label>Where do you want to go?</Label>
                            <Input placeholder="e.g. Goa, Kerala, Himachal" className="bg-background/50" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Duration</Label>
                                <Select>
                                    <SelectTrigger className="bg-background/50">
                                        <SelectValue placeholder="Days" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="3">3 Days</SelectItem>
                                        <SelectItem value="5">5 Days</SelectItem>
                                        <SelectItem value="7">7 Days</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Budget</Label>
                                <Select>
                                    <SelectTrigger className="bg-background/50">
                                        <SelectValue placeholder="Range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="budget">Budget</SelectItem>
                                        <SelectItem value="mid">Mid-range</SelectItem>
                                        <SelectItem value="luxury">Luxury</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Vibe</Label>
                            <div className="flex gap-2">
                                {["Relaxed", "Adventure", "Party", "Cultural"].map((vibe) => (
                                    <div key={vibe} className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs cursor-pointer hover:bg-accent/20">
                                        {vibe}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-4 space-y-4 animate-fade-in">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-lg mb-2 text-primary">{result.destination}</h3>
                                <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {result.duration}</span>
                                    <span className="flex items-center gap-1"><Wallet size={14} /> {result.budget}</span>
                                </div>
                                <p className="text-sm mb-4 leading-relaxed">{result.summary}</p>
                                <div className="flex flex-wrap gap-2">
                                    {result.highlights.map((tag: string) => (
                                        <span key={tag} className="text-xs bg-background/80 px-2 py-1 rounded-md border">{tag}</span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                <DialogFooter>
                    {!result ? (
                        <Button onClick={generate} disabled={loading} className="w-full">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating Magic...
                                </>
                            ) : (
                                "Generate Itinerary"
                            )}
                        </Button>
                    ) : (
                        <div className="flex gap-2 w-full">
                            <Button variant="outline" className="flex-1" onClick={() => setResult(null)}>Try Again</Button>
                            <Button className="flex-1">Save Plan</Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

import { useParams, Link } from "react-router-dom";
import { places } from "@/data/places";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar, Wallet, MapPin, ArrowLeft, Utensils, Hotel, Bus, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingModal } from "@/components/BookingModal";

const PlaceDetailsPage = () => {
    const { id } = useParams();
    const place = places.find((p) => p.id === id);

    if (!place) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 pt-24 text-center">
                    <h1 className="text-2xl font-bold mb-4">Place not found</h1>
                    <Link to="/dashboard">
                        <Button>Return to Dashboard</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-16">
                {/* Hero Section */}
                <div className="relative h-[400px] overflow-hidden">
                    <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-12">
                        <Link to="/dashboard" className="mb-6 inline-block">
                            <Button variant="secondary" size="sm" className="gap-2">
                                <ArrowLeft size={16} />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground drop-shadow-lg animate-fade-in">
                            {place.name}
                        </h1>
                        <div className="flex items-center gap-2 text-xl text-foreground/90 mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                            <MapPin size={24} />
                            {place.location}, {place.country}
                        </div>
                        <div className="mt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                            <BookingModal
                                placeName={place.name}
                                placeLocation={place.location}
                                placeImage={place.image}
                                placeId={place.id}
                                pricePerDay={0}
                            />
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 space-y-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>

                    {/* About & Best Season */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <section>
                                <h2 className="text-2xl font-semibold mb-4">About</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {place.description}
                                </p>
                            </section>
                        </div>

                        <div>
                            <Card glass className="bg-primary/5 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="text-primary" />
                                        Best Season to Visit
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg font-medium">{place.bestSeason}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Budget & Expenses */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Wallet className="text-primary" size={24} />
                            <h2 className="text-2xl font-semibold">Budget & Expenses</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card glass>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-medium flex items-center gap-2 text-muted-foreground">
                                        <Hotel size={18} />
                                        Accommodation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{place.expenses.accommodation}</p>
                                    <p className="text-xs text-muted-foreground">Avg. per night</p>
                                </CardContent>
                            </Card>

                            <Card glass>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-medium flex items-center gap-2 text-muted-foreground">
                                        <Utensils size={18} />
                                        Food & Dining
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{place.expenses.food}</p>
                                    <p className="text-xs text-muted-foreground">Avg. per meal</p>
                                </CardContent>
                            </Card>

                            <Card glass>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-medium flex items-center gap-2 text-muted-foreground">
                                        <Bus size={18} />
                                        Transportation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{place.expenses.transport}</p>
                                    <p className="text-xs text-muted-foreground">Avg. local travel</p>
                                </CardContent>
                            </Card>

                            <Card glass>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-medium flex items-center gap-2 text-muted-foreground">
                                        <Camera size={18} />
                                        Activities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{place.expenses.activities}</p>
                                    <p className="text-xs text-muted-foreground">Avg. per activity</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-start gap-3">
                            <div className="p-2 bg-accent/20 rounded-lg">
                                <Wallet className="text-accent" size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Estimated Daily Budget</h4>
                                <p className="text-muted-foreground">{place.budget}</p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
};

export default PlaceDetailsPage;

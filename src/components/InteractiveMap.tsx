import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import L from "leaflet";
import { MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { places } from "@/data/places";

// Fix for default marker icons in React Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export function InteractiveMap() {
    // Filter places that have coordinates
    const mapPlaces = places.filter(p => p.lat && p.lng);

    return (
        <Card className="glass border-primary/20 h-full overflow-hidden flex flex-col">
            <CardHeader className="pb-2 z-10">
                <CardTitle className="flex items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    Exploration Map
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 relative p-0 min-h-[400px]">
                <MapContainer
                    center={[20.5937, 78.9629]} // Center of India
                    zoom={4}
                    scrollWheelZoom={false}
                    className="h-full w-full absolute inset-0 z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {mapPlaces.map((place) => (
                        <Marker key={place.id} position={[place.lat!, place.lng!]}>
                            <Popup>
                                <div className="min-w-[160px] p-2 text-center">
                                    <h3 className="font-bold text-base mb-1 text-foreground">{place.name}</h3>
                                    <p className="text-xs text-muted-foreground mb-3">{place.location}</p>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-xs font-medium text-primary">
                                            {place.bestSeason}
                                        </div>
                                        <Link to={`/place/${place.id}`}>
                                            <Button size="sm" className="w-full h-8 text-xs gap-1">
                                                View Details <ArrowRight size={12} />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <div className="absolute bottom-4 right-4 z-[400] bg-background/80 backdrop-blur px-3 py-1.5 rounded-lg border text-xs text-muted-foreground shadow-sm pointer-events-none">
                    Click markers to explore
                </div>
            </CardContent>
        </Card>
    );
}

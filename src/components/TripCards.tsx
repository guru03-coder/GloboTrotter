import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  id?: string;
  name: string;
  country: string;
  image: string;
  rating?: number;
  className?: string;
}

const DestinationCard = ({ id, name, country, image, rating, className }: DestinationCardProps) => {
  const CardContentWrapper = (
    <Card
      glass
      className={cn(
        "overflow-hidden group cursor-pointer hover:shadow-glow transition-all duration-500 h-full",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {rating && (
          <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded-lg text-sm font-medium">
            ⭐ {rating}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
          <MapPin size={14} />
          {country}
        </p>
      </CardContent>
    </Card>
  );

  if (id) {
    return <Link to={`/dashboard/places/${id}`}>{CardContentWrapper}</Link>;
  }

  return CardContentWrapper;
};

interface TripCardProps {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
  status: "ongoing" | "upcoming" | "completed";
  className?: string;
  placeId?: string;
}

const TripCard = ({ name, destination, startDate, endDate, image, status, className, placeId }: TripCardProps) => {
  const statusColors = {
    ongoing: "bg-accent text-accent-foreground",
    upcoming: "bg-primary text-primary-foreground",
    completed: "bg-muted text-muted-foreground",
  };

  return (
    <Card
      glass
      className={cn(
        "overflow-hidden group cursor-pointer hover:shadow-glow transition-all duration-500",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 sm:h-auto sm:w-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 hidden sm:block" />
        </div>
        <CardContent className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <span className={cn("px-2 py-1 rounded-lg text-xs font-medium capitalize", statusColors[status])}>
                {status}
              </span>
            </div>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <MapPin size={14} />
              {destination}
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
              <Calendar size={14} />
              {startDate} - {endDate}
            </p>
          </div>

          {placeId ? (
            <Link to={`/dashboard/places/${placeId}`} className="self-end mt-3">
              <Button variant="ghost" size="sm" className="gap-2 group-hover:text-primary">
                View Details
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="sm" className="self-end mt-3 gap-2 group-hover:text-primary" disabled>
              View Details
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export { DestinationCard, TripCard };

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, Users, Star, MessageCircle, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface TripCardProps {
  trip: {
    id: string;
    type: "offered" | "booked";
    driver: {
      name: string;
      avatar?: string;
      rating: number;
      isVerified: boolean;
    };
    origin: string;
    destination: string;
    datetime: Date;
    availableSeats?: number;
    totalSeats?: number;
    price?: number;
    status: "upcoming" | "ongoing" | "completed" | "cancelled";
  };
}


export function TripCard({ trip }: TripCardProps) {
  const statusColors = {
    upcoming: "bg-primary text-primary-foreground",
    ongoing: "bg-warning text-warning-foreground",
    completed: "bg-success text-success-foreground",
    cancelled: "bg-destructive text-destructive-foreground",
  } as const;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
const navigate = useNavigate();
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={trip.driver.avatar} />
              <AvatarFallback>
                {trip.driver.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">{trip.driver.name}</h3>
                {trip.driver.isVerified && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    ✓ Verified
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-warning text-warning" />
                <span className="text-xs text-muted-foreground">
                  {trip.driver.rating}
                </span>
              </div>
            </div>
          </div>

          <Badge className={statusColors[trip.status]}>{trip.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Route */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-sm font-medium">{trip.origin}</span>
          </div>
          <div className="ml-1 border-l-2 border-dashed border-muted h-4"></div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">{trip.destination}</span>
          </div>
        </div>

        {/* Time and Details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>
                {formatDate(trip.datetime)} at {formatTime(trip.datetime)}
              </span>
            </div>

            {trip.availableSeats !== undefined && (
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>
                  {trip.availableSeats}/{trip.totalSeats} seats
                </span>
              </div>
            )}
          </div>

          {trip.price && (
            <span className="font-semibold text-primary">${trip.price}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1"  onClick={() => navigate("/messages")}>
            <MessageCircle className="h-4 w-4 mr-2"/>
            Message
          </Button>
          <Button size="sm" variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
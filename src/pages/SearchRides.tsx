import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  MapPin, 
  Calendar,
  Clock,
  Users,
  Star,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockRides = [
  {
    id: "1",
    driver: {
      name: "Alice Martinez",
      avatar: "",
      rating: 4.9,
      isVerified: true,
      totalTrips: 127
    },
    origin: "Main Campus Gate",
    destination: "City Center Mall",
    datetime: new Date(2024, 7, 29, 15, 30),
    availableSeats: 3,
    totalSeats: 4,
    price: 12,
    duration: "25 min",
    vehicle: "Honda Civic 2020"
  },
  {
    id: "2",
    driver: {
      name: "David Kim",
      avatar: "",
      rating: 4.7,
      isVerified: true,
      totalTrips: 89
    },
    origin: "Science Building",
    destination: "Airport Terminal",
    datetime: new Date(2024, 7, 29, 18, 0),
    availableSeats: 2,
    totalSeats: 3,
    price: 35,
    duration: "45 min",
    vehicle: "Toyota Camry 2021"
  },
  {
    id: "3",
    driver: {
      name: "Sofia Rahman",
      avatar: "",
      rating: 5.0,
      isVerified: true,
      totalTrips: 203
    },
    origin: "Student Dormitory",
    destination: "Downtown Station",
    datetime: new Date(2024, 7, 30, 8, 15),
    availableSeats: 1,
    totalSeats: 4,
    price: 8,
    duration: "20 min",
    vehicle: "Nissan Sentra 2019"
  }
];

export default function SearchRides() {
  const [searchFilters, setSearchFilters] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    seats: "1"
  });

  const [sortBy, setSortBy] = useState("time");

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Search Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">Find a Ride</h1>
            <p className="text-muted-foreground">
              Discover available rides from fellow students and staff
            </p>
          </div>

          {/* Search Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Search Rides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="origin"
                      placeholder="Pickup location"
                      value={searchFilters.origin}
                      onChange={(e) => setSearchFilters({...searchFilters, origin: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="destination"
                      placeholder="Drop-off location"
                      value={searchFilters.destination}
                      onChange={(e) => setSearchFilters({...searchFilters, destination: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={searchFilters.date}
                      onChange={(e) => setSearchFilters({...searchFilters, date: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seats">Passengers</Label>
                  <Select value={searchFilters.seats} onValueChange={(value) => setSearchFilters({...searchFilters, seats: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seats needed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 passenger</SelectItem>
                      <SelectItem value="2">2 passengers</SelectItem>
                      <SelectItem value="3">3 passengers</SelectItem>
                      <SelectItem value="4">4+ passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full" variant="gradient">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Sort */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Options
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label className="text-sm">Sort by:</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time">Departure time</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Available Rides</h2>
            <span className="text-sm text-muted-foreground">
              {mockRides.length} rides found
            </span>
          </div>

          <div className="grid gap-4">
            {mockRides.map((ride) => (
              <Card key={ride.id} className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between space-x-6">
                    {/* Driver Info */}
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={ride.driver.avatar} />
                        <AvatarFallback>
                          {ride.driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{ride.driver.name}</h3>
                          {ride.driver.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-warning text-warning" />
                            <span>{ride.driver.rating}</span>
                          </div>
                          <span>{ride.driver.totalTrips} trips</span>
                          <span>{ride.vehicle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <span className="font-medium">{ride.origin}</span>
                          </div>
                          <div className="ml-1 border-l-2 border-dashed border-muted h-4"></div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-secondary" />
                            <span className="font-medium">{ride.destination}</span>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(ride.datetime)} at {formatTime(ride.datetime)}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{ride.availableSeats} of {ride.totalSeats} seats available</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="text-right space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-primary">${ride.price}</div>
                        <div className="text-sm text-muted-foreground">{ride.duration}</div>
                      </div>
                      <Button className="w-full">
                        Request Ride
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
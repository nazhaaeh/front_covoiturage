import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TripCard } from "@/components/dashboard/TripCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  MapPin,
  Plus,
  Filter
} from "lucide-react";

const mockUpcomingTrips = [
  {
    id: "1",
    type: 'offered' as const,
    driver: {
      name: "You",
      rating: 4.8,
      isVerified: true
    },
    origin: "Computer Science Building",
    destination: "Downtown Mall",
    datetime: new Date(2024, 7, 29, 14, 30),
    availableSeats: 2,
    totalSeats: 4,
    price: 8,
    status: 'upcoming' as const
  },
  {
    id: "2",
    type: 'booked' as const,
    driver: {
      name: "Mike Chen",
      rating: 4.9,
      isVerified: true
    },
    origin: "Student Dormitory",
    destination: "Airport",
    datetime: new Date(2024, 7, 30, 9, 0),
    availableSeats: 1,
    totalSeats: 3,
    price: 25,
    status: 'upcoming' as const
  }
];

const mockPastTrips = [
  {
    id: "3",
    type: 'offered' as const,
    driver: {
      name: "You",
      rating: 4.8,
      isVerified: true
    },
    origin: "Main Campus",
    destination: "City Center",
    datetime: new Date(2024, 7, 25, 16, 0),
    availableSeats: 0,
    totalSeats: 4,
    price: 10,
    status: 'completed' as const
  },
  {
    id: "4",
    type: 'booked' as const,
    driver: {
      name: "Sarah Johnson",
      rating: 4.9,
      isVerified: true
    },
    origin: "Library",
    destination: "Shopping District",
    datetime: new Date(2024, 7, 22, 13, 15),
    availableSeats: 1,
    totalSeats: 3,
    price: 6,
    status: 'completed' as const
  }
];

export default function MyTrips() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Trips</h1>
            <p className="text-muted-foreground">
              Manage your rides and track your travel history
            </p>
          </div>
          <Button variant="gradient">
            <Plus className="mr-2 h-4 w-4" />
            Offer New Ride
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$186</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Based on 127 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Trips Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Trips</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4">
              {mockUpcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
            {mockUpcomingTrips.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No upcoming trips</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any trips scheduled yet.
                  </p>
                  <Button variant="gradient">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Trip
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <div className="grid gap-4">
              {mockPastTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>
                  People who want to join your trips
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">EW</span>
                      </div>
                      <div>
                        <p className="font-medium">Emma Wilson</p>
                        <p className="text-sm text-muted-foreground">Wants to join: Campus → Mall</p>
                        <p className="text-xs text-muted-foreground">Requested 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm" variant="success">Accept</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">JD</span>
                      </div>
                      <div>
                        <p className="font-medium">James Davis</p>
                        <p className="text-sm text-muted-foreground">Wants to join: Campus → Airport</p>
                        <p className="text-xs text-muted-foreground">Requested 5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm" variant="success">Accept</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}